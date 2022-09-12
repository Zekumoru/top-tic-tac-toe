const GameBoard = (() => {
  const Length = 9;

  function create(tiles = []) {
    
  }

  return {
    create,
  };
})();

const DisplayController = (() => {
  const board = [];

  document.querySelectorAll('.tile button').forEach((tile) => {
    board[tile.dataset.index] = tile;
    tile.addEventListener('click', () => {
      
    });
  });
})();
