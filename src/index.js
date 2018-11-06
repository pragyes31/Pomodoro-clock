let shouldLog = false;
function log(...args) {
  if (shouldLog) {
    console.log(...args);
  }
}

const minsLeft = document.querySelector("#minutes-left");
const secsLeft = document.querySelector("#seconds-left");
const timeLeft = document.querySelector(".current-clock");
console.log(timeLeft.innerHTML);
function createPomodoroClock() {
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");
  const playBtn = document.querySelector("#play");
  const puaseBtn = document.querySelector("#pause");
  const resetBtn = document.querySelector("#reset");
  const sessionLengthValueNode = document.querySelector(
    "#session-length .timer-length"
  );
  const breakLengthValueNode = document.querySelector(
    "#break-length .timer-length"
  );
  let timeLeft = document.querySelector(".current-clock");
  const currentClockHeading = document.querySelector("#current-clock-heading");
  const pomodoroClock = {
    remainderMinutes: "",
    remainderSeconds: "",
    countdown: "",
    getTimerLength: timerType => {
      return parseFloat(
        document.querySelector(`#${timerType} .timer-length`).innerHTML
      );
    },
    addOne: signBtnId => {
      const timerType = signBtnId === "break-plus" ? "Break" : "Session";
      const timerLengthNode = document.querySelector(
        `#${timerType} .timer-length`
      );
      if (pomodoroClock.getTimerLength(timerType) >= 60) return;
      timerLengthNode.innerHTML = pomodoroClock.getTimerLength(timerType) + 1;
      if (timerType === "Session")
        timeLeft.innerHTML = `${timerLengthNode.innerHTML}:00`;
    },
    subtractOne: signBtnId => {
      console.log(signBtnId);
      const timerType = signBtnId === "break-minus" ? "Break" : "Session";
      const timerLengthNode = document.querySelector(
        `#${timerType} .timer-length`
      );
      if (pomodoroClock.getTimerLength(timerType) <= 1) return;
      timerLengthNode.innerHTML = pomodoroClock.getTimerLength(timerType) - 1;
      if (timerType === "Session")
        timeLeft.innerHTML = `${timerLengthNode.innerHTML}:00`;
    },
    displayTimeLeft: seconds => {
      pomodoroClock.remainderMinutes = Math.floor(seconds / 60);
      pomodoroClock.remainderSeconds = seconds % 60;
      let display = `${pomodoroClock.remainderMinutes}:${
        pomodoroClock.remainderSeconds < 10 ? 0 : ""
      }${pomodoroClock.remainderSeconds}`;
      timeLeft.innerHTML = display;
      //console.log({ remainderMinutes, remainderSeconds });
    },
    timer: currentClock => {
      let timerValue =
        currentClock === "Session"
          ? sessionLengthValueNode.innerHTML
          : breakLengthValueNode.innerHTML;
      let seconds = timerValue * 60;
      let now = Date.now();
      let then = now + seconds * 1000;
      //console.log(then - now);
      let timeLeft = () => {
        let secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 1) {
          clearInterval(pomodoroCLock.countdown);
          if (currentClock === "Session") {
            currentClockHeading.innerHTML = "Break";
            pomodoroClock.timer(currentClockHeading.innerHTML);
          }
          if (currentClock === "Break") {
            currentClockHeading.innerHTML = "Session";
            pomodoroClock.timer(currentClockHeading.innerHTML);
          }
        }
        pomodoroClock.displayTimeLeft(secondsLeft);
      };
      playBtn.disabled = true;
      minusBtns.forEach(minusBtn => (minusBtn.disabled = true));
      plusBtns.forEach(plusBtn => (plusBtn.disabled = true));

      pomodoroClock.countdown = setInterval(timeLeft, 1000);
    },
    pauseTimer: () => {
      console.log(
        pomodoroClock.remainderMinutes,
        pomodoroClock.remainderSeconds
      );
      clearInterval(pomodoroClock.countdown);
      playBtn.disabled = false;
    },
    resetClock: () => {
      console.log("resetTimer triggered");
      minusBtns.forEach(minusBtn => (minusBtn.disabled = false));
      plusBtns.forEach(plusBtn => (plusBtn.disabled = false));
    }
  };
  minsLeft.innerHTML = sessionLengthValueNode.innerHTML;
  secsLeft.innerHTML = "00";
  plusBtns.forEach(plusBtn =>
    plusBtn.addEventListener("click", e => pomodoroClock.addOne(e.target.id))
  );
  minusBtns.forEach(minusBtn =>
    minusBtn.addEventListener("click", e =>
      pomodoroClock.subtractOne(e.target.id)
    )
  );
  playBtn.addEventListener("click", e =>
    pomodoroClock.timer(currentClockHeading.innerHTML)
  );
  puaseBtn.addEventListener("click", e => pomodoroClock.pauseTimer());
  resetBtn.addEventListener("click", e => pomodoroClock.resetClock());
  return pomodoroClock;
}

const pomodoroClock = createPomodoroClock();
