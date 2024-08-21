# workout-timer
A simple workout timer for interval training. The timer is designed for high intensity interval training (HIIT) and tabata training. The timer is designed to be simple and easy to use. The timer is designed to be used in a web browser.

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
