document.addEventListener('DOMContentLoaded', () => {
    // --- Screen Management ---
    const screens = document.querySelectorAll('.screen');
    const splashScreen = document.getElementById('splash-screen');
    const levelSelectScreen = document.getElementById('level-select-screen');
    const gameScreen = document.getElementById('game-screen');
    const startGameBtn = document.getElementById('start-game-btn');
    const levelPathContainer = document.getElementById('level-path-container');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');

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

    let currentLevel = 1;
    let currentWords = [];
    let selectedHebrew = null;
    let selectedSpanish = null;
    let matchedPairs = 0;
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
        if (level === 'mixed') {
            let allWords = words.levels.reduce((acc, currentLevel) => acc.concat(currentLevel.words), []);
            currentWords = shuffleArray([...allWords]);
        } else {
            const levelData = words.levels.find(l => l.level == level);
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
        const spanishWords = roundWords.map(word => word.spanish);

        displayWords(shuffleArray(hebrewWords), hebrewColumn, 'hebrew');
        displayWords(shuffleArray(spanishWords), spanishColumn, 'spanish');
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

            if (language === 'spanish') {
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
        } else if (lang === 'spanish') {
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
        const spanishWord = selectedSpanish.dataset.word;

        let correctPair;
        if (currentLevel === 'mixed') {
            let allWords = words.levels.reduce((acc, level) => acc.concat(level.words), []);
            correctPair = allWords.find(pair => pair.hebrew === hebrewWord && pair.spanish === spanishWord);
        } else {
            const levelData = words.levels.find(l => l.level == currentLevel);
            correctPair = levelData.words.find(pair => pair.hebrew === hebrewWord && pair.spanish === spanishWord);
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

    function populateLevelSelectScreen() {
        levelPathContainer.innerHTML = ''; // Clear previous nodes
        const completedLevels = progress.getCompletedLevels();

        words.levels.forEach(level => {
            const levelNode = document.createElement('div');
            levelNode.classList.add('level-node');
            if (completedLevels.includes(level.level)) {
                levelNode.classList.add('completed');
            }
            levelNode.textContent = level.level;
            levelNode.dataset.levelId = level.level;

            levelNode.addEventListener('click', () => {
                loadLevel(level.level);
                showScreen('game-screen');
            });
            levelPathContainer.appendChild(levelNode);
        });

        // Add Mixed Level Node
        const mixedLevelNode = document.createElement('div');
        mixedLevelNode.classList.add('level-node', 'mixed-level');
        mixedLevelNode.textContent = 'Mix';
        mixedLevelNode.addEventListener('click', () => {
            loadLevel('mixed');
            showScreen('game-screen');
        });
        levelPathContainer.appendChild(mixedLevelNode);
    }


    // --- Event Listeners & Initial State ---
    startGameBtn.addEventListener('click', () => {
        populateLevelSelectScreen(); // Populate levels right before showing the screen
        showScreen('level-select-screen');
    });

    backToMenuBtn.addEventListener('click', () => {
        showScreen('level-select-screen');
    });

    // Initial state
    showScreen('splash-screen');
});
