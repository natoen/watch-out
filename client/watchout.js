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
  .duration(1000);
};

setInterval(change, 1000);

var playerMovement = d3.behavior.drag()
  .on("drag", function(d) {
    player.attr('cx', function(d) {
      return d3.event.x;
    })
    .attr('cy', function(d) {
      return d3.event.y;
    })
  });

player.call(playerMovement);
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

