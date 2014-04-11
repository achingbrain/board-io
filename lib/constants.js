/**
 * The various modes pins support
 */
module.exports.MODES = Object.freeze({
  INPUT: 0x00,
  OUTPUT: 0x01,
  ANALOG: 0x02,
  PWM: 0x03,
  SERVO: 0x04,
  SHIFT: 0x05,
  I2C: 0x06,
  ONEWIRE: 0x07,
  STEPPER: 0x08,
  IGNORE: 0x7F,
  UNKNOWN: 0x10
});

/**
 * The various modes integrated circuits support
 */
module.exports.I2C_MODES = Object.freeze({
  WRITE: 0x00,
  READ: 0x01,
  CONTINUOUS_READ: 0x02,
  STOP_READING: 0x03
});

/**
 * Constants for stepper motors
 */
module.exports.STEPPER = Object.freeze({
  TYPE: {
    DRIVER: 0x01,
    TWO_WIRE: 0x02,
    FOUR_WIRE: 0x04
  },
  RUNSTATE: {
    STOP: 0x00,
    ACCEL: 0x01,
    DECEL: 0x02,
    RUN: 0x03
  },
  DIRECTION: {
    CCW: 0x00,
    CW: 0x01
  }
});

/**
 * Digital pin on value
 */
module.exports.HIGH = 0x01;

/**
 * Digital pin off value
 */
module.exports.LOW = 0x00;
