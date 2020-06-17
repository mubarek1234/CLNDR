# CLNDR
CSE 110 project. A web app that allows people to create and host events at UCSD, built using Firebase, Express, and React.

## Important note:
Everytime you `git pull` new code, make sure to run `npm install` to pull any new dependencies.

## How to download and set up this project:
0. Make sure you have the following downloaded and installed:
    * `git` (Windows users: [Git Bash](https://git-scm.com/download/win) is an excellent terminal and git client)
    * Node.js (You should from the lab, but if not it is [here](https://nodejs.org/en/))
0. Open a terminal, and clone the repository (`git clone https://github.com/alvinsandiego/CLNDR`)
0. Go to the newly downloaded repository (`cd CLNDR`)
0. In the CLNDR directory, run `npm install` to pull the project dependencies.
0. You are done!

## How to run this project:
0. There are a couple things to note here:
   * React will communicate with Express by requesting endpoints of an API that we will program in Express.
   * As for MVC: Firebase is the Model, React is the View, and Express is the Controller.
0. Now that that's out of the way, open two terminals of some sort and navigate to the `CLNDR` directory.
0. In the first terminal, type `npm run backend` to start the Express server.
0. In the second terminal, type `npm run frontend` to start the React app.
0. A browser window should open with our React app.
0. That's it!
