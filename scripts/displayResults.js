import { getDataFromLocalStorage } from "./handleLocalStorage.js";

const helpText = document.querySelector("#help-text");
const countdown = document.querySelector("#countdown");
const heroTitle = document.querySelector("#top-content");
const infoScreen = document.querySelector("#info-screen");
const typingScreenWrapper = document.querySelector("#typing-screen-wrapper");
const typingScreenTitle = document.querySelector("#typing-screen-title");
const practiceBtn = document.querySelector("#practise-again");
const metrics = document.querySelector("#metrics");
const speed = document.querySelector("#speed");
const accuracy = document.querySelector("#accuracy");
const tableContainer = document.querySelector("#table-container");

const renderStartingStyle = () => {
    heroTitle.style.transform = "translateY(0px)";
    infoScreen.style.transform = "translateY(0px)";
    helpText.style.opacity = 1;
    countdown.style.opacity = 1;
    typingScreenWrapper.style.display = "block";
    typingScreenTitle.style.display = "none";
    practiceBtn.style.display = "none";
    metrics.style.display = "none";
    tableContainer.style.display = "none";
};

const renderActiveStyle = () => {
    heroTitle.style.transform = "translateY(0px)";
    infoScreen.style.transform = "translateY(0px)";
    helpText.style.opacity = 1;
    countdown.style.opacity = 1;
    typingScreenWrapper.style.display = "block";
    document.querySelector("#show-statistics").style.display = "none";
};

const renderFinishedStyle = () => {
    hideTypingScreen("Here is how you did this time");
    metrics.style.display = "flex";
    showResults();
    displayStatsBtn("block");
};

const hideTypingScreen = (titleText) => {
    helpText.style.opacity = 0;
    countdown.style.opacity = 0;
    heroTitle.style.transform = "translateY(100px)";
    infoScreen.style.transform = "translateY(-40px)";
    typingScreenWrapper.style.display = "none";
    typingScreenTitle.style.display = "block";
    typingScreenTitle.innerText = titleText;
    practiceBtn.style.display = "flex";
};

const showResults = () => {
    if (getDataFromLocalStorage(window.statsKey)) {
        const stats = getDataFromLocalStorage(window.statsKey);
        const latestStats = stats[stats.length - 1];
        const lastestSpeed = latestStats.allCorrectWordsCount;
        const lastestAccuracy = latestStats.accuracy;

        speed.innerText = lastestSpeed;
        accuracy.innerHTML = lastestAccuracy;

        if (stats.length === 1) {
            displayComparisonItems("none");
        } else {
            const statsBefore = stats[stats.length - 2];
            const speedBefore = statsBefore.allCorrectWordsCount;
            const accuracyBefore = statsBefore.accuracy;
            displayComparisonItems("flex");
            updateComparisonItem(lastestSpeed, speedBefore, "#speed-comparison", ".number-of-words");
            updateComparisonItem(lastestAccuracy, accuracyBefore, "#accuracy-comparison", ".number-of-percent");
        }
    }
};

const displayStatsBtn = (display) => {
    const viewStatsBtn = document.querySelector("#show-statistics");
    if (getDataFromLocalStorage(window.statsKey)) {
        viewStatsBtn.style.display = display;
    } else {
        viewStatsBtn.style.display = "none";
    }
};

function displayComparisonItems(displayValue) {
    document.querySelectorAll(".comparison").forEach((item) => {
        item.style.display = displayValue;
    });
}

function updateComparisonItem(latestMetric, metricBefore, comparisonItemId, metricClass) {
    const comparisonItem = document.querySelector(comparisonItemId);
    const difference = latestMetric - metricBefore;
    if (difference > 0) {
        comparisonItem.querySelector(".better").style.display = "block";
        comparisonItem.querySelector(".worse").style.display = "none";
        comparisonItem.querySelector(".same").style.display = "none";
        comparisonItem.querySelector(".better").querySelector(metricClass).innerText = difference;
    } else if (difference === 0) {
        comparisonItem.querySelector(".better").style.display = "none";
        comparisonItem.querySelector(".worse").style.display = "none";
        comparisonItem.querySelector(".same").style.display = "block";
    } else {
        comparisonItem.querySelector(".better").style.display = "none";
        comparisonItem.querySelector(".worse").style.display = "block";
        comparisonItem.querySelector(".same").style.display = "none";
        comparisonItem.querySelector(".worse").querySelector(metricClass).innerText = -1 * difference;
    }
}
export { renderStartingStyle, renderActiveStyle, renderFinishedStyle, displayStatsBtn, hideTypingScreen };
