// TODO: create writing timer timer and resting time timer when click the set button
// TODO: 
// [Done] to display current time
// to display a fixed time when the timer is not active
// to do the count down when the timer active
// to attribute the current class to the corresponding display block when the timer is active and remove when it is not
// to 'switch' timer upon clicking the switch button
// to update and display the end time whenever rest time is updated and the timer is initialized


class Timer {
    constructor(totalTime,timerType) {
      this.totalTime = totalTime; // Total time in milliseconds
      this.timerType=timerType;
      this.startTime = null; // The time when the timer was started
      this.elapsedTime = 0; // Time elapsed in milliseconds
      this.remainingTime = totalTime; // Time remaining in milliseconds
      this.isCompleted = false; // Flag to indicate if the timer is completed
      this.isPaused = true; // Flag to indicate if the timer is paused
      this.timerId = null; // Reference to the setInterval for the timer
      this.pauseTimes = []; // Array to track pause times
      this.restartTimes = []; // Array to track restart times

    }

    displayCallback(){// Callback to update the display
        // console.log(this.timerType, this.remainingTime);
        const msph = 1000 * 60 * 60;
        const hours = Math.floor(this.remainingTime / msph);
        const minutes = Math.floor(this.remainingTime % msph / (1000 * 60));
        const seconds = Math.floor(this.remainingTime % (msph/60) / 1000);
        // console.log(this.timerType+'_hours');
        document.getElementById(this.timerType+'_hours').textContent = String(hours).padStart(2, '0');
        document.getElementById(this.timerType+'_minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById(this.timerType+'_seconds').textContent = String(seconds).padStart(2, '0');
      }; 

    updateTotalTime(totalTime){
        this.totalTime = totalTime;
        this.remainingTime = totalTime;
    }


    // Start or resume the timer
    start() {
      if (this.isCompleted) return;
  
      if (!this.isPaused) {
        this.startTime = Date.now();
      } else {
        this.startTime = Date.now() - this.elapsedTime;
        this.isPaused = false;
      }
    //   console.log(this.timerType, this.startTime,this.remainingTime)
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
  
    // Get the time remaining
    getTimeRemaining() {
      return this.remainingTime;
    }
    checkCompleted() {
        return this.isCompleted;
    }
    // Update the timer properties
    update() {
      if (this.isPaused || this.isCompleted){
        // console.log(this.timerType, 'pausing or ending');
        return;
      }
    //   console.log(this.timerType, 'continuing');
      this.elapsedTime = Date.now() - this.startTime;
      this.remainingTime = this.totalTime - this.elapsedTime;
    //   console.log(this.timerType,this.elapsedTime, this.remainingTime);

  
      if (this.remainingTime <= 0) {
        this.remainingTime = 0;
        this.isCompleted = true;
        // clearInterval(this.timerId);

      }
      this.displayCallback();
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

//   // Pause the timer again after another 20 seconds
//   setTimeout(() => {
//     myTimer.pause();
//     console.log("Timer paused at:", myTimer.getPauseTimes());
//     console.log("Time remaining after second pause:", myTimer.getTimeRemaining());
//   }, 35000);
  
//   // Resume the timer again after another 5 seconds
//   setTimeout(() => {
//     myTimer.start();
//     console.log("Timer restarted at:", myTimer.getRestartTimes());
//   }, 40000);

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
    const endTime = new Date(calculateEndTime(writingTimer));
    updateTime(endTime,'end');
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

    }
  }


function disableSwitch() {
    const button = document.getElementById('switch');
    if (restTimer.checkCompleted()) {
        button.disabled = true;
        button.textContent = 'No rest time remaining'; // Change button text
      }
    
}

refershTime = 500;
// !!!!!actual script!!!!!!
  // Initial call to display the time immediately on load
  updateCurrentTime();
  const restTimer = new Timer(0,'rest');
  const writingTimer = new WritingTimer(0,'writing');

  document.getElementById('set_time').addEventListener('click', () => {
    restTimer.updateTotalTime(calculateTotalTime('rest'));
    // console.log(restTimer);

    restTimer.displayCallback();
    // console.log(restTimer);

    writingTimer.updateTotalTime(calculateTotalTime('writing'));
    writingTimer.displayCallback();
    writingTimer.start();
    setInterval(updateTimers, refershTime);
  });



  document.getElementById('switch').addEventListener('click', () => {
    const className = 'current';

    const writingTimeBlock = document.getElementById('writing_time');
    const restTimeBlock = document.getElementById('rest_time');

    if (restTimer.isPaused && !restTimer.isCompleted) {
        restTimer.start()
        writingTimer.pause()
        restTimeBlock.classList.add(className);
        writingTimeBlock.classList.remove(className);

    } else {
        restTimer.pause()
        writingTimer.start()
        writingTimeBlock.classList.add(className);
        restTimeBlock.classList.remove(className);
    }

  });
  // Update the time every second
  
  setInterval(updateCurrentTime, refershTime);
  setInterval(disableSwitch, refershTime);

  setInterval(updateEndTime, refershTime);


