var CONSTANTS = require("./constants"),
  EventEmitter = require("events").EventEmitter,
  util = require("util"),
  check = require("check-types");

var log = console.info;

/**
 * Defines an interface to interact with attached IO boards - arduinos, servo controllers, etc
 * @param {String} port The name of the device we are connecting to
 * @param {function} callback A function to be invoked when the board is ready to interact with.
 */
function BoardIO(opts) {
  EventEmitter.call(this);

  opts = opts || {};

  // don't make any noise
  if (opts.quiet) {
    log = function() {};
  }

  // expose isReady property
  var isReady = false;
  // these are the indexes of analog pins in the this.pins array
  var analogPins = [];

  // child classes will fill this array
  this._pins = [];

  this.once("ready", function() {
    isReady = true;

    // make sure we have some pins
    check.verify.array(this._pins, "this._pins should be an array!");
    check.verify.not.length(this._pins, 0, "Please populate this._pins with pins!");

    this._pins.forEach(function(pin, index) {
      // make sure that the right properties have been set
      check.verify.object(pin, "this._pins[" + index + "] should be an object!");
      check.verify.array(pin.supportedModes, "this._pins[" + index + "].supportedModes should be an array!");
      check.verify.number(pin.mode, "this._pins[" + index + "].mode should be a number!");
      check.verify.number(pin.report, "this._pins[" + index + "].report should be a number!");
      check.verify.number(pin.analogChannel, "this._pins[" + index + "].analogChannel should be a number!");

      // populate analog pins
      if (pin.supportedModes.indexOf(this.MODES.ANALOG) != -1) {
        analogPins.push(index);
      }
    }, this);

    if (this._quiet) {
      log = function() {};
    }
  });

  Object.defineProperties(this, {
    pins: {
      enumerable: true,
      configurable: true,
      writable: true,
      get: function() {
        return this._pins;
      }
    },
    analogPins: {
      enumerable: true,
      configurable: true,
      writable: true,
      get: function() {
        return analogPins;
      }
    },
    isReady: {
      enumerable: true,
      configurable: true,
      writable: true,
      get: function() {
        return isReady;
      }
    },
    HIGH: {
      enumerable: true,
      value: CONSTANTS.HIGH
    },
    LOW: {
      enumerable: true,
      value: CONSTANTS.LOW
    },
    MODES: {
      enumerable: true,
      value: CONSTANTS.MODES
    },
    I2C_MODES: {
      enumerable: true,
      value: CONSTANTS.I2C_MODES
    },
    STEPPER: {
      enumerable: true,
      value: CONSTANTS.STEPPER
    },
  });
}

//} extends EventEmmiter
util.inherits(BoardIO, EventEmitter);

/**
 * Asks the board to read analog data.
 * @param {number} pin The pin to read analog data
 * @param {function} callback A function to call when we have the analag data.
 */
BoardIO.prototype.analogRead = function(pin, callback) {
  log("BoardIO", "analogRead of pin", pin);
};

/**
 * Asks the board to write an analog message.
 * @param {number} pin The pin to write analog data to.
 * @param {nubmer} value The data to write to the pin between 0 and 255.
 */
BoardIO.prototype.analogWrite = function(pin, value) {
  log("BoardIO", "analogWrite", value, "to pin", pin);
};

/**
 * Asks the board to move a servo
 * @param {number} pin The pin the servo is connected to
 * @param {number} value The degrees to move the servo to.
 */
BoardIO.prototype.servoWrite = function(pin, value) {
  log("BoardIO", "servoWrite", value, "to pin", pin);
};

/**
 * Asks the board to set the pin to a certain mode.
 * @param {number} pin The pin you want to change the mode of.
 * @param {number} mode The mode you want to set. Must be one of board.MODES
 */
BoardIO.prototype.pinMode = function(pin, mode) {
  var modeName = "unknown";

  for(var key in this.MODES) {
    if(this.MODES[key] === mode) {
      modeName = key;
    }
  }

  log("BoardIO", "set pinMode of pin", pin, "to mode", modeName);
};

/**
 * Asks the board to write a value to a digital pin
 * @param {number} pin The pin you want to write a value to.
 * @param {value} value The value you want to write. Must be board.HIGH or board.LOW
 */
BoardIO.prototype.digitalWrite = function(pin, value) {
  log("BoardIO", "digitalWrite", value, "to pin", pin);
};

/**
 * Asks the board to read digital data
 * @param {number} pin The pin to read data from
 * @param {function} callback The function to call when data has been received
 */
BoardIO.prototype.digitalRead = function(pin, callback) {
  log("BoardIO", "digitalRead of pin", pin);
};

