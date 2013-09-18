
/**
 * Defines an interface to interact with attached IO boards - arduinos, servo controllers, etc
 * @param {String} port The name of the device we are connecting to
 * @param {function} callback A function to be invoked when the board is ready to interact with.
 */
function IOBoard( port, onReady ) {
  
}

/**
 * Asks the board to tell us its version.
 * @param {function} callback A function to be called when the board has reported its version.
 */
IOBoard.prototype.reportVersion = function( callback ) {
  
};

/**
 * Asks the board to tell us its firmware version.
 * @param {function} callback A function to be called when the board has reported its firmware version.
 */
IOBoard.prototype.queryFirmware = function( callback ) {
  
};

/**
 * Asks the board to read analog data.
 * @param {number} pin The pin to read analog data
 * @param {function} callback A function to call when we have the analag data.
 */
IOBoard.prototype.analogRead = function( pin, callback ) {
  
};

/**
 * Asks the board to write an analog message.
 * @param {number} pin The pin to write analog data to.
 * @param {nubmer} value The data to write to the pin between 0 and 255.
 */
IOBoard.prototype.analogWrite = function( pin, value ) {
  
};

/**
 * Asks the board to move a servo
 * @param {number} pin The pin the servo is connected to
 * @param {number} value The degrees to move the servo to.
 */
IOBoard.prototype.servoWrite = function( pin, value ) {
  
};

/**
 * Asks the board to set the pin to a certain mode.
 * @param {number} pin The pin you want to change the mode of.
 * @param {number} mode The mode you want to set. Must be one of board.MODES
 */
IOBoard.prototype.pinMode = function( pin, mode ) {
  
};

/**
 * Asks the board to write a value to a digital pin
 * @param {number} pin The pin you want to write a value to.
 * @param {value} value The value you want to write. Must be board.HIGH or board.LOW
 */
IOBoard.prototype.digitalWrite = function( pin, value ) {
  
};

/**
 * Asks the board to read digital data
 * @param {number} pin The pin to read data from
 * @param {function} callback The function to call when data has been received
 */
IOBoard.prototype.digitalRead = function( pin, callback ) {
  
};

/**
 * Asks the board to tell us its capabilities
 * @param {function} callback A function to call when we receive the capabilities
 */
IOBoard.prototype.queryCapabilities = function( callback ) {
  
};

/**
 * Asks the board to tell us its analog pin mapping
 * @param {function} callback A function to call when we receive the pin mappings.
 */
IOBoard.prototype.queryAnalogMapping = function( callback ) {
  
};

/**
 * Asks the board to tell us the current state of a pin
 * @param {number} pin The pin we want to the know the state of
 * @param {function} callback A function to call when we receive the pin state.
 */
IOBoard.prototype.queryPinState = function( pin, callback ) {
  
};

/**
 * Sends a I2C config request to the board with an optional
 * value in microseconds to delay an I2C Read.  Must be called before
 * an I2C Read or Write
 * @param {number} delay in microseconds to set for I2C Read
 */
IOBoard.prototype.sendI2CConfig=function( delay ){
  
};

/**
 * Asks the board to send an I2C request to a device
 * @param {number} slaveAddress The address of the I2C device
 * @param {Array} bytes The bytes to send to the device
 */
IOBoard.prototype.sendI2CWriteRequest = function( slaveAddress, bytes ) {
  
};

/**
 * Asks the board to request bytes from an I2C device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} numBytes The number of bytes to receive.
 * @param {function} callback A function to call when we have received the bytes.
 */
IOBoard.prototype.sendI2CReadRequest = function( slaveAddress, numBytes, callback ) {
  
};

/**
 * Set sampling interval in millis. Default is 19 ms
 * @param {number} interval The sampling interval in ms > 10
 */
IOBoard.prototype.setSamplingInterval = function( interval ) {
  
};

/**
 * Set reporting on pin
 * @param {number} pin The pin to turn on/off reporting
 * @param {number} value Binary value to turn reporting on/off
 */
IOBoard.prototype.reportAnalogPin = function( pin, value ) {
  
};

/**
 * Set reporting on pin
 * @param {number} pin The pin to turn on/off reporting
 * @param {number} value Binary value to turn reporting on/off
 */
IOBoard.prototype.reportDigitalPin = function( pin, value ) {
  
};

/**
 *
 *
 */
IOBoard.prototype.pulseIn = function( opts, callback ) {
  
};

/**
 * Asks the board to configure a stepper motor with the given config to allow asynchronous control of the stepper
 * @param {number} deviceNum Device number for the stepper (range 0-5, expects steppers to be setup in order from 0 to 5)
 * @param {number} type One of this.STEPPER.TYPE.*
 * @param {number} stepsPerRev Number of steps motor takes to make one revolution
 * @param {number} dirOrMotor1Pin If using EasyDriver type stepper driver, this is direction pin, otherwise it is motor 1 pin
 * @param {number} stepOrMotor2Pin If using EasyDriver type stepper driver, this is step pin, otherwise it is motor 2 pin
 * @param {number} [motor3Pin] Only required if type == this.STEPPER.TYPE.FOUR_WIRE
 * @param {number} [motor4Pin] Only required if type == this.STEPPER.TYPE.FOUR_WIRE
 */
IOBoard.prototype.stepperConfig = function( deviceNum, type, stepsPerRev, dirOrMotor1Pin, stepOrMotor2Pin, motor3Pin, motor4Pin ) {
  
};

/**
 * Asks the board to move a stepper a number of steps at a specific speed
 * (and optionally with and acceleration and deceleration)
 * speed is in units of .01 rad/sec
 * accel and decel are in units of .01 rad/sec^2
 * TODO: verify the units of speed, accel, and decel
 * @param {number} deviceNum Device number for the stepper (range 0-5)
 * @param {number} direction One of this.STEPPER.DIRECTION.*
 * @param {number} steps Number of steps to make
 * @param {number} speed
 * @param {number|function} accel Acceleration or if accel and decel are not used, then it can be the callback
 * @param {number} [decel]
 * @param {function} [callback]
 */
IOBoard.prototype.stepperStep = function( deviceNum, direction, steps, speed, accel, decel, callback ) {
  
};

/**
 * Send SYSTEM_RESET to board
 */
IOBoard.prototype.reset = function() {
  
};

module.exports = IOBoard;