// Copyright (C) 2024  Anna Hu

const msph = 1000 * 60 * 60;

class Timer {
    constructor(totalTime,timerType) {
      this.totalTime = totalTime; // Total time in milliseconds
      this.timerType=timerType;
      this.startTime = null; // The time when the timer was started
      this.elapsedTime = 0; // Time elapsed in milliseconds
      this.remainingTime = totalTime; // Time remaining in milliseconds
      this.displayRemain = true; // Flag to indicate if the remaining time should be displayed
      this.isCompleted = false; // Flag to indicate if the timer is completed
      this.isPaused = true; // Flag to indicate if the timer is paused
      this.timerId = null; // not used yet - placeholder for functionality related to multiple timers
      this.pauseTimes = []; // Array to track pause times
      this.restartTimes = []; // Array to track restart times

      // check if the timer is unlimited - used if allow unlimited rest time
      if (totalTime === null || totalTime === -1) {
        this.totalTime = null; // ensure its set to null for consistency
        this.remainingTime = null;
        this.isUnlimited = true;
      }
      else {
        this.isUnlimited = false;
      }

    }
    
    getDisplayTime(timeMs) {
      if (timeMs == null) return ['--','--','--'];
      const hours = Math.floor(timeMs / 3600000);
      const minutes = Math.floor(timeMs % 3600000 / 60000);
      const seconds = Math.floor(timeMs % 60000 / 1000);
      return [String(hours).padStart(2,'0'), String(minutes).padStart(2,'0'), String(seconds).padStart(2,'0')];
    };

    displayCallback(){// Callback to update the display
        // console.log(this.timerType, this.remainingTime);
        let displayTimeMs;
        if (this.displayRemain) {
          displayTimeMs = this.remainingTime;
        } else {
          displayTimeMs = this.elapsedTime;
        }
        const [hours, minutes, seconds] = this.getDisplayTime(displayTimeMs);
        // console.log(this.timerType+'_hours');
        document.getElementById(this.timerType+'_hours').textContent = hours;
        document.getElementById(this.timerType+'_minutes').textContent = minutes;
        document.getElementById(this.timerType+'_seconds').textContent = seconds;
    }

    updateTotalTime(totalTime){
        this.totalTime = totalTime;
        this.remainingTime = totalTime 

        if (totalTime === null || totalTime === -1) {
          this.totalTime = null; // ensure its set to null for consistency
          this.remainingTime = null;
          this.isUnlimited = true;
          this.isCompleted = false;
      } else if(totalTime == 0) {
          this.isCompleted = true;
        } else {
          this.isCompleted = false;
        }
    }

    // Start or resume the timer
    start() {
      if (this.isCompleted) return;
  
      if (!this.isPaused) {
        this.startTime = Date.now();
      } else {// recovering from pause - adjust start time to account for elapsed time before pause
        this.startTime = Date.now() - this.elapsedTime;
        this.isPaused = false;
      }
    //  console.log(this.timerType, this.startTime,this.remainingTime, this.elapsedTime)
      this.restartTimes.push(this.startTime);

    //   this.timerId = setInterval(() => {
    //     this.update();
    //   }, 100);
    }
  
    // Pause the timer
    pause() {
      if (!this.isPaused) {
        // clearInterval(this.timerId);
        this.update();
        this.isPaused = true;
        this.pauseTimes.push(Date.now());
      }
    }
  
    reset() {
      this.startTime = null;
      this.elapsedTime = 0;
      this.remainingTime = this.totalTime;
      this.isCompleted = (this.totalTime !== null && this.totalTime === 0);
      this.isPaused = true;
      this.pauseTimes = [];
      this.restartTimes = [];
      this.displayCallback();
    }

    // Get the time remaining
    getTimeRemaining() {
      return this.remainingTime;
    }

    // get the time used
    getElapsedTime() {
      return this.elapsedTime;
    }
    checkCompleted() {
        return this.isCompleted;
    }
    // Update the timer properties
    update() {
      if (this.isPaused || this.isCompleted){
        // console.log(this.timerType, 'pausing or ending');
        return;
      }else if (this.isUnlimited) {
        // console.log(this.timerType, 'unlimited');
        this.elapsedTime = Date.now() - this.startTime;
        this.displayCallback();
        return;
      } else {
    //   console.log(this.timerType, 'continuing');
        this.elapsedTime = Date.now() - this.startTime;
        this.remainingTime = this.totalTime - this.elapsedTime;
      }
    //   console.log(this.timerType,this.elapsedTime, this.remainingTime);

  
      if (this.remainingTime <= 0) {
        this.remainingTime = 0;
        this.isCompleted = true;
        // clearInterval(this.timerId);

      }
      this.displayCallback();
    }
    
    checkDisplayRemain() {
      return this.displayRemain;
    }

    changeDisplayRemain() {
      this.displayRemain = !this.displayRemain;
    }

    // Get the pause times
    getPauseTimes() {
      return this.pauseTimes;
    }
  
    // Get the restart times
    getRestartTimes() {
      return this.restartTimes;
    }
  }

class WritingTimer extends Timer {
    constructor(totalTime,timeType) {
      super(totalTime,timeType);
      this.shortInTime = false; // Additional property for writing timer
    }
  
    // Override the update method to include the check for short in time
    update() {
      super.update();
      this.checkShortInTime();
    }
  
