import { displayStatsBtn, hideTypingScreen } from "./displayResults.js";
import { getDataFromLocalStorage } from "./handleLocalStorage.js";

const showStatisticsWindow = () => {
    const dataTable = document.querySelector("#data-table");
    dataTable.innerHTML = "";
    hideTypingScreen("Here is how you did over time");
    displayStatsBtn("none");
    document.querySelector("#table-container").style.display = "block";
    document.querySelector("#metrics").style.display = "none";
    if (getDataFromLocalStorage(window.statsKey)) {
        const stats = getDataFromLocalStorage(window.statsKey);
        stats.forEach((entry, index) => {
            const row = document.createElement("tr");
            const rowId = `row-${index + 1}`;
            row.id = rowId;
            dataTable.appendChild(row);
            for (const key in entry) {
                if (key !== "allCorrectWordsCount") {
                    const cell = document.createElement("td");
                    let innerText;
                    if (key === "accuracy") {
                        innerText = `${entry[key]}%`;
                    } else if (key === "allFinishedWordsCount") {
                        innerText = `${entry[key]} wpm`;
                    } else {
                        innerText = entry[key];
                    }
                    cell.innerText = innerText;
                    dataTable.querySelector(`#${rowId}`).appendChild(cell);
                }
            }
        });
    }
};
export { showStatisticsWindow };
