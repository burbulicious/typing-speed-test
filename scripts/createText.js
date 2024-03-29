import { storeDataInLocalStorage, getDataFromLocalStorage } from "./handleLocalStorage.js";

const fetchData = async () => {
    try {
        const response = await fetch(`https://poetrydb.org/author,linecount/Shakespeare;14/lines`);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex].lines;
        const randomText = randomItem.join("  ");
        return randomText;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const createChars = async () => {
    try {
        let allChars = [];
        const recordWpm = 213;
        const fetchAndAppend = async () => {
            const text = await fetchData();
            const chars = text
                .trim()
                .split(/\s+/)
                .filter((word) => word !== "")
                .map((word) => [...word, " "]);
            allChars = allChars.concat(chars);
            if (allChars.length < recordWpm) {
                await fetchAndAppend();
            } else {
                allChars = allChars.slice(0, recordWpm);
                allChars[allChars.length - 1].pop();
            }
        };
        await fetchAndAppend();
        return allChars;
    } catch (error) {
        console.error("Error updating div with text:", error);
    }
};

const renderChars = async () => {
    const typingScreen = document.getElementById("typing-screen");
    typingScreen.style.transform = "translateY(0px)";
    const statusMessage = document.getElementById("status-message");
    statusMessage.innerText = "Loading text...";
    statusMessage.style.display = "block";
    typingScreen.innerHTML = "";
    let words;
    try {
        if (getDataFromLocalStorage(window.textKey)) {
            words = getDataFromLocalStorage(window.textKey);
        } else {
            words = await createChars();
            storeDataInLocalStorage(window.textKey, words);
        }
        statusMessage.style.display = "none";
        words.forEach((word, wordIndex) => {
            const newWord = document.createElement("div");
            newWord.className = "word";
            typingScreen.appendChild(newWord);
            word.forEach((char, charIndex) => {
                const newChar = document.createElement("div");
                if (wordIndex === 0 && charIndex === 0) {
                    newChar.className = "current";
                }
                newChar.innerText = char;
                newWord.appendChild(newChar);
            });
        });
    } catch (error) {
        console.error("Error updating div with text:", error);
        statusMessage.innerText = "There was an error loading the text. Try again later";
        statusMessage.style.display = "block";
    }
};

export { fetchData, createChars, renderChars };
