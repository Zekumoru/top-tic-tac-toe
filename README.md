# Tic Tac Toe

A simple tic tac toe program to apply the lessons learned on [Factory Functions And The Module Pattern](https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern).

I won't be making this project pretty, I had in mind to make the minimax algorithm shows up like a table of moves where you could see visually how the AI decides its moves but I will discard that idea and I don't want to waste an entire week for every single project.

## Minimax Algorithm (AI)

I watched 2 of like an introductory videos which explains what the algorithm is. Granted, both of them did not go over how to actually implement the algorithm, rather, just what it is and the basic idea behind it.

Basically, the minimax algorithm checks every possible moves and each possible move is given points to how much it favors the player or the opponent. Based on that, the AI makes its move. Since checking every possible moves is time consuming, we could also give the minimax depth and depth is how far the algorithm should foresee the game, e.g., predict a depth of 3 moves, or 5 moves, etc.

As for this project, what helped me turn this minimax algorithm to reality is only this article on [Tic Tac Toe: Understanding the Minimax Algorithm](https://www.neverstopbuilding.com/blog/minimax).
