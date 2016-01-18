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
})

/**
 * The various modes integrated circuits support
 */
module.exports.I2C_MODES = Object.freeze({
  WRITE: 0x00,
  READ: 0x01,
  CONTINUOUS_READ: 0x02,
  STOP_READING: 0x03
})

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
})

module.exports.SERIAL_MODES = {
  READ_CONTINUOUS: 0x00,
  STOP_READING: 0x01
}

// ids for hardware and software serial ports on the board
module.exports.SERIAL_PORT_IDs = {
  HW_SERIAL0: 0x00,
  HW_SERIAL1: 0x01,
  HW_SERIAL2: 0x02,
  HW_SERIAL3: 0x03,
  SW_SERIAL0: 0x08,
  SW_SERIAL1: 0x09,
  SW_SERIAL2: 0x10,
  SW_SERIAL3: 0x11
}

// map to the pin resolution value in the capability query response
module.exports.SERIAL_PIN_TYPES = {
  RES_RX0: 0x00,
  RES_TX0: 0x01,
  RES_RX1: 0x02,
  RES_TX1: 0x03,
  RES_RX2: 0x04,
  RES_TX2: 0x05,
  RES_RX3: 0x06,
  RES_TX3: 0x07
}

/**
 * Digital pin on value
 */
module.exports.HIGH = 0x01

/**
 * Digital pin off value
 */
module.exports.LOW = 0x00
