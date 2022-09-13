
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

    return {
      get Length() { return Length; },
      get tiles() { return tiles.slice(); },
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
  function create() {
    const board = GameBoard.create();
    let activePlayer = playerOne;
  
    function getActivePlayer() {
      return activePlayer;
    }
  
    function mark(tile) {
      board.mark(activePlayer.mark, tile);
      activePlayer = (activePlayer === playerOne)? playerTwo : playerOne;
      console.log(board.tiles);
    }

    return {
      getActivePlayer,
      mark,
    };
  }

  return {
    create,
  };
})();

const game = Game.create();

const displayController = (() => {
  const board = [];

  document.querySelector('button.reset').addEventListener('click', () => {
    board.forEach((tile) => {
      tile.textContent = '';
      tile.disabled = false;
    });
  });

  document.querySelectorAll('.tile button').forEach((tile) => {
    board[tile.dataset.index] = tile;
    tile.addEventListener('click', () => {
      tile.disabled = true;

      tile.textContent = game.getActivePlayer().mark;
      game.mark(tile.dataset.index);
    });
  });
})();
