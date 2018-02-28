var i2c = require('i2c');
var address = 0x55;
var wire = new i2c(address, {device: '/dev/i2c-2'}); // point to your i2c address, debug provides REPL interface

/* Enable chip*/
wire.writeBytes(0x00, [0x00, 0x80], function(err) {});

/* Read voltage register 0x04 | 0x80 */
wire.readBytes(0x84, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});

/* Read temperature register 0x02 | 0x80 */
wire.readBytes(0x82, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});

/* Read current register 0x10 | 0x80 */
wire.readBytes(0x90, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});