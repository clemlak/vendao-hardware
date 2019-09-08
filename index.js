/* eslint-disable no-console */

const {
  Board,
  Servo,
} = require('johnny-five');

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/2d3bb1ebacff45c3aa347f54d66bb2e1'),
);

const abi = [{"constant":true,"inputs":[],"name":"backend","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_vendor","type":"string"},{"internalType":"string","name":"_product","type":"string"}],"name":"backendPurchaseProduct","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vendors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"vendorNames","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_vendorContract","type":"address"}],"name":"addVendor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"location","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_vendor","type":"string"},{"internalType":"string","name":"_product","type":"string"}],"name":"purchaseProduct","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vendorContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_location","type":"string"},{"internalType":"address","name":"_backend","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_vendor","type":"string"},{"indexed":false,"internalType":"string","name":"_product","type":"string"},{"indexed":false,"internalType":"uint256","name":"_timestamp","type":"uint256"}],"name":"ProductPurchased","type":"event"}];
const contractAddress = '0x984c682e4cd0dfC8c5B1ffd2fc7900d18F26d550';

const contract = new web3.eth.Contract(abi, contractAddress);

const board = new Board();
const controller = 'PCA9685';

function pushProduct(servo) {
  function stopServo(target) {
    target.stop();
  }

  servo.ccw(1);

  setTimeout(stopServo, 1000, servo);
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

  contract.events.ProductPurchased({
    fromBlock: 'latest',
  }, (err, event) => {
    if (!err) {
      console.log(event);

      console.log('Pushing product:', event.returnValues.product);

      // pushProduct(servos[4]);
    }
  });
});
