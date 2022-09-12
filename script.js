
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
    
  }

  return {
    create,
  };
})();

const playerOne = Player.create('Player 1', 'X');
const playerTwo = Player.create('Player 2', 'O');

const game = (() => {
  let activePlayer = playerOne;

  function getActivePlayer() {
    return activePlayer;
  }

  return {
    getActivePlayer,
  };
})();


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
    });
  });
})();
