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
function IOBoard(opts) {
  EventEmitter.call(this);

  opts = opts || {};

  // don't make any noise
  if(opts.quiet) {
    log = function() {};
  }

  // expose isReady property
  var isReady = false;

  Object.defineProperty(this, "isReady", {
    enumerable: true,
    get: function() {
      return isReady;
    }
  });

  // child classes will fill this array
  this._pins = [];

  this.once("ready", function() {
    isReady = true;

    // make sure we have some pins
    check.verify.array(this._pins, "this._pins should be an array!");
    check.verify.not.length(this._pins, 0, "Please populate this._pins with pins!");

    // these are the indexes of analog pins in the this.pins array
    var analogPins = [];

    this._pins.forEach(function(pin, index) {
      // make sure that the right properties have been set
      check.verify.object(pin, "this._pins[" + index + "] should be an object!");
      check.verify.array(pin.supportedModes, "this._pins[" + index + "].supportedModes should be an array!");
      check.verify.number(pin.mode, "this._pins[" + index + "].mode should be a number!");
      check.verify.number(pin.report, "this._pins[" + index + "].report should be a number!");
      check.verify.number(pin.analogChannel, "this._pins[" + index + "].analogChannel should be a number!");

      // populate analog pins
      if(pin.supportedModes.indexOf(this.MODES.ANALOG) != -1) {
        analogPins.push(index);
      }
    }, this);

    Object.defineProperty(this, "pins", {
      enumerable: true,
      get: function() {
        return this._pins;
      }.bind(this)
    });
    Object.defineProperty(this, "analogPins", {
      enumerable: true,
      get: function() {
        return analogPins;
      }.bind(this)
    });

    if(this._quiet) {
      log = function() {};
    }
  });

  // expose constants as read-only properties
  Object.defineProperty(this, "HIGH", {
    enumerable: true,
    value: CONSTANTS.HIGH
  });
  Object.defineProperty(this, "LOW", {
    enumerable: true,
    value: CONSTANTS.LOW
  });
  Object.defineProperty(this, "MODES", {
    enumerable: true,
    value: CONSTANTS.MODES
  });
  Object.defineProperty(this, "I2C_MODES", {
    enumerable: true,
    value: CONSTANTS.I2C_MODES
  });
  Object.defineProperty(this, "STEPPER", {
    enumerable: true,
    value: CONSTANTS.STEPPER
  });
}

//} extends EventEmmiter
util.inherits(IOBoard, EventEmitter);

/**
 * Asks the board to read analog data.
 * @param {number} pin The pin to read analog data
 * @param {function} callback A function to call when we have the analag data.
 */
IOBoard.prototype.analogRead = function(pin, callback) {
  log("IOBoard", "analogRead of pin", pin);
};

/**
 * Asks the board to write an analog message.
 * @param {number} pin The pin to write analog data to.
 * @param {nubmer} value The data to write to the pin between 0 and 255.
 */
IOBoard.prototype.analogWrite = function(pin, value) {
  log("IOBoard", "analogWrite", value, "to pin", pin);
};

/**
 * Asks the board to move a servo
 * @param {number} pin The pin the servo is connected to
 * @param {number} value The degrees to move the servo to.
 */
IOBoard.prototype.servoWrite = function(pin, value) {
  log("IOBoard", "servoWrite", value, "to pin", pin);
};

/**
 * Asks the board to set the pin to a certain mode.
 * @param {number} pin The pin you want to change the mode of.
 * @param {number} mode The mode you want to set. Must be one of board.MODES
 */
IOBoard.prototype.pinMode = function(pin, mode) {
  var modeName = "unknown";

  for(var key in this.MODES) {
    if(this.MODES[key] === mode) {
      modeName = key;
    }
  }

  log("IOBoard", "set pinMode of pin", pin, "to mode", modeName);
};

/**
 * Asks the board to write a value to a digital pin
 * @param {number} pin The pin you want to write a value to.
 * @param {value} value The value you want to write. Must be board.HIGH or board.LOW
 */
IOBoard.prototype.digitalWrite = function(pin, value) {
  log("IOBoard", "digitalWrite", value, "to pin", pin);
};

/**
 * Asks the board to read digital data
 * @param {number} pin The pin to read data from
 * @param {function} callback The function to call when data has been received
 */
IOBoard.prototype.digitalRead = function(pin, callback) {
  log("IOBoard", "digitalRead of pin", pin);
};

/**
 * Asks the board to tell us its capabilities
 * @param {function} callback A function to call when we receive the capabilities
 */
IOBoard.prototype.queryCapabilities = function(callback) {
  log("IOBoard", "queryCapabilities");
};

/**
 * Asks the board to tell us its analog pin mapping
 * @param {function} callback A function to call when we receive the pin mappings.
 */
IOBoard.prototype.queryAnalogMapping = function(callback) {
  log("IOBoard", "queryAnalogMapping");
};

/**
 * Asks the board to tell us the current state of a pin
 * @param {number} pin The pin we want to the know the state of
 * @param {function} callback A function to call when we receive the pin state.
 */
IOBoard.prototype.queryPinState = function(pin, callback) {
  log("IOBoard", "queryPinState of pin", pin);
};

