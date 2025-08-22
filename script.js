document.addEventListener('DOMContentLoaded', () => {
    const hebrewColumn = document.getElementById('hebrew-column');
    const spanishColumn = document.getElementById('spanish-column');
    const levelSelect = document.getElementById('level-select');
    const statusMessage = document.getElementById('status-message');

    let currentLevel = 1;
    let currentWords = [];
    let selectedHebrew = null;
    let selectedSpanish = null;
    let matchedPairs = 0;
    const wordsPerRound = 7;

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
        const levelData = words.levels.find(l => l.level == level);
        if (levelData) {
            currentWords = shuffleArray([...levelData.words]);
            matchedPairs = 0;
            loadRound();
        }
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
        const levelData = words.levels.find(l => l.level == currentLevel);
        const correctPair = levelData.words.find(pair => pair.hebrew === hebrewWord && pair.spanish === spanishWord);

        // Stop pulsing
        selectedHebrew.classList.remove('selected');
        selectedSpanish.classList.remove('selected');

        if (correctPair) {
            setStatusMessage('נכון!', 'correct');

            // Trigger tada animation
            selectedHebrew.classList.add('tada');
            selectedSpanish.classList.add('tada');

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

    levelSelect.addEventListener('change', (e) => {
        loadLevel(e.target.value);
    });

    // Initial load
    loadLevel(levelSelect.value);
});
