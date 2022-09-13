
const Player = (() => {
  function create(name, mark) {
    return {
      name,
      mark,
    }
  }

  return {
    create,
  }
})();

const GameBoard = (() => {
  const Length = 9;

  function create(tiles = []) {
    function mark(symbol, position) {
      if (position < 0 || position >= Length) return false;

      tiles[position] = symbol;
      return true;
    }

    function clear() {
      tiles.length = 0;
    }

    // Returns the symbol of the winning player
    function win() {
      for (let i = 0, j = 0; i <= 2; i++, j += 3) {
        if (tiles[i] === tiles[i + 3] && tiles[i + 3] === tiles[i + 6] && tiles[i] && tiles[i + 3] && tiles[i + 6]) return tiles[i];
        if (tiles[j] === tiles[j + 1] && tiles[j + 1] === tiles[j + 2] && tiles[j] && tiles[j + 1] && tiles[j + 2]) return tiles[j];
      }
      for (let i = 0, j = 8; i < 3; i++, j--) {
        if (i === 1) continue;
        if (!tiles[i] || !tiles[4] || !tiles[j]) continue;
        if (tiles[i] === tiles[4] && tiles[4] === tiles[j]) return tiles[4];
      }
    }

    function getTilesLeft() {
      const tilesLeft = [];
      for (let i = 0; i < Length; i++) if (!tiles[i]) tilesLeft.push(i);
      return tilesLeft;
    }

    return {
      get Length() { return Length; },
      get tiles() { return tiles.slice(); },
      getTilesLeft,
      mark,
      clear, 
      win,
    };
  }

  return {
    create,
  };
})();

const playerOne = Player.create('Player 1', 'X');
const playerTwo = Player.create('Player 2', 'O');

const Game = (() => {
  function create(game) {
    const board = GameBoard.create(game? game.getGameBoard().tiles : []);
    let activePlayer = game? game.getActivePlayer() : playerOne;
    let winner;
  
    function getGameBoard(){
      return board;
    }

    function getActivePlayer() {
      return activePlayer;
    }

    function getWinner() {
      return winner;
    }
  
    function mark(tile) {
      if (winner) return;

      board.mark(activePlayer.mark, tile);
      activePlayer = (activePlayer === playerOne)? playerTwo : playerOne;
      console.log(board.tiles);
      return win();
    }

    function reset() {
      board.clear();
      winner = null;
      activePlayer = playerOne;
    }

    function win() {
      if (winner) return;

      winner = board.win();
      if (!winner) return;

      if (winner === playerOne.mark) return winner = playerOne;
      return winner = playerTwo;
    }

    return {
      get isOver() { return !!winner || !board.getTilesLeft().length; },
      getActivePlayer,
      getGameBoard,
      getWinner,
      reset,
      mark,
    };
  }

  return {
    create,
  };
})();

const game = Game.create();

const dialogController = (() => {
  const dialog = document.querySelector('.dialog');
  const title = dialog.querySelector('.title');
  const button = dialog.querySelector('button.prompt');

  let onClickButton = null;

  button.addEventListener('click', click);

  function show(titleText, onClick) {
    title.textContent = titleText;
    onClickButton = onClick;
    dialog.style.visibility = 'visible';
  }

  function hide() {
    dialog.style.visibility = 'hidden';
    onClickButton = null;
  }

  function click() {
    if (!onClickButton) return;
    onClickButton();
    hide();
  }

  return {
    show,
    hide,
    click,
  };
})();

const displayController = (() => {
  const board = [];

  document.querySelector('button.reset').addEventListener('click', reset);

  document.querySelectorAll('.tile button').forEach((tile) => {
    board[tile.dataset.index] = tile;
    tile.addEventListener('click', () => {
      tile.disabled = true;
      tile.textContent = game.getActivePlayer().mark;
      game.mark(tile.dataset.index);

      if (game.isOver) overGame();
    });
  });

  function overGame() {
    disable();
  }

  function reset() {
    board.forEach((tile) => {
      tile.textContent = '';
      tile.disabled = false;
      game.reset();
    });
  }

  function disable() {
    board.forEach((tile) => tile.disabled = true);
  }
})();
