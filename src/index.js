let shouldLog = false;
function log(...args) {
  if (shouldLog) {
    console.log(...args);
  }
}

const timeLeft = document.querySelector(".current-clock");
console.log(timeLeft.innerHTML);
function createPomodoroClock() {
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");
  const playBtn = document.querySelector("#play");
  const sessionLengthValueNode = document.querySelector(
    "#session-length .timer-length"
  );
  const breakLengthValueNode = document.querySelector(
    "#break-length .timer-length"
  );
  let timeLeft = document.querySelector(".current-clock");
  const currentClockHeading = document.querySelector("#current-clock-heading");
  const pomodoroClock = {
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
      let minutes = Math.floor(seconds / 60);
      let remainderSeconds = seconds % 60;
      let display = `${minutes}:${
        remainderSeconds < 10 ? 0 : ""
      }${remainderSeconds}`;
      timeLeft.innerHTML = display;
      console.log({ minutes, remainderSeconds });
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
          clearInterval(countdown);
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
      let countdown = setInterval(timeLeft, 1000);
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
    pomodoroClock.timer(currentClockHeading.innerHTML)
  );
  return pomodoroClock;
}

const pomodoroClock = createPomodoroClock();
