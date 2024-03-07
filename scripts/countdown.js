import { isTextChar } from "./characterValidation.js";
import { renderActiveStyle } from "./displayResults.js";
import { autoFinish } from "./script.js";

const timeLimit = 60;
const strokeColour = "#ffd000";

let canvas = document.getElementById("stopwatch"),
    ctx = canvas.getContext("2d"),
    seconds = document.getElementById("time"),
    timerOn = false,
    second = (2 * Math.PI) / timeLimit,
    start = 1.5 * Math.PI,
    t = timeLimit,
    animation,
    timer;

const draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(60, 60, 60, start, start - second * t);
    t = t <= 0 ? timeLimit : t - 0.05;
    ctx.stroke();
    ctx.strokeStyle = strokeColour;
};

const runTimer = () => {
    if (!timerOn) {
        timerOn = true;
        animation = setInterval(function () {
            draw();
            seconds.innerHTML = Math.floor(t);
            if (t <= 0) {
                clearInterval(animation);
                resetTimer();
            }
        }, 50);
    } else {
        timerOn = false;
        clearInterval(animation);
    }
};

const startCounting = (event) => {
    if (isTextChar(event) && event.key !== "Shift") {
        runTimer();
        renderActiveStyle();
        timer = setTimeout(autoFinish, timeLimit * 1000);
    }
};

const resetTimer = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timerOn = false;
    seconds.innerHTML = timeLimit;
    clearTimeout(timer);
    clearInterval(animation);
    t = timeLimit;
};

export { runTimer, resetTimer, startCounting };
