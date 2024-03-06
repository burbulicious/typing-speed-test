import { storeDataInLocalStorage, getDataFromLocalStorage } from "./handleLocalStorage.js";

const countWords = () => {
    let stats,
        allFinishedWords = 0,
        correctWords = 0,
        accuracy = 0;
    const allWords = [...document.getElementById("typing-screen").children];
    allWords.forEach((word) => {
        if (word.classList.contains("finished")) {
            allFinishedWords++;
            const allWordChars = [...word.children];
            const correctWordChars = allWordChars.filter((char) => {
                return char.classList.contains("correct");
            });
            if (correctWordChars.length === allWordChars.length) {
                correctWords++;
            }
            accuracy = Math.floor((correctWords / allFinishedWords) * 100);
        }
    });
    const currentDate = new Date().toLocaleDateString("lt-LT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const newEntry = {
        allFinishedWordsCount: allFinishedWords,
        allCorrectWordsCount: correctWords,
        accuracy: accuracy,
        date: currentDate,
    };
    if (getDataFromLocalStorage("stats")) {
        stats = getDataFromLocalStorage("stats");
    } else {
        stats = [];
    }
    stats.push(newEntry);
    storeDataInLocalStorage("stats", stats);
};

export { countWords };
