import { renderChars } from "./createText.js";
import { countWords } from "./calculateMetrics.js";
import {
    isTextChar,
    isCorrectKeyPress,
    handleCorrectKeyPress,
    handleIncorrectKeyPress,
    handleBackspace,
    showCurrentWord,
} from "./characterValidation.js";
import { startCounting, resetTimer } from "./countdown.js";
import { renderFinishedStyle, renderStartingStyle, displayStatsBtn } from "./displayResults.js";
import { showStatisticsWindow } from "./statistics.js";

const handleKeyPress = (event) => {
    const typingScreen = document.getElementById("typing-screen");
    const currentWord = typingScreen?.children[window.currentWordIndex];
    const currentChar = currentWord?.children[window.currentCharIndex];
    if (currentChar && currentWord && isTextChar(event)) {
        if (window.currentCharIndex === 0 && window.window.currentWordIndex === 0) {
            startCounting(event);
        }

        if (isCorrectKeyPress(event, currentChar)) {
            handleCorrectKeyPress(currentChar, currentWord, typingScreen);
        } else if (event.key === "Backspace") {
            handleBackspace(currentWord, typingScreen);
        } else if (event.key === "Enter") {
            resetTypingTest(false);
        } else if (event.key === "Escape") {
            resetTypingTest();
        } else {
            handleIncorrectKeyPress(event, currentChar, currentWord, typingScreen);
        }

        showCurrentWord();
    }
};

const autoFinish = () => {
    document.removeEventListener("keydown", handleKeyPress);
    countWords();
    renderFinishedStyle();
};

const resetTypingTest = async (useNewText = true) => {
    if (useNewText) {
        localStorage.setItem(window.textKey, null);
    }
    renderStartingStyle();
    resetTimer();
    window.currentWordIndex = 0;
    window.currentCharIndex = 0;
    renderChars();
    displayStatsBtn("block");
};

const startTyping = () => {
    renderChars();
    resetTypingTest();
    displayStatsBtn("block");
    document.querySelector("#table-container").style.display = "none";
    document.addEventListener("keydown", handleKeyPress);
};

document.addEventListener("DOMContentLoaded", () => {
    startTyping();
    document.querySelector("#practise-again").addEventListener("click", startTyping);
    document.querySelector("#show-statistics").addEventListener("click", showStatisticsWindow);
});

export { handleKeyPress, autoFinish };
