javascript: (function () {
    window.quizletHints = !window.quizletHints;
    let observer;
    let questionObserver;
    let cards = [];
    let lastQuestion = '';

    // Cleanup function
    function cleanup() {
        document.getElementById('inline-hint')?.remove();
        observer?.disconnect();
        questionObserver?.disconnect();
    }

    if (!window.quizletHints) {
        cleanup();
        showToast('Hints OFF');
        return;
    }

    // Extract flashcard data
    function getFlashcards() {
        try {
            const data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
            return data.props.pageProps.studyModesCommon.studiableDocumentData.studiableItems.map(card => {
                const term = card.cardSides.find(s => s.label === 'word').media.find(m => m.type === 1).plainText;
                const def = card.cardSides.find(s => s.label === 'definition').media.find(m => m.type === 1).plainText;
                return { term: term, def: def };
            });
        } catch (e) {
            console.error('Data error:', e);
            return [];
        }
    }

    // Insert hint between prompt and answer with theme detection
    function insertHint(letter) {
        const writeQuestion = document.querySelector('.WriteQuestion');
        const answerDiv = writeQuestion?.querySelector('.WriteQuestion-answer');
        if (!writeQuestion || !answerDiv) return false;

        // Remove existing hint
        const existingHint = document.getElementById('inline-hint');
        if (existingHint) existingHint.remove();

        // Detect theme
        const bodyClass = document.body.className;
        const isDarkMode = bodyClass.includes('theme-night');
        const isLightMode = bodyClass.includes('theme-default');

        // Create new hint
        const hint = document.createElement('div');
        hint.id = 'inline-hint';
        hint.textContent = `Hint: ${letter}___`;
        hint.style.fontWeight = 'bold';
        hint.style.padding = '10px';
        hint.style.textAlign = 'center';
        hint.style.borderBottom = '.125rem solid var(--gray-200-gray-900)';

        // Set colors based on theme
        hint.style.color = isDarkMode ? '#fff' : '#000';
        hint.style.backgroundColor = isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';

        writeQuestion.insertBefore(hint, answerDiv);
        return true;
    }

    cards = getFlashcards();

    // Update hint with first letter
    function updateHint() {
        const promptText = document.querySelector('.WriteTextAttribute')?.firstChild?.ariaLabel;

        if (!promptText || promptText === lastQuestion) return;
        lastQuestion = promptText;

        let match = cards.find(c => c.term === promptText);
        if (match) return insertHint(match.def.charAt(0).toUpperCase());

        match = cards.find(c => c.def === promptText);
        if (match) return insertHint(match.term.charAt(0).toUpperCase());

        insertHint('?');
    }

    // DOM observation logic
    function createObserver() {
        const observer = new MutationObserver((mutations) => {
            // Check if question element exists
            const questionElement = document.querySelector('.WriteTextAttribute');
            if (questionElement) {
                // Observe attribute changes on the question element
                const answerObserver = new MutationObserver(updateHint);
                answerObserver.observe(questionElement.firstChild, {
                    attributes: true,
                    attributeFilter: ['aria-label']
                });

                // Initial update
                updateHint();
            }
        });

        // Observe the entire document for question container changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    // Observe body class changes for theme switch
    function observeTheme() {
        const themeObserver = new MutationObserver(() => {
            const hint = document.getElementById('inline-hint');
            if (hint) {
                const bodyClass = document.body.className;
                const isDarkMode = bodyClass.includes('theme-night');

                hint.style.color = isDarkMode ? '#fff' : '#000';
                hint.style.backgroundColor = isDarkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
            }
        });

        themeObserver.observe(document.body, {
            attributes: true
        });
    }

    // Show toast notification with fade animation
    function showToast(message) {
        // Remove existing toast if present
        const existingToast = document.getElementById('quizlet-hint-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'quizlet-hint-toast';
        toast.textContent = message;
        toast.style.position = 'relative';
        toast.style.top = '50%';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -50%)';
        toast.style.margin = '30px 0 0 0';
        toast.style.padding = '10px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        toast.style.color = 'white';
        toast.style.background = '#4257b2';
        toast.style.maxWidth = 'fit-content';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease-in-out';

        if (document.querySelector('.WriteQuestion')) {
            document.querySelector('.WriteQuestion').appendChild(toast);

            // Fade in
            setTimeout(() => {
                toast.style.opacity = '1';
            }, 10);

            // Fade out and remove
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.addEventListener('transitionend', function () {
                    toast.remove();
                });
            }, 2000);
        }
    }


    // Start observing
    observer = createObserver();
    observeTheme();
    showToast('Hints ON');
    updateHint(); // Initial update
})();
