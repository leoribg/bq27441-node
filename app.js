var i2c = require('i2c');
var address = 0x55;
var wire = new i2c(address, {device: '/dev/i2c-2'}); // point to your i2c address, debug provides REPL interface
var total =  0;

/* Unseal chip*/
wire.writeBytes(0x00, [0x00, 0x80], function(err) {});
wire.writeBytes(0x00, [0x00, 0x80], function(err) {});

/* Send SET_CFGUPDATE subcommand */
wire.writeBytes(0x00, [0x13, 0x00], function(err) {});

/* Write 0x00 using BlockDataControl() command (0x61) to enable block data memory control. */
wire.writeBytes(0x61, [0x00], function(err) {});

/* Write 0x52 using the DataBlockClass() command (0x3E) to access the State subclass (82 decimal, 0x52 hex) containing the Design Capacity parameter */
wire.writeBytes(0x3E, [0x52], function(err) {});

/* Write the block offset location using DataBlock() command (0x3F) */
wire.writeBytes(0x3F, [0x00], function(err) {});

/* Set capacity 0x04B0 = 1200mAh */
wire.writeBytes(0x4A, [0x04, 0xB0], function(err) {});

/* Calculate new checksum*/
wire.readBytes(0xC0, 32, function(err, res) {  

  for(var i = 0; i < res.length; i++)
  {                  
    total += Number(res[i]);
  }

  total = total % 256;
  console.log(total.toString(16));
  // result contains a buffer of bytes 
});

/* Write new checksum. */
wire.writeBytes(0x60, [total], function(err) {});

/* Exit CFGUPDATE mode by sending SOFT_RESET subcommand */
wire.writeBytes(0x00, [0x42, 0x00], function(err) {});

/* If the device was previously SEALED, return to SEALED mode by sending the Control(0x0020) subcommand */
wire.writeBytes(0x00, [0x20, 0x00], function(err) {});

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

/* Read device capacity register 0x4A | 0x80 */
wire.readBytes(0xCA, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});

/* Read device capacity register 0x0C | 0x80 */
wire.readBytes(0x8C, 2, function(err, res) {
  console.log(res);
  // result contains a buffer of bytes 
});