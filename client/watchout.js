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

var randomX = function() {
  return Math.random() * gameOptions.width;
};

var randomY = function() {
  return Math.random() * gameOptions.height;
};

var playerData = [{
  x: 100,
  y: 100,
  r: 10
}];

var player = board.selectAll('circle')
  .data(playerData)
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', 100)
  .attr('cy', 100)
  .attr('r', 10)
  .style('fill', 'gold');



