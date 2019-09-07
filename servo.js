/* eslint-disable no-console */

const {
  Board,
  Servo,
} = require('johnny-five');

const board = new Board();
const controller = 'PCA9685';

function pushProduct(servo) {
  function stopServo(target) {
    target.stop();
  }

  servo.cw(1);

  setTimeout(stopServo, 5000, servo);
}

board.on('ready', () => {
  console.log('Connected to the board...');

  const servos = [];

  for (let i = 0; i < 8; i += 1) {
    const servo = new Servo.Continuous({
      controller,
      pin: i,
    });

    servos.push(servo);
  }

  pushProduct(servos[2]);
});
