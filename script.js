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

    // --- Progress Management ---
    const progress = {
        getCompletedLevels: function() {
            const completed = localStorage.getItem('palabrasCompletedLevels');
            return completed ? JSON.parse(completed) : [];
        },
        markLevelAsComplete: function(levelNum) {
            let completed = this.getCompletedLevels();
            if (!completed.includes(levelNum)) {
                completed.push(levelNum);
                localStorage.setItem('palabrasCompletedLevels', JSON.stringify(completed));
            }
        }
    };

    // --- TEXT-TO-SPEECH FUNCTIONALITY ---
    let spanishVoice = null;

    function loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        spanishVoice = voices.find(voice => voice.lang.startsWith('es')) || voices.find(voice => voice.lang.startsWith('en')); // Fallback to English
    }

    function speak(text) {
        if (!spanishVoice) {
            console.warn("Spanish voice not loaded yet.");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = spanishVoice;
        utterance.lang = 'es-ES';
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

        // --- Update foreign language column header and style ---
        const langMap = { es: 'Español', en: 'English', de: 'Deutsch', ar: 'العربية' };
        const foreignColumn = document.getElementById('spanish-column'); // This ID is now misleading, but we'll keep it for simplicity
        const foreignHeader = foreignColumn.querySelector('h2');
        foreignHeader.textContent = langMap[selectedLanguage] || 'Español';

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
            statusMessage.textContent = 'כל הכבוד! סיימת את כל המילים ברמה זו.';
            statusMessage.className = 'correct';
            progress.markLevelAsComplete(currentLevel);
            // TODO: Add a "back to levels" button or automatic transition
            return;
        }

        const hebrewWords = roundWords.map(word => word.hebrew);
        const foreignWords = roundWords.map(word => word.foreign);

        displayWords(shuffleArray(hebrewWords), hebrewColumn, 'hebrew');
        displayWords(shuffleArray(foreignWords), spanishColumn, 'foreign');
    }

    function clearBoard() {
        hebrewColumn.innerHTML = '<h2>עברית</h2>';
        spanishColumn.innerHTML = '<h2>ספרדית</h2>';
    }

    function displayWords(wordsArray, column, language) {
        wordsArray.forEach(wordText => {
            const card = document.createElement('div');
            card.classList.add('word-card');
            card.dataset.word = wordText;
            card.dataset.lang = language;

            const wordSpan = document.createElement('span');
            wordSpan.textContent = wordText;
            card.appendChild(wordSpan);

            if (language === 'foreign') {
                const speakerIcon = document.createElement('i');
                speakerIcon.className = 'fas fa-volume-up speaker-icon';
                speakerIcon.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card from being selected
                    speak(wordText);
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
        const hebrewWord = selectedHebrew.dataset.word;
        const foreignWord = selectedSpanish.dataset.word;

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
        selectedHebrew.classList.remove('selected');
        selectedSpanish.classList.remove('selected');

        if (correctPair) {
            setStatusMessage('נכון!', 'correct');

            // Trigger correct match animation
            selectedHebrew.classList.add('correct-match');
            selectedSpanish.classList.add('correct-match');

            // Mark as matched after animation
            setTimeout(() => {
                selectedHebrew.classList.add('matched');
                selectedSpanish.classList.add('matched');
                selectedHebrew.removeEventListener('click', onWordClick);
                selectedSpanish.removeEventListener('click', onWordClick);

                selectedHebrew = null;
                selectedSpanish = null;
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
            selectedHebrew.classList.add('shake');
            selectedSpanish.classList.add('shake');

            const hebrewCard = selectedHebrew;
            const spanishCard = selectedSpanish;

            // Remove shake class after animation so it can be re-triggered
            setTimeout(() => {
                hebrewCard.classList.remove('shake');
                spanishCard.classList.remove('shake');
            }, 500);

            selectedHebrew = null;
            selectedSpanish = null;
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
        const levelData = sentenceData.levels.find(l => l.level == levelNum);
        if (levelData) {
            currentSentences = shuffleArray([...levelData.sentences]);
            currentSentenceIndex = 0;
            displayCurrentSentence();
        }
    }

    function displayCurrentSentence() {
        sentenceChoicesContainer.innerHTML = '';
        sentenceStatusMessage.textContent = '';

        if (currentSentenceIndex >= currentSentences.length) {
            sentenceDisplay.textContent = 'כל הכבוד! סיימת את כל המשפטים ברמה זו.';
            // TODO: Mark sentence level as complete
            return;
        }

        const sentenceData = currentSentences[currentSentenceIndex];
        sentenceDisplay.textContent = sentenceData.text;

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

            // Animate the word filling in
            sentenceDisplay.textContent = sentenceDisplay.textContent.replace('___', ` ${correctWord} `);

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
        const completedLevels = progress.getCompletedLevels(); // Note: progress is shared for now

        const dataSource = (mode === 'words')
            ? (window['words_' + selectedLanguage] || words)
            : (window['sentences_' + selectedLanguage] || sentences);

        dataSource.levels.forEach(level => {
            const levelNode = document.createElement('div');
            levelNode.classList.add('level-node');
            if (completedLevels.includes(level.level)) { // TODO: Differentiate progress by mode
                levelNode.classList.add('completed');
            }

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
