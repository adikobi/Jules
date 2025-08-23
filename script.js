document.addEventListener('DOMContentLoaded', () => {
    // --- Screen Management ---
    const screens = document.querySelectorAll('.screen');
    const splashScreen = document.getElementById('splash-screen');
    const langSelectScreen = document.getElementById('lang-select-screen');
    const modeSelectScreen = document.getElementById('mode-select-screen');
    const levelSelectScreen = document.getElementById('level-select-screen');
    const gameScreen = document.getElementById('game-screen');
    const startGameBtn = document.getElementById('start-game-btn');
    const wordModeBtn = document.getElementById('mode-words');
    const sentenceModeBtn = document.getElementById('mode-sentences');
    const langCards = document.querySelectorAll('.lang-card');
    const changeLangBtn = document.getElementById('change-lang-btn');
    const levelPathContainer = document.getElementById('level-path-container');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const backToMenuBtnSentences = document.getElementById('back-to-menu-btn-sentences');
    const sentenceGameScreen = document.getElementById('sentence-game-screen');
    const sentenceDisplay = document.getElementById('sentence-display');
    const sentenceChoicesContainer = document.getElementById('sentence-choices-container');
    const sentenceStatusMessage = document.getElementById('sentence-status-message');
    const wordGameTitle = document.querySelector('#game-screen h1');
    const sentenceGameTitle = document.querySelector('#sentence-game-screen h1');

    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
        }
    }

    // --- Game Elements ---
    const hebrewColumn = document.getElementById('hebrew-column');
    const spanishColumn = document.getElementById('spanish-column');
    const levelSelect = document.getElementById('level-select'); // This will be replaced later
    const statusMessage = document.getElementById('status-message');

    // --- App State ---
    const LANGUAGE_KEY = 'palabras_selected_language';
    const HEBREW_LANG_NAMES = { es: 'ספרדית', en: 'אנגלית', de: 'גרמנית', ar: 'ערבית' };
    let selectedLanguage = null;
    let currentLevel = 1;
    let currentWords = [];
    let selectedHebrew = null;
    let selectedSpanish = null;
    let matchedPairs = 0;

    // --- Sentence Game State ---
    let currentSentenceLevel = 1;
    let currentSentences = [];
    let currentSentenceIndex = 0;
    const wordsPerRound = 7;

    // --- Progress Management (REMOVED BY USER REQUEST) ---

    // --- TEXT-TO-SPEECH FUNCTIONALITY ---
    let speechVoices = [];

    function loadVoices() {
        speechVoices = window.speechSynthesis.getVoices();
    }

    function speak(text, lang) {
        if (speechVoices.length === 0) {
            console.warn("Speech voices not loaded yet.");
            return;
        }

        const langCodeMap = {
            es: 'es-ES',
            en: 'en-US',
            de: 'de-DE',
            ar: 'ar-SA'
        };
        const fullLangCode = langCodeMap[lang] || 'es-ES';

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = fullLangCode;

        // Find a voice for the specific language
        const voice = speechVoices.find(v => v.lang === fullLangCode);
        if (voice) {
            utterance.voice = voice;
        } else {
            // Fallback to a voice that starts with the language code
            const fallbackVoice = speechVoices.find(v => v.lang.startsWith(lang));
            if (fallbackVoice) {
                utterance.voice = fallbackVoice;
            }
        }

        window.speechSynthesis.speak(utterance);
    }

    // Load voices when they are ready
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial attempt

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadLevel(level) {
        currentLevel = level;
        const wordData = window['words_' + selectedLanguage] || words;

        // --- Update Titles and Column Headers ---
        const langName = HEBREW_LANG_NAMES[selectedLanguage] || 'ספרדית';
        wordGameTitle.textContent = 'לימוד ' + langName;
        const foreignColumn = document.getElementById('spanish-column'); // This ID is now misleading, but we'll keep it for simplicity
        const foreignHeader = foreignColumn.querySelector('h2');
        foreignHeader.textContent = langName; // Use the Hebrew name here as well

        foreignColumn.className = 'column'; // Reset classes
        foreignColumn.classList.add(`lang-${selectedLanguage || 'es'}`);
        // End of dynamic column update

        if (level === 'mixed') {
            let allWords = wordData.levels.reduce((acc, currentLevel) => acc.concat(currentLevel.words), []);
            currentWords = shuffleArray([...allWords]);
        } else {
            const levelData = wordData.levels.find(l => l.level == level);
            if (levelData) {
                currentWords = shuffleArray([...levelData.words]);
            }
        }

        matchedPairs = 0;
        loadRound();
    }

    function loadRound() {
        clearBoard();
        statusMessage.textContent = '';
        selectedHebrew = null;
        selectedSpanish = null;

        const roundWords = currentWords.slice(0, wordsPerRound);
        if (roundWords.length === 0) {
            statusMessage.innerHTML = 'כל הכבוד! סיימת את כל המילים ברמה זו.';
            statusMessage.className = 'correct';

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'end-level-buttons';

            const replayBtn = document.createElement('button');
            replayBtn.textContent = 'שחק שוב';
            replayBtn.className = 'end-level-btn';
            replayBtn.addEventListener('click', () => loadLevel(currentLevel));

            const backToLevelsBtn = document.createElement('button');
            backToLevelsBtn.textContent = 'בחר רמה';
            backToLevelsBtn.className = 'end-level-btn';
            backToLevelsBtn.addEventListener('click', () => showScreen('level-select-screen'));

            buttonContainer.appendChild(replayBtn);
            buttonContainer.appendChild(backToLevelsBtn);
            statusMessage.appendChild(buttonContainer);

            return;
        }

        const hebrewWords = roundWords.map(word => word.hebrew);
        const foreignWords = roundWords.map(word => word.foreign);

        displayWords(shuffleArray(hebrewWords), hebrewColumn, 'hebrew');
        displayWords(shuffleArray(foreignWords), spanishColumn, 'foreign');
    }

    function clearBoard() {
        // Remove only word cards, not the entire column content
        const hebrewCards = hebrewColumn.querySelectorAll('.word-card');
        hebrewCards.forEach(card => card.remove());

        const foreignCards = spanishColumn.querySelectorAll('.word-card');
        foreignCards.forEach(card => card.remove());
    }

    function displayWords(wordsArray, column, language) {
        const wordData = window['words_' + selectedLanguage] || words;

        wordsArray.forEach(wordText => {
            const card = document.createElement('div');
            card.classList.add('word-card');
            card.dataset.word = wordText;
            card.dataset.lang = language;

            const wordSpan = document.createElement('span');
            wordSpan.textContent = wordText;
            card.appendChild(wordSpan);

            if (language === 'foreign') {
                // Find the original word object to check for a speech key
                const wordObject = wordData.levels.flatMap(l => l.words).find(w => w.foreign === wordText);
                const textToSpeak = wordObject && wordObject.speech ? wordObject.speech : wordText;

                const speakerIcon = document.createElement('i');
                speakerIcon.className = 'fas fa-volume-up speaker-icon';
                speakerIcon.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card from being selected
                    speak(textToSpeak, selectedLanguage);
                });
                card.appendChild(speakerIcon);
            }

            card.addEventListener('click', onWordClick);
            column.appendChild(card);
        });
    }

    function onWordClick(event) {
        const selectedCard = event.currentTarget; // Use currentTarget to get the element with the listener
        if (selectedCard.classList.contains('matched')) return;

        const lang = selectedCard.dataset.lang;

        if (lang === 'hebrew') {
            if (selectedHebrew) {
                selectedHebrew.classList.remove('selected');
            }
            selectedHebrew = selectedCard;
            selectedHebrew.classList.add('selected');
        } else if (lang === 'foreign') {
            if (selectedSpanish) {
                selectedSpanish.classList.remove('selected');
            }
            selectedSpanish = selectedCard;
            selectedSpanish.classList.add('selected');
        }

        if (selectedHebrew && selectedSpanish) {
            checkMatch();
        }
    }

    function checkMatch() {
        const hebrewCard = selectedHebrew;
        const spanishCard = selectedSpanish;
        const hebrewWord = hebrewCard.dataset.word;
        const foreignWord = spanishCard.dataset.word;

        // Immediately clear state to prevent race conditions
        selectedHebrew = null;
        selectedSpanish = null;

        let correctPair;
        const wordData = window['words_' + selectedLanguage] || words;

        if (currentLevel === 'mixed') {
            let allWords = wordData.levels.reduce((acc, level) => acc.concat(level.words), []);
            correctPair = allWords.find(pair => pair.hebrew === hebrewWord && pair.foreign === foreignWord);
        } else {
            const levelData = wordData.levels.find(l => l.level == currentLevel);
            correctPair = levelData.words.find(pair => pair.hebrew === hebrewWord && pair.foreign === foreignWord);
        }

        // Stop pulsing
        hebrewCard.classList.remove('selected');
        spanishCard.classList.remove('selected');

        if (correctPair) {
            setStatusMessage('נכון!', 'correct');

            // Trigger correct match animation
            hebrewCard.classList.add('correct-match');
            spanishCard.classList.add('correct-match');

            // Mark as matched after animation
            setTimeout(() => {
                hebrewCard.classList.add('matched');
                spanishCard.classList.add('matched');
                hebrewCard.removeEventListener('click', onWordClick);
                spanishCard.removeEventListener('click', onWordClick);

                matchedPairs++;

                if (matchedPairs >= wordsPerRound || matchedPairs >= currentWords.length) {
                    const matchedHebrewWords = Array.from(hebrewColumn.querySelectorAll('.matched')).map(c => c.dataset.word);
                    currentWords = currentWords.filter(word => !matchedHebrewWords.includes(word.hebrew));

                    matchedPairs = 0;
                    setTimeout(() => {
                        setStatusMessage('טוען מילים חדשות...', '');
                        setTimeout(loadRound, 1000);
                    }, 1500);
                }
            }, 800); // Wait for tada animation to finish

        } else {
            setStatusMessage('לא נכון, נסו שוב.', 'incorrect');

            // Trigger shake animation
            hebrewCard.classList.add('shake');
            spanishCard.classList.add('shake');

            // Remove shake class after animation so it can be re-triggered
            setTimeout(() => {
                hebrewCard.classList.remove('shake');
                spanishCard.classList.remove('shake');
            }, 500);
        }
    }

    function setStatusMessage(message, className) {
        statusMessage.textContent = message;
        statusMessage.className = className;
    }

    // --- SENTENCE GAME LOGIC ---
    function loadSentenceLevel(levelNum) {
        currentSentenceLevel = levelNum;
        const sentenceData = window['sentences_' + selectedLanguage] || sentences;

        const langName = HEBREW_LANG_NAMES[selectedLanguage] || 'ספרדית';
        sentenceGameTitle.textContent = 'השלמת משפטים: ' + langName;

        // Set text direction for the sentence
        if (selectedLanguage === 'ar') {
            sentenceDisplay.style.direction = 'rtl';
        } else {
            sentenceDisplay.style.direction = 'ltr';
        }

        const levelData = sentenceData.levels.find(l => l.level == levelNum);
        if (levelData) {
            currentSentences = shuffleArray([...levelData.sentences]);
            currentSentenceIndex = 0;
            displayCurrentSentence();
        }
    }

    function displayCurrentSentence() {
        sentenceDisplay.innerHTML = ''; // Clear previous sentence
        sentenceChoicesContainer.innerHTML = '';
        sentenceStatusMessage.textContent = '';

        if (currentSentenceIndex >= currentSentences.length) {
            sentenceDisplay.textContent = 'כל הכבוד! סיימת את כל המשפטים ברמה זו.';
            // TODO: Mark sentence level as complete
            return;
        }

        const sentenceData = currentSentences[currentSentenceIndex];
        const sentenceHTML = sentenceData.text.replace('___', '<span class="blank">___</span>');
        sentenceDisplay.innerHTML = sentenceHTML;

        const translateIcon = document.createElement('i');
        translateIcon.className = 'fas fa-language translate-icon';
        translateIcon.title = 'תרגם משפט';
        translateIcon.addEventListener('click', () => {
            sentenceStatusMessage.textContent = sentenceData.hebrew;
            sentenceStatusMessage.className = ''; // Neutral color
        });
        sentenceDisplay.appendChild(translateIcon);

        const shuffledChoices = shuffleArray([...sentenceData.choices]);
        shuffledChoices.forEach(choice => {
            const choiceBtn = document.createElement('button');
            choiceBtn.classList.add('choice-btn');
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener('click', (e) => checkSentenceAnswer(choice, sentenceData.missing, e.target));
            sentenceChoicesContainer.appendChild(choiceBtn);
        });
    }

    function checkSentenceAnswer(selectedWord, correctWord, buttonElement) {
        // Disable all buttons to prevent multiple clicks while processing
        const allChoiceBtns = sentenceChoicesContainer.querySelectorAll('.choice-btn');
        allChoiceBtns.forEach(btn => btn.disabled = true);

        if (selectedWord === correctWord) {
            sentenceStatusMessage.textContent = 'נכון!';
            sentenceStatusMessage.className = 'correct';
            buttonElement.classList.add('correct-choice');

            // Replace the blank span with the correct word
            const blankSpan = sentenceDisplay.querySelector('.blank');
            if (blankSpan) {
                blankSpan.textContent = ` ${correctWord} `;
                blankSpan.style.textDecoration = 'none';
                blankSpan.style.color = 'var(--matched-bg)';
            }

            setTimeout(() => {
                currentSentenceIndex++;
                displayCurrentSentence();
            }, 1500);
        } else {
            sentenceStatusMessage.textContent = 'לא נכון, נסה שוב.';
            sentenceStatusMessage.className = 'incorrect';
            buttonElement.classList.add('incorrect-choice');

            // Re-enable buttons after a delay, but remove the incorrect class first
            setTimeout(() => {
                buttonElement.classList.remove('incorrect-choice');
                allChoiceBtns.forEach(btn => btn.disabled = false);
            }, 1000);
        }
    }


    function populateLevelSelectScreen(mode) {
        levelPathContainer.innerHTML = ''; // Clear previous nodes
        // const completedLevels = progress.getCompletedLevels(); // REMOVED

        const dataSource = (mode === 'words')
            ? (window['words_' + selectedLanguage] || words)
            : (window['sentences_' + selectedLanguage] || sentences);

        dataSource.levels.forEach(level => {
            const levelNode = document.createElement('div');
            levelNode.classList.add('level-node');
            // if (completedLevels.includes(level.level)) { // REMOVED
            //     levelNode.classList.add('completed');
            // }

            const levelNumber = document.createElement('span');
            levelNumber.classList.add('level-node-number');
            levelNumber.textContent = level.level;

            const levelName = document.createElement('span');
            levelName.classList.add('level-node-name');
            levelName.textContent = level.name.split(': ')[1] || level.name;

            levelNode.appendChild(levelNumber);
            levelNode.appendChild(levelName);
            levelNode.dataset.levelId = level.level;

            levelNode.addEventListener('click', () => {
                if (mode === 'words') {
                    loadLevel(level.level);
                    showScreen('game-screen');
                } else {
                    loadSentenceLevel(level.level);
                    showScreen('sentence-game-screen');
                }
            });
            levelPathContainer.appendChild(levelNode);
        });

        // Add Mixed Level Node only for word mode
        if (mode === 'words') {
            const mixedLevelNode = document.createElement('div');
            mixedLevelNode.classList.add('level-node', 'mixed-level');
            mixedLevelNode.textContent = 'Mix';
            mixedLevelNode.addEventListener('click', () => {
                loadLevel('mixed');
                showScreen('game-screen');
            });
            levelPathContainer.appendChild(mixedLevelNode);
        }
    }


    // --- Event Listeners & Initial State ---

    function setLanguage(lang) {
        selectedLanguage = lang;
        localStorage.setItem(LANGUAGE_KEY, lang);
        // In a future step, this is where we would dynamically load scripts
        showScreen('mode-select-screen');
    }

    langCards.forEach(card => {
        card.addEventListener('click', () => {
            const lang = card.dataset.lang;
            setLanguage(lang);
        });
    });

    startGameBtn.addEventListener('click', () => {
        const savedLang = localStorage.getItem(LANGUAGE_KEY);
        if (savedLang) {
            setLanguage(savedLang);
        } else {
            showScreen('lang-select-screen');
        }
    });

    changeLangBtn.addEventListener('click', () => {
        localStorage.removeItem(LANGUAGE_KEY);
        selectedLanguage = null;
        showScreen('lang-select-screen');
    });

    wordModeBtn.addEventListener('click', () => {
        populateLevelSelectScreen('words');
        showScreen('level-select-screen');
    });

    sentenceModeBtn.addEventListener('click', () => {
        populateLevelSelectScreen('sentences');
        showScreen('level-select-screen');
    });

    backToMenuBtn.addEventListener('click', () => {
        showScreen('mode-select-screen');
    });

    backToMenuBtnSentences.addEventListener('click', () => {
        showScreen('mode-select-screen');
    });

    // Initial state
    showScreen('splash-screen');
});
