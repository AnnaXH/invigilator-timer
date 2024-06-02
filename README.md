# invigilator-timer
This is a timer I built for invigilators to use in college exam, it can also be used to track exams and resting time for at-home exams (as suggested by my friend in the US who ha a PhD qualification exam that requires her to track times).



## How to Download and Use the Timer
Prerequisite: 
- a modern web browser to fully support the HTML, CSS, and JavaScript functionalities.


### Downloading the Timer

1. **Clone the Repository:**
   - Open your terminal or command prompt.
   - Run the following command to clone the repository to your local machine:
     ```sh
     git clone https://github.com/AnnaXH/invigilator-timer.git
     ```
   - Navigate to the cloned directory:
     ```sh
     cd your-repository
     ```

2. **Download as ZIP:**
   - Alternatively, you can download the repository as a ZIP file.
   - Click the "Code" button on the repository page and select "Download ZIP".
   - Extract the ZIP file to your desired location.

### Using the Timer

1. **Open the HTML File:**
   - Locate the `index.html` file in the repository.
   - Open the `index.html` file in your preferred web browser.

2. **Set the Rest Timer:**
   - In the input fields, enter the desired exam and resting time in hours and minutes.
   - Click the "Set" button to start the timer. The writing time timer will start while the rest timer will be paused
   - If you wish to reset the timer, the best way to do so is by refreshing the page, as clicking the "Set" button is not configured properly to handle this scenario.

3. **Time Displays:**
   - The current time will be displayed at the top panel and updated every second.
   - Both timers are in the panels in the middle, displaying the remaining hours, minutes, and seconds. The active timer will be enlarged and updated every second.
   - The end time of the exam will be displayed at the bottom panel. It will also be updated when the rest  timer is active.
   - When there is 30 min remaining for the writing time the writing time timer will turn purple to remind you to announce this to the candidate.
   - When the time is up the writing time timer will turn red to indicate you need to announce the end of the exam. (work in progress)

4. **Changing between timers:**
   - When the candidate requests a break, press the `Change to rest / writing` button to switch to the rest timer. The countdown for the exam time will be paused and the countdown for the rest time will start.
   - If the candidate wishes to resume writing, click this button again to switch back to the writing timer.
   - The rest timer will be disabled and will switch back to the writing timer when there is no resting time remaining. The button to switch will also be disabled.


## Known issues
- the only way to reset the timer is to refresh the page
- Switch button is not automatically disabled if no rest time is allowed for the exam
- Instead of remain a constant, end time will become the current time when the writing time timer runs out
