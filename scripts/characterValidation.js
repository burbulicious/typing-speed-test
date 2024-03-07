window.currentWordIndex = 0;
window.currentCharIndex = 0;

const isTextChar = (event) => {
    const nonprintableKeyboardKeys = {
        9: "Tab",
        12: "NumPad5",
        17: "Ctrl",
        18: "Alt",
        19: "Pause/Break",
        20: "CapsLock",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Leftarrow",
        38: "Uparrow",
        39: "Rightarrow",
        40: "Downarrow",
        44: "PrintScreen",
        45: "Insert",
        46: "Delete",
        91: "leftWin",
        92: "rightWin",
        93: "Popup",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
    };

    return !nonprintableKeyboardKeys[event.keyCode];
};

const isCorrectKeyPress = (event, currentChar) => {
    const isShiftPressed = event.getModifierState("ShiftKey");
    const isCorrectKey = event.key === currentChar.innerText;

    return (isShiftPressed && isCorrectKey) || isCorrectKey;
};

const handleCorrectKeyPress = (currentChar, currentWord, typingScreen) => {
    currentChar.classList.remove("current", "incorrect");
    currentChar.classList.add("correct");
    window.currentCharIndex++;

    if (window.currentCharIndex === currentWord.children.length) {
        handleWordCompletion(typingScreen);
    } else {
        currentWord.children[window.currentCharIndex].classList.add("current");
    }
};

const handleIncorrectKeyPress = (event, currentChar, currentWord, typingScreen) => {
    if (event.key !== "Shift" && isTextChar(event)) {
        currentChar.classList.remove("current", "correct");
        currentChar.classList.add("incorrect");
        window.currentCharIndex++;

        if (window.currentCharIndex === currentWord.children.length) {
            handleWordCompletion(typingScreen);
        } else {
            currentWord.children[window.currentCharIndex].classList.add("current");
        }
    }
};

const handleWordCompletion = (typingScreen) => {
    typingScreen.children[window.currentWordIndex].classList.add("finished");
    setNextLinePostion(typingScreen);
    window.currentWordIndex++;
    window.currentCharIndex = 0;
    typingScreen.children[window.currentWordIndex].children[0].classList.add("current");
};

const setNextLinePostion = (typingScreen) => {
    let typingScreenTop = typingScreen.getBoundingClientRect().top;
    let curentWordTop = typingScreen.children[window.currentWordIndex].getBoundingClientRect().top;
    let nextWordTop = typingScreen.children[window.currentWordIndex + 1].getBoundingClientRect().top;

    let currentHeigthDifference = curentWordTop - typingScreenTop;
    let nextHeigthDifference = nextWordTop - typingScreenTop;

    if (nextHeigthDifference !== currentHeigthDifference) {
        typingScreen.style.transform = `translateY(${0 - nextHeigthDifference}px)`;
    }
};

const handleBackspace = (currentWord, typingScreen) => {
    currentWord.children[window.currentCharIndex].classList.remove("current");
    if (window.currentCharIndex > 0) {
        window.currentCharIndex--;
        currentWord.children[window.currentCharIndex].classList.remove("correct", "incorrect");
        currentWord.children[window.currentCharIndex].classList.add("current");
    } else if (window.currentWordIndex > 0) {
        window.currentWordIndex--;
        const lastWord = typingScreen.children[window.currentWordIndex];
        window.currentCharIndex = lastWord.children.length - 1;
        lastWord.children[window.currentCharIndex].classList.remove("correct", "incorrect");
        lastWord.children[window.currentCharIndex].classList.add("current");
    }
};

const showCurrentWord = (typingScreen) => {
    Array.from(typingScreen.children).forEach((word, index) => {
        word.classList.remove("current-word");
        if (window.currentWordIndex === index) {
            word.classList.add("current-word");
        }
    });
};

export {
    isTextChar,
    isCorrectKeyPress,
    handleCorrectKeyPress,
    handleIncorrectKeyPress,
    handleBackspace,
    showCurrentWord,
};
