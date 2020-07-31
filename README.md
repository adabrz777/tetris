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

> You will need npm and node if you want to contribute.
> node and npm download site: [node and npm](https://nodejs.org/en/download/)

1. At first you should do some tutorial if it's your first contribute: [My first contribution](https://github.com/firstcontributions/first-contributions)

2. Open tetris in your code editor and use `npm install --save` command.

3. Wait for few minutes to finish installation.

4. Use `npm start` command.

5. I think you should start to read what each method or component is responsible for.
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