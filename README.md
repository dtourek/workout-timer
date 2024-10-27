# workout-timer
A simple workout timer for any interval purpose. 
The timer could be used e.g. for high intensity interval training (HIIT) and tabata training. 

The timer is designed to be simple and easy to use and ready for any web browser.

## Installation
1. `yarn`
2. `yarn dev`

## Features
1. Start, pause and stop current timer
    - Show time left
    - Show current round
    - Show current cycle
    - Show current phase
    - Smallest time unit: for user seconds, for code 1/100 seconds or milliseconds. Reason for this is that when user clicks pause, the time left should be the same when the timer is resumed. For example when user pause timer in 1.999 seconds, it should start from 1.999 seconds when resumed.
2. Define timer options:
    - Prepare
    - Work
    - Rest
    - Rounds
    - Name, description
3. Save and load timer presets
4. Save history of completed timers

# Colors
https://coolors.co/f6f9f7-292b2f-26282c-ff7400-ffffff

# TODO
- [ ] Add sounds when timer is: done, paused, resumed, stopped
- [ ] Add timer presets, e.g. HIIT, Tabata, Pomodoro
- [ ] Add multiple timers to be defined 
- [ ] User settings in local storage:
  - [ ] Save user preferred settings, persist it in local storage
  - [ ] Load user preferred settings from local storage
  - [ ] Save timer history in local storage
- [ ] Add tests
- [ ] Add analytics
- [ ] Add error handling

# Future
- [ ] Make it mobile app with react native
- [ ] Publish it to App Store
- [ ] Publish it to Google Play store
- [ ] Make it desktop app with electron