/**
 * Asks the board to tell us its capabilities
 * @param {function} callback A function to call when we receive the capabilities
 */
BoardIO.prototype.queryCapabilities = function(callback) {
  log("BoardIO", "queryCapabilities");
};

/**
 * Asks the board to tell us its analog pin mapping
 * @param {function} callback A function to call when we receive the pin mappings.
 */
BoardIO.prototype.queryAnalogMapping = function(callback) {
  log("BoardIO", "queryAnalogMapping");
};

/**
 * Asks the board to tell us the current state of a pin
 * @param {number} pin The pin we want to the know the state of
 * @param {function} callback A function to call when we receive the pin state.
 */
BoardIO.prototype.queryPinState = function(pin, callback) {
  log("BoardIO", "queryPinState of pin", pin);
};

/**
 * Sends a I2C config request to the board with an optional
 * value in microseconds to delay an I2C Read.  Must be called before
 * an I2C Read or Write
 * @param {number} delay in microseconds to set for I2C Read
 */
BoardIO.prototype.sendI2CConfig=function() {
  log("BoardIO", "sendI2CConfig deprecated - use i2cConfig instead");
};

/**
 * Sends a I2C config request to the board with an optional
 * value in microseconds to delay an I2C Read.  Must be called before
 * an I2C Read or Write
 * @param {number} delay in microseconds to set for I2C Read
 */
BoardIO.prototype.i2cConfig=function(delay) {
  log("BoardIO", "i2cConfig with delay", delay);
};

/**
 * Asks the board to send an I2C request to a device
 * @param {number} slaveAddress The address of the I2C device
 * @param {Array} bytes The bytes to send to the device
 */
BoardIO.prototype.sendI2CWriteRequest = function() {
  log("BoardIO", "sendI2CWriteRequest deprecated - use i2cWrite instead");
};

/**
 * Asks the board to send an I2C request to a device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} register The register on the I2C device to write to (optional)
 * @param {Array} bytes The bytes to send to the device
 */
BoardIO.prototype.i2cWrite = function() {
  if(arguments.length == 2) {
    log("BoardIO", "i2cWrite to slave address", arguments[0], "with bytes", arguments[1]);
  } else if(arguments.length == 3) {
    log("BoardIO", "i2cWrite to slave address", arguments[0], "register", arguments[1], "with bytes", arguments[2]);
  } else {
    log("BoardIO", "i2cWrite should be called with two or three arguments only");
  }
};

/**
 * Asks the board to send an I2C request to a device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} register The register on the I2C device to write to
 * @param {Array} bytes The bytes to send to the device
 */
BoardIO.prototype.i2cWriteReg = function(slaveAddress, register, bytes) {
  log("BoardIO", "i2cWriteReg to slave address", slaveAddress, "register", register, "with bytes", bytes);
};

/**
 * Asks the board to request bytes from an I2C device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} numBytes The number of bytes to receive.
 * @param {function} callback A function to call when we have received the bytes.
 */
BoardIO.prototype.sendI2CReadRequest = function(slaveAddress, numBytes, callback) {
  log("BoardIO", "sendI2CReadRequest deprecated - use i2cRead or i2cReadOnce instead");
};

/**
 * Asks the board to continuously request bytes from an I2C device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} numBytes The number of bytes to receive.
 * @param {function} callback A function to call when we have received the bytes.
 */
BoardIO.prototype.i2cRead = function() {
  if(arguments.length == 3) {
    log("BoardIO", "i2cRead", arguments[1], "bytes from address", arguments[0], "handler", arguments[2]);
  } else if(arguments.length == 4) {
    log("BoardIO", "i2cRead", arguments[2], "bytes from register", arguments[1], "at address", arguments[0], "handler", arguments[3]);
  } else {
    log("BoardIO", "i2cRead should be called with three or four arguments only");
  }
};

/**
 * Asks the board to request bytes from an I2C device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} register The register on the I2C device to read from (optional)
 * @param {number} numBytes The number of bytes to receive.
 * @param {function} callback A function to call when we have received the bytes.
 */
BoardIO.prototype.i2cReadOnce = function() {
  if(arguments.length == 3) {
    log("BoardIO", "i2cReadOnce", arguments[1], "bytes from address", arguments[0], "handler", arguments[2]);
  } else if(arguments.length == 4) {
    log("BoardIO", "i2cReadOnce", arguments[2], "bytes from register", arguments[1], "at address", arguments[0], "handler", arguments[3]);
  } else {
    log("BoardIO", "i2cReadOnce should be called with three or four arguments only");
  }
};

/**
 * Set sampling interval in millis. Default is 19 ms
 * @param {number} interval The sampling interval in ms > 10
 */
