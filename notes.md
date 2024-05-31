- TODO: create writing timer timer and resting time timer when click the set button
  - [x] gpt suggested a method called `displayCallback` that is called by the update method of the timer, will look into this later to see if this is a good idea
TODO:
- [x] to display current timer
- [done by nature] to display a fixed time when the timer is not active
- [done?] to do the count down when the timer active
- to attribute the current class to the corresponding display block when the timer is active and remove when it is not
- [done] to 'switch' timer upon clicking the switch button
- to update and display the end time whenever rest time is updated and the timer is initialized

writing timer:
    if the timer is active:
        do countdown
        check if time runs short
    else:
        update end time

rest timer:
    if active:
        do countdown
        if run to the end:
            deactivate
            activate writing timer


after resting end...

(this.timerType, this.startTime,this.remainingTime)
writing 1717108758459 10794817 timer_script.js:54:15
writing 5183 10794817 timer_script.js:88:15
rest pausing or ending timer_script.js:82:17
writing 1717108764750 10794817 timer_script.js:54:15
writing 0 10800000

Issue:
- The current way of updateTimers might result in extra seconds added to the total exam time, need total assessments.
```
  function updateTimers(){
    restTimer.update();
    if (restTimer.checkCompleted() && writingTimer.isPaused) {
        writingTimer.start();
    }
    writingTimer.update();
  }
```
- when resting time goes to zero the switch button wouldn't reset even after pressing the 'set' button on top and put in finite resting time.