/**
 * Sends a I2C config request to the board with an optional
 * value in microseconds to delay an I2C Read.  Must be called before
 * an I2C Read or Write
 * @param {number} delay in microseconds to set for I2C Read
 */
IOBoard.prototype.sendI2CConfig=function(delay) {
  log("IOBoard", "sendI2CConfig with delay", delay);
};

/**
 * Asks the board to send an I2C request to a device
 * @param {number} slaveAddress The address of the I2C device
 * @param {Array} bytes The bytes to send to the device
 */
IOBoard.prototype.sendI2CWriteRequest = function(slaveAddress, bytes) {
  log("IOBoard", "sendI2CWriteRequest to slave address", slaveAddress, "with bytes", bytes);
};

/**
 * Asks the board to request bytes from an I2C device
 * @param {number} slaveAddress The address of the I2C device
 * @param {number} numBytes The number of bytes to receive.
 * @param {function} callback A function to call when we have received the bytes.
 */
IOBoard.prototype.sendI2CReadRequest = function(slaveAddress, numBytes, callback) {
  log("IOBoard", "sendI2CReadRequest of", numBytes, "bytes from slave address", slaveAddress);
};

/**
 * Set sampling interval in millis. Default is 19 ms
 * @param {number} interval The sampling interval in ms > 10
 */
IOBoard.prototype.setSamplingInterval = function(interval) {
  log("IOBoard", "setSamplingInterval to", interval);
};

/**
 * Set reporting on pin
 * @param {number} pin The pin to turn on/off reporting
 * @param {number} value Binary value to turn reporting on/off
 */
IOBoard.prototype.reportAnalogPin = function(pin, value) {
  log("IOBoard", "reportAnalogPin to pin", pin, "with value", value);
};

/**
 * Set reporting on pin
 * @param {number} pin The pin to turn on/off reporting
 * @param {number} value Binary value to turn reporting on/off
 */
IOBoard.prototype.reportDigitalPin = function(pin, value) {
  log("IOBoard", "reportDigitalPi to pin", pin, "with value", value);
};

/**
 *
 *
 */
IOBoard.prototype.pulseIn = function(opts, callback) {
  log("IOBoard", "pulseIn with opts", opts);
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
IOBoard.prototype.stepperConfig = function(deviceNum, type, stepsPerRev, dirOrMotor1Pin, stepOrMotor2Pin, motor3Pin, motor4Pin) {
  log("IOBoard", "stepperConfig", deviceNum, type, stepsPerRev, dirOrMotor1Pin, stepOrMotor2Pin, motor3Pin, motor4Pin);
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
IOBoard.prototype.stepperStep = function(deviceNum, direction, steps, speed, accel, decel, callback) {
  log("IOBoard", "stepperStep", deviceNum, direction, steps, speed, accel, decel);
};

/**
 * Send SYSTEM_RESET to board
 */
IOBoard.prototype.reset = function() {
  log("IOBoard", "reset");
};

/**
 * Configure the passed pin as the controller in a 1-wire bus.
 * Pass as enableParasiticPower true if you want the data pin to power the bus.
 * @param pin
 * @param enableParasiticPower
 */
IOBoard.prototype.sendOneWireConfig = function(pin, enableParasiticPower) {
  log("IOBoard", "sendOneWireConfig", pin, "with parasitic power", enableParasiticPower);
};

/**
 * Searches for 1-wire devices on the bus.  The passed callback should accept
 * and error argument and an array of device identifiers.
 * @param pin
 * @param callback
 */
IOBoard.prototype.sendOneWireSearch = function(pin, callback) {
  log("IOBoard", "sendOneWireSearch on pin", pin);
};

/**
 * Searches for 1-wire devices on the bus in an alarmed state.  The passed callback
 * should accept and error argument and an array of device identifiers.
 * @param pin
 * @param callback
 */
IOBoard.prototype.sendOneWireAlarmsSearch = function(pin, callback) {
  log("IOBoard", "sendOneWireAlarmsSearch on pin", pin);
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
IOBoard.prototype.sendOneWireRead = function(pin, device, numBytesToRead, callback) {
  log("IOBoard", "sendOneWireRead", pin, device, numBytesToRead);
};

/**
 * Resets all devices on the bus.
 * @param pin
 */
IOBoard.prototype.sendOneWireReset = function(pin) {
  log("IOBoard", "sendOneWireReset", pin);
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
IOBoard.prototype.sendOneWireWrite = function(pin, device, data) {
  log("IOBoard", "sendOneWireWrite", pin, device, data);
};

/**
 * Tells firmata to not do anything for the passed amount of ms.  For when you
 * need to give a device attached to the bus time to do a calculation.
 * @param pin
 */
IOBoard.prototype.sendOneWireDelay = function(pin, delay) {
  log("IOBoard", "sendOneWireDelay", pin, delay);
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
IOBoard.prototype.sendOneWireWriteAndRead = function(pin, device, data, numBytesToRead, callback) {
  log("IOBoard", "sendOneWireWriteAndRead", pin, device, data, numBytesToRead);
};

module.exports = IOBoard;
