let shouldLog = false;
function log(...args) {
  if (shouldLog) {
    console.log(...args);
  }
}

const minsLeft = document.querySelector("#minutes-left");
const secsLeft = document.querySelector("#seconds-left");
const sessionLengthValueNode = document.querySelector(
  "#session-length .timer-length"
);
function createPomodoroClock() {
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");
  const playBtn = document.querySelector("#play");
  const puaseBtn = document.querySelector("#pause");
  const resetBtn = document.querySelector("#reset");
  const breakLengthValueNode = document.querySelector(
    "#break-length .timer-length"
  );
  const currentClockHeading = document.querySelector("#current-clock-heading");
  const pomodoroClock = {
    remainingMinutes: minsLeft.innerHTML,
    remainingSeconds: 0,
    timerSwitchCounter: true,
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
        minsLeft.innerHTML = `${timerLengthNode.innerHTML}`;
      pomodoroClock.remainingMinutes = minsLeft.innerHTML;
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
        minsLeft.innerHTML = `${timerLengthNode.innerHTML}`;
      pomodoroClock.remainingMinutes = minsLeft.innerHTML;
    },
    displayTimeLeft: seconds => {
      pomodoroClock.remainingMinutes = Math.floor(seconds / 60);
      pomodoroClock.remainingSeconds = seconds % 60;
      minsLeft.innerHTML = pomodoroClock.remainingMinutes;
      secsLeft.innerHTML = `${pomodoroClock.remainingSeconds < 10 ? 0 : ""}${
        pomodoroClock.remainingSeconds
      }`;
    },
    switchTimer: timerToSwitchTo => {
      currentClockHeading.innerHTML = timerToSwitchTo;
      pomodoroClock.remainingSeconds = 0;
      pomodoroClock.timer(
        pomodoroClock.remainingMinutes,
        pomodoroClock.remainingSeconds
      );
    },
    timer: (remainingMinutes, remainingSeconds) => {
      let totalSeconds = remainingMinutes * 60 + remainingSeconds;
      let now = Date.now();
      let then = now + totalSeconds * 1000;
      //console.log(then - now);
      let minsLeft = () => {
        let secondsLeft = Math.round((then - Date.now()) / 1000);
        console.log(secondsLeft);
        if (secondsLeft < 1) {
          clearInterval(pomodoroClock.countdown);
          if (!pomodoroClock.timerSwitchCounter) {
            pomodoroClock.timerSwitchCounter = true;
            pomodoroClock.remainingMinutes = sessionLengthValueNode.innerHTML;
            pomodoroClock.remainingSeconds = 0;
            currentClockHeading.innerHTML = "Session";
            pomodoroClock.timer(
              pomodoroClock.remainingMinutes,
              pomodoroClock.remainingSeconds
            );
            //pomodoroClock.switchTimer("Session");
          } else if (pomodoroClock.timerSwitchCounter) {
            pomodoroClock.timerSwitchCounter = false;
            pomodoroClock.remainingMinutes = breakLengthValueNode.innerHTML;
            pomodoroClock.remainingSeconds = 0;
            currentClockHeading.innerHTML = "Break";
            pomodoroClock.timer(
              pomodoroClock.remainingMinutes,
              pomodoroClock.remainingSeconds
            );
            //pomodoroClock.switchTimer("Break");
          }
        }
        pomodoroClock.displayTimeLeft(secondsLeft);
      };
      playBtn.disabled = true;
      minusBtns.forEach(minusBtn => (minusBtn.disabled = true));
      plusBtns.forEach(plusBtn => (plusBtn.disabled = true));
      pomodoroClock.countdown = setInterval(minsLeft, 1000);
    },
    pauseTimer: () => {
      clearInterval(pomodoroClock.countdown);
      playBtn.disabled = false;
    },
    resetClock: () => {
      sessionLengthValueNode.innerHTML = 25;
      breakLengthValueNode.innerHTML = 10;
      minsLeft.innerHTML = sessionLengthValueNode.innerHTML;
      pomodoroClock.remainingMinutes = sessionLengthValueNode.innerHTML;
      pomodoroClock.remainingSeconds = 0;
      secsLeft.innerHTML = "00";
      clearInterval(pomodoroClock.countdown);
      playBtn.disabled = false;
    }
  };

  plusBtns.forEach(plusBtn =>
    plusBtn.addEventListener("click", e => pomodoroClock.addOne(e.target.id))
  );
  minusBtns.forEach(minusBtn =>
    minusBtn.addEventListener("click", e =>
      pomodoroClock.subtractOne(e.target.id)
    )
  );
  playBtn.addEventListener("click", e =>
    pomodoroClock.timer(
      pomodoroClock.remainingMinutes,
      pomodoroClock.remainingSeconds
    )
  );
  puaseBtn.addEventListener("click", e => pomodoroClock.pauseTimer());
  resetBtn.addEventListener("click", e => pomodoroClock.resetClock());
  return pomodoroClock;
}
minsLeft.innerHTML = sessionLengthValueNode.innerHTML;
secsLeft.innerHTML = "00";
const pomodoroClock = createPomodoroClock();
