var i2c = require('i2c');
var address = 0x55;
var wire = new i2c(address, {device: '/dev/i2c-2'}); // point to your i2c address, debug provides REPL interface

wire.writeBytes(0x00, [0x00, 0x80], function(err) {});

wire.on('data', function(data) {
  console.log(data);
  // result for continuous stream contains data buffer, address, length, timestamp 
});

wire.scan(function(err, data) {
  console.log(data);
  // result contains an array of addresses 
});

wire.readBytes(0x84, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});

wire.readBytes(0x82, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});

wire.readBytes(0x90, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});