BoardIO.prototype.setSamplingInterval = function(interval) {
  log("BoardIO", "setSamplingInterval to", interval);
};

/**
 * Set reporting on pin
 * @param {number} pin The pin to turn on/off reporting
 * @param {number} value Binary value to turn reporting on/off
 */
BoardIO.prototype.reportAnalogPin = function(pin, value) {
  log("BoardIO", "reportAnalogPin to pin", pin, "with value", value);
};

/**
 * Set reporting on pin
 * @param {number} pin The pin to turn on/off reporting
 * @param {number} value Binary value to turn reporting on/off
 */
BoardIO.prototype.reportDigitalPin = function(pin, value) {
  log("BoardIO", "reportDigitalPi to pin", pin, "with value", value);
};

/**
 *
 *
 */
BoardIO.prototype.pulseIn = function(opts, callback) {
  log("BoardIO", "pulseIn with opts", opts);
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
BoardIO.prototype.stepperConfig = function(deviceNum, type, stepsPerRev, dirOrMotor1Pin, stepOrMotor2Pin, motor3Pin, motor4Pin) {
  log("BoardIO", "stepperConfig", deviceNum, type, stepsPerRev, dirOrMotor1Pin, stepOrMotor2Pin, motor3Pin, motor4Pin);
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
BoardIO.prototype.stepperStep = function(deviceNum, direction, steps, speed, accel, decel, callback) {
  log("BoardIO", "stepperStep", deviceNum, direction, steps, speed, accel, decel);
};

/**
 * Send SYSTEM_RESET to board
 */
BoardIO.prototype.reset = function() {
  log("BoardIO", "reset");
};

/**
 * Configure the passed pin as the controller in a 1-wire bus.
 * Pass as enableParasiticPower true if you want the data pin to power the bus.
 * @param pin
 * @param enableParasiticPower
 */
BoardIO.prototype.sendOneWireConfig = function(pin, enableParasiticPower) {
  log("BoardIO", "sendOneWireConfig", pin, "with parasitic power", enableParasiticPower);
};

/**
 * Searches for 1-wire devices on the bus.  The passed callback should accept
 * and error argument and an array of device identifiers.
 * @param pin
 * @param callback
 */
BoardIO.prototype.sendOneWireSearch = function(pin, callback) {
  log("BoardIO", "sendOneWireSearch on pin", pin);
};

/**
 * Searches for 1-wire devices on the bus in an alarmed state.  The passed callback
 * should accept and error argument and an array of device identifiers.
 * @param pin
 * @param callback
 */
BoardIO.prototype.sendOneWireAlarmsSearch = function(pin, callback) {
  log("BoardIO", "sendOneWireAlarmsSearch on pin", pin);
};

/**
 * Reads data from a device on the bus and invokes the passed callback.
 *
 * N.b. ConfigurableFirmata will issue the 1-wire select command internally.
 * @param pin
 * @param device
 * @param numBytesToRead
 * @param callback
 */
BoardIO.prototype.sendOneWireRead = function(pin, device, numBytesToRead, callback) {
  log("BoardIO", "sendOneWireRead", pin, device, numBytesToRead);
};

/**
 * Resets all devices on the bus.
 * @param pin
 */
BoardIO.prototype.sendOneWireReset = function(pin) {
  log("BoardIO", "sendOneWireReset", pin);
};

/**
 * Writes data to the bus to be received by the passed device.  The device
 * should be obtained from a previous call to sendOneWireSearch.
 *
 * N.b. ConfigurableFirmata will issue the 1-wire select command internally.
 * @param pin
 * @param device
 * @param data
 */
BoardIO.prototype.sendOneWireWrite = function(pin, device, data) {
  log("BoardIO", "sendOneWireWrite", pin, device, data);
};

/**
 * Tells firmata to not do anything for the passed amount of ms.  For when you
 * need to give a device attached to the bus time to do a calculation.
 * @param pin
 */
BoardIO.prototype.sendOneWireDelay = function(pin, delay) {
  log("BoardIO", "sendOneWireDelay", pin, delay);
};

/**
 * Sends the passed data to the passed device on the bus, reads the specified
 * number of bytes and invokes the passed callback.
 *
 * N.b. ConfigurableFirmata will issue the 1-wire select command internally.
 * @param pin
 * @param device
 * @param data
 * @param numBytesToRead
 * @param callback
 */
BoardIO.prototype.sendOneWireWriteAndRead = function(pin, device, data, numBytesToRead, callback) {
  log("BoardIO", "sendOneWireWriteAndRead", pin, device, data, numBytesToRead);
};

module.exports = BoardIO;
