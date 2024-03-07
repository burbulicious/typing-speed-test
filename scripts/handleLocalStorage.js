window.textKey = "text";
window.statsKey = "stats";

const storeDataInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (error) {
            console.error("Error parsing data from localStorage:", error);
            return false;
        }
    } else {
        return false;
    }
};

export { storeDataInLocalStorage, getDataFromLocalStorage };
