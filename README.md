# About "Tetris in ReactJS"

## Hello :wave:

This is of course unofficial ReactJS version of tetris.

Here you have to fight not only with time, you have to fight also with bugs ;P

**Feel free to contribute if you want.**

I think this code is pretty readable.
I'll be glad if you add a few comments or something else to make it easier to read if you don't think it's that good at all.

## Contributting
You can contribute to this project if you want improve your experience with git and github or if you just want to add something to this game and have a little fun.

If you just want to add something just pull request :wink:.

## How to start
> There are not any documentation right now but there are few comments in code which can be useful so please don't worry.

1. At first you should do this tutorial if it's your first contribute: [My first contribution](https://github.com/firstcontributions/first-contributions)

2. I think you should start to read what each method or component is responsible for.
To do this you can open every component from the top to the bottom of the components tree. Dont worry. Project isn't really big and it's not gonna be hard :smiley:.

## Components tree :deciduous_tree:

```
--- index.js
    |--- App.js
         |--- Board.js
         |    |--- Cells.js
         |    |--- GameOver.js
         |    |--- Pause.js
         |    |--- Next.js
         |    |--- Score.js
         |
         |--- Settings.js
              |--- Audio.js
              |--- HightstScore.js
```

## Keys
| Key     | Action                                               | Key code |
|:-------:|------------------------------------------------------|:--------:|
| A       | First player's active block moves left               | 65       |
| D       | First player's active block moves right              | 68       |
| S       | First player's active block moves one step down      | 83       |
| V       | First player's active block rotates                  | 86       |
| B       | First player's active block instantly puts down      | 66       |
| Left    | Second player's active block moves left              | 37       |
| Right   | Second player's active block moves right             | 39       |
| Down    | Second player's active block moves one step down     | 40       |
| .       | Second player's active block rotates                 | 190      |
| /       | Second player's active block instantly puts down     | 191      |
| P       | Pause game for both of players                       | 80       |
| R       | Restart game for both of players                     | 82       |

*I know I should show the keys in the game instead of showing them here and I will change it in the future if I have time.*

---
# create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
