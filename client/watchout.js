var gameOptions = {
  height: 600,
  width: 800,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
}

var playerData = [{
  x: 1,
  y: 1,
  height: 20,
  width: 20
}];

var board = d3.select('.board').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);

var randomX = function() {
  return Math.random() * gameOptions.width;
};

var randomY = function() {
  return Math.random() * gameOptions.height;
};

var player = board.selectAll('image')
  .data(playerData)
  .enter()
  .append('image')
  .attr('class', 'player')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .attr('height', function(d) { return d.height; })
  .attr('width', function(d) { return d.width; })
  .attr('xlink:href', 'player.png');


var generateEnemies = function(n) {
  var storage = [];
  for (var i = 0; i < n; i++) {
    storage.push({x: randomX(), y: randomY(), name: i});
  }
  return storage;
}

var enemies = generateEnemies(gameOptions.nEnemies);


var asteroids = board
  .selectAll('image')
  .data(enemies)
  .enter()
  .append('image')
  .attr({
    class: 'asteroid',
    height: 20,
    width: 20,
    x: d => d.x,
    y: d => d.y,
    'xlink:href': 'asteroid.png'
  });


var change = function () { 
  asteroids.transition()
  .attr('x', function(d) { return randomX(); })
  .attr('y', function(d) { return randomY(); })
  .duration(2000);
};

var playerMovement = d3.behavior.drag()
  .on("drag", function() {
    player.attr('x', function() {
      return d3.event.x;
    })
    .attr('y', function() {
      return d3.event.y;
    })
  });

var runScoreBoard = function() {
  gameStats.currentScore++;
  gameStats.highScore = Math.max(gameStats.highScore, gameStats.currentScore);
  d3.select('.highScore span').html(gameStats.highScore);
  d3.select('.current span').html(gameStats.currentScore);
  d3.select('.collisions span').html(gameStats.collisions);
}

var collision = function () {
  board.selectAll('.asteroid').each(function(asteroid) {
    var radiusSum = (d3.select(this).attr('height') / 2) + (parseInt(player.attr('height') / 2));
    var x = d3.select(this).attr('x') - player.attr('x');
    var y = d3.select(this).attr('y') - player.attr('y');
    var distance = Math.sqrt(Math.pow(x ,2) + Math.pow(y ,2));

    if (radiusSum > distance) {
      gameStats.collisions++
      gameStats.currentScore = 0;
    }
  });
};

var throttle = function(func, wait) {
  var cooldown = (new Date()).getTime();

  return function () {
    if (cooldown < (new Date()).getTime()) {
      func();
      cooldown = (new Date().getTime()) + wait;
    }
  };
};

var timedCollision = throttle(collision, 350);

player.call(playerMovement);

setInterval(change, 2000);

d3.timer(function() {
  runScoreBoard();
  timedCollision();
});