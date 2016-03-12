var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
}

var addPixel = function(number) {
  return number + 'px';
}

var board = d3.select('.board').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);



