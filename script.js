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
    const wordsPerRound = 5;

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
            card.textContent = wordText;
            card.dataset.word = wordText;
            card.dataset.lang = language;
            card.addEventListener('click', onWordClick);
            column.appendChild(card);
        });
    }

    function onWordClick(event) {
        const selectedCard = event.target;
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

        if (correctPair) {
            setStatusMessage('נכון!', 'correct');
            selectedHebrew.classList.add('matched');
            selectedSpanish.classList.add('matched');
            selectedHebrew.classList.remove('selected');
            selectedSpanish.classList.remove('selected');

            selectedHebrew.removeEventListener('click', onWordClick);
            selectedSpanish.removeEventListener('click', onWordClick);

            selectedHebrew = null;
            selectedSpanish = null;
            matchedPairs++;

            if (matchedPairs === wordsPerRound) {
                // Remove matched words from the pool
                const matchedHebrewWords = Array.from(hebrewColumn.querySelectorAll('.matched')).map(c => c.dataset.word);
                currentWords = currentWords.filter(word => !matchedHebrewWords.includes(word.hebrew));

                matchedPairs = 0;
                setTimeout(() => {
                    setStatusMessage('טוען מילים חדשות...', '');
                    setTimeout(loadRound, 1000);
                }, 1500);
            }
        } else {
            setStatusMessage('לא נכון, נסו שוב.', 'incorrect');
            const hebrewCard = selectedHebrew;
            const spanishCard = selectedSpanish;

            setTimeout(() => {
                hebrewCard.classList.remove('selected');
                spanishCard.classList.remove('selected');
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
