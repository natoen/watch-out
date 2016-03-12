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
  x: 1,
  y: 1,
  r: 10
}];

var player = board.selectAll('circle')
  .data(playerData)
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 10)
  .style('fill', 'gold');


var generateEnemies = function(n) {
  var storage = [];
  for (var i = 0; i < n; i++) {
    storage.push({x: randomX(),
                  y: randomY(),
                  r: 10,
                  name: i});
  }
  return storage;
}

var enemies = generateEnemies(gameOptions.nEnemies);


var asteroids = board.selectAll('image')
                     .data(enemies)
                     .enter()
                     .append('image')
                     .attr('xlink:href', 'asteroid.png')
                     .attr('x', function(d) { return d.x; })
                     .attr('y', function(d) { return d.y; })
                     .attr('class', 'asteroid')
                     .attr('height', 20)
                     .attr('width', 20);


var change = function () {   
  asteroids.transition()
  .attr('x', function(d) { return randomX(); })
  .attr('y', function(d) { return randomY(); })
  .duration(2000);
};

setInterval(change, 2000);

var playerMovement = d3.behavior.drag()
  .on("drag", function(d) {
    player.attr('cx', function(d) {
      return d3.event.x;
    })
    .attr('cy', function(d) {
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

d3.timer(function() {
  runScoreBoard();
  collision();
});

player.call(playerMovement);

var collision = function () {
  board.selectAll('image').each(function(asteroid) {
    var radiusSum = (d3.select(this).attr('height') / 2) + parseInt(player.attr('r'));
    var x = d3.select(this).attr('x') - player.attr('cx');
    var y = d3.select(this).attr('y') - player.attr('cy');
    var distance = Math.sqrt(Math.pow(x ,2) + Math.pow(y ,2));

    if (radiusSum > distance) {
      gameStats.collisions++
      gameStats.currentScore = 0;
    }
  })
}

// use d3 to select all asteroids 
// for each asteroid check to see if they collide
// if collide, reset score and collision count++
// keep doing this function every 500 ms

// radius asteroid + radius player < distance 

// asteroids.transition().duration(500).style({
  //   top: 50px;
  //   left: 70px;
  // });


// selectAll asteroid
//.data()
//.enter().append('circle').attr('class', 'asteroid')
//.style({ top: random X value,
//         left: random Y value});


// var updateScore = function() {
//   d3.select('.current span').text(gameStats.currentScore);
//   d3.select('highscore span').text(Math.max(gameStats.currentScore, highScore));
//   d3.select('.collisions span')text(gameStats.collisions)
// };

// d3.select('.mouse').on('mousemove', function() {
//   //move player's dot
// });Then

