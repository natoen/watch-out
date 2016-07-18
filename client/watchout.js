const gameOptions = {
  height: 600,
  width: 800,
  nEnemies: 30,
  padding: 20
};

const gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
};

const playerData = [{
  x: 400,
  y: 300,
  height: 20,
  width: 20
}];



const board = d3.select('.board')
  .append('svg')
  .attr({
    width: gameOptions.width,
    height: gameOptions.height
  });

const player = board.selectAll('image')
  .data(playerData)
  .enter()
  .append('image')
  .attr({
    class: 'player',
    x: d => d.x,
    y: d => d.y,
    height: d => d.height,
    width: d => d.width,
    'xlink:href': 'pictures/player.png'
  });

const playerMovement = d3.behavior.drag()
  .on('drag', () => { 
    player.attr({
      x: () => d3.event.x,
      y: () => d3.event.y
    });
  });

player.call(playerMovement);

const randomX = () => Math.random() * gameOptions.width;

const randomY = () => Math.random() * gameOptions.height;

const enemies = [];

for (let i = 0; i < gameOptions.nEnemies; i++) {
  enemies.push({x: randomX(), y: randomY(), name: i});
}

const asteroids = board.selectAll('image')
  .data(enemies)
  .enter()
  .append('image')
  .attr({
    class: 'asteroid',
    height: 20,
    width: 20,
    x: d => d.x,
    y: d => d.y,
    'xlink:href': 'pictures/asteroid.png'
  });



const change = () => { 
  asteroids
    .transition()
    .attr({
      x: d => randomX(),
      y: d => randomY()
    })
    .duration(2000);
};

const runScoreBoard = () => {
  gameStats.currentScore++;
  gameStats.highScore = Math.max(gameStats.highScore, gameStats.currentScore);
  d3.select('.highScore span').html(gameStats.highScore);
  d3.select('.current span').html(gameStats.currentScore);
  d3.select('.collisions span').html(gameStats.collisions);
};

const collision = () => {
  board.selectAll('.asteroid').each(function() {
    // the this here is e.g. board.selectAll('.asteroid')[0][0] hence arrow function is a can't be
    const allowedDistance = (d3.select(this).attr('height') / 2) + (parseInt(player.attr('height') / 2));
    const x = d3.select(this).attr('x') - player.attr('x');
    const y = d3.select(this).attr('y') - player.attr('y');
    const currentDistance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if (allowedDistance > currentDistance) {
      gameStats.collisions++;
      gameStats.currentScore = 0;
    }
  });
};

const throttle = (func, wait) => {
  let cooldown = (new Date()).getTime();

  return () => {
    if (cooldown < (new Date()).getTime()) {
      cooldown = (new Date().getTime()) + wait;
      func();
    }
  };
};

const timedCollision = throttle(collision, 350);

const timedScoreBoard = throttle(runScoreBoard, 1000);



setInterval(change, 2000);

d3.timer(() => {
  timedScoreBoard();
  timedCollision();
});