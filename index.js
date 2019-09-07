const {
  Board,
  Servo,
  Led,
} = require('johnny-five');

const board = new Board();
const controller = 'PCA9685';

function toggleLed(led, duration) {
  function switchOff(target) {
    target.off();
  }

  led.on();

  setTimeout(switchOff, duration, led);
}

board.on('ready', () => {
  const servo = new Servo.Continuous({
    controller,
    pin: 8,
  });

  servo.cw();

  const leds = [];

  for (let i = 0; i < 8; i += 1) {
    const led = new Led({
      pin: i,
      controller,
    });

    leds.push(led);
  }

  toggleLed(leds[3], 2000);
});
