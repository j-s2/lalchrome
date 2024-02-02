### Lakers Chrome Extension Project

This Chrome extension is designed for Lakers fans to stay updated with the latest scores of their games in real-time. Developed using React and TypeScript, this project leverages the power of API-NBA to fetch live stats, ensuring fans never miss out on the action.

## How It Works

The extension queries API-NBA for the latest Lakers game stats when clicked. 

**No Game Scenario**

When there is no game, it shows the following default message when clicked:

![Alt text](src/imgs/No%20Game.png?raw=true "No Games")

**Game On Scenario**

When there is currently a Lakers game going on, the extension showcases the teams playing, the quarter, how much time is left, and the team scores. 

![Alt text](src/imgs/Game%20is%20On.png?raw=true "Games")