    // Method to check if the remaining time is less than 30 minutes
    checkShortInTime() {
      if (this.remainingTime < 30 * 60 * 1000) {
        this.shortInTime = true;
      }
    }
  }

  function updateTime(time,display_type) {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    document.getElementById(display_type+'_hours').textContent = hours;
    document.getElementById(display_type+'_minutes').textContent = minutes;
    document.getElementById(display_type+'_seconds').textContent = seconds;
  }

  function updateCurrentTime(){
    const now = new Date();
    updateTime(now,'current');
  }
  
  function calculateEndTime(writingTimer) {
    // return the end time of the exam in ms
    const now = new Date();
    const nowMs = now.getTime();
    const remainingTime = writingTimer.getTimeRemaining();

    return remainingTime + nowMs
  }

  function calculateTotalTime(timeType) {
    const hours = parseInt(document.getElementById('total_'+timeType+'_hours').value) || 0;
    const minutes = parseInt(document.getElementById('total_'+timeType+'_minutes').value) || 0;
    // console.log(hours, minutes);
    return (hours * 60 + minutes ) * 60000
  }
  function updateEndTime(){
    if (!writingTimer.isCompleted){
      const endTime = new Date(calculateEndTime(writingTimer));
      updateTime(endTime,'end');
    }
  }

  function updateTimers(){
    const writingTimeBlock = document.getElementById('writing_time');
    const restTimeBlock = document.getElementById('rest_time');
    const className = 'current';

    restTimer.update();
    if (restTimer.checkCompleted() && writingTimer.isPaused) {
        writingTimer.start();

        restTimeBlock.classList.remove(className);
        writingTimeBlock.classList.add(className);

    }
    writingTimer.update();
    if (!writingTimeBlock.classList.contains('shortTime') && writingTimer.shortInTime) {
        writingTimeBlock.classList.add('shortTime');
        alert("You have thirty minutes left!");

    }

    if (!writingTimeBlock.classList.contains('examEnded') && writingTimer.checkCompleted()) {
      writingTimeBlock.classList.add('examEnded');
      document.body.style.background=window.getComputedStyle(writingTimeBlock).backgroundColor;      // document.body.style.background ="#292a70";
      const button = document.getElementById('switch');
      if (!restTimer.checkCompleted()) {
        button.disabled = true;
        button.textContent = 'Exam ended';
      }
      alert("The exam ends now!");

    }
  }

function disableSwitch() {
    const button = document.getElementById('switch');
    if (restTimer.checkCompleted()) {
        button.disabled = true;
        button.textContent = 'No rest time remaining'; // Change button text
      }
    
}

refershTime = 300; // decrease the number to increase refresh rate for smoother experience


// !!!!!actual script!!!!!!
  // Initial call to display the time immediately on load
  pause = true;
  updateCurrentTime();
  const pauseBtn = document.getElementById("pause");
  const setBtn = document.getElementById('set_time');
  const writingUsedBtn = document.getElementById('writing_switch');
  const restUsedBtn = document.getElementById('rest_switch');


  setBtn.addEventListener('click', () => {
    if (document.getElementById('unlimited_rest_time').checked) {
      restTime = null;
    } else {
      restTime = calculateTotalTime('rest');
    }

    restTimer = new Timer(restTime,'rest');
    // console.log(restTimer);
    restTimer.displayCallback();

    writingTimer = new WritingTimer(calculateTotalTime('writing'),'writing');
    writingTimer.displayCallback();
    setBtn.textContent = "Reset time";
    setInterval(updateEndTime, refershTime);
    pauseBtn.textContent = "Start"; // refresh text in case the timer was reset
    // TODO: prompt user to confirm reset if timers are already running
  });

  pauseBtn.addEventListener('click', () => {
    if (pause) {
      writingTimer.start();
      setInterval(updateTimers, refershTime);
      setInterval(disableSwitch, refershTime);
      document.getElementById('switch').disabled = false;
      pause = false;
      pauseBtn.textContent = "Pause both"; // Change button text to refelct that timer has started
    } else {
      writingTimer.pause();
      restTimer.pause();
      pause = true;
      pauseBtn.textContent = "Resume"; // Change button text to refelct that timer is paused

    }

  });

  const switchDisplayType = (timer, button, header, timerText) => {
    if (timer.checkDisplayRemain()) {
      button.textContent = "Show Remaining";
      header.textContent = timerText + " Time Used";
    } else {
      button.textContent = "Show Used";
      header.textContent = timerText + " Time Remaining";
    }
    timer.changeDisplayRemain();
    timer.displayCallback();
  };

  const writingHeader = document.getElementById('writing_header');
  writingUsedBtn.addEventListener('click', () => {
    switchDisplayType(writingTimer, writingUsedBtn, writingHeader, "Writing");
  });

  const restHeader = document.getElementById('rest_header');
  restUsedBtn.addEventListener('click', () => {
    switchDisplayType(restTimer, restUsedBtn, restHeader, "Rest");
  });


  const switchBtn = document.getElementById("switch");
  switchBtn.addEventListener('click', () => {
    const className = 'current';

    const writingTimeBlock = document.getElementById('writing_time');
    const restTimeBlock = document.getElementById('rest_time');

    if (restTimer.isPaused && !restTimer.isCompleted) {
        restTimer.start()
        writingTimer.pause()
        restTimeBlock.classList.add(className);
        writingTimeBlock.classList.remove(className);
        switchBtn.textContent = "Change to writing time";

    } else {
        restTimer.pause()
        writingTimer.start()
        writingTimeBlock.classList.add(className);
        restTimeBlock.classList.remove(className);
        switchBtn.textContent = "Change to rest time";

    }

  });
  // Update the time every second
  
  setInterval(updateCurrentTime, refershTime);



