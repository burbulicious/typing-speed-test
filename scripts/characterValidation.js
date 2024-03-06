window.currentWordIndex = 0;
window.currentCharIndex = 0;

const isTextChar = (event) => {
    const isShiftPressed = event.getModifierState("ShiftKey");
    const isAlphanumeric = /^[a-zA-Z0-9,.!?:;'"\s-]+$/.test(event.key);
    const isAltPressed = event.key === "Alt";
    const isCapsPressed = event.key === "CapsLock";
    const isControlPressed = event.key === "Control";
    const isTabPressed = event.key === "Tab";
    return (
        (isShiftPressed && isAlphanumeric && !isAltPressed && !isCapsPressed && !isControlPressed && !isTabPressed) ||
        (isAlphanumeric && !isAltPressed && !isCapsPressed && !isControlPressed && !isTabPressed) ||
        (!isAltPressed && !isCapsPressed && !isControlPressed && !isTabPressed)
    );
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
    if (event.key !== "Shift") {
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

export { isTextChar, isCorrectKeyPress, handleCorrectKeyPress, handleIncorrectKeyPress, handleBackspace };
