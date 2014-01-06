/**
 * The various modes pins support
 */
module.exports.MODES = {
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
	UNKOWN: 0x10
};

/**
 * The various modes integrated circuits support
 */
module.exports.I2C_MODES = {
	WRITE: 0x00,
	READ: 1,
	CONTINUOUS_READ: 2,
	STOP_READING: 3
};

/**
 * Constants for stepper motors
 */
module.exports.STEPPER = {
	TYPE: {
		DRIVER: 1,
		TWO_WIRE: 2,
		FOUR_WIRE: 4
	},
	RUNSTATE: {
		STOP: 0,
		ACCEL: 1,
		DECEL: 2,
		RUN: 3
	},
	DIRECTION: {
		CCW: 0,
		CW: 1
	}
};

/**
 * Digital pin on value
 */
module.exports.HIGH = 1;

/**
 * Digital pin off value
 */
module.exports.LOW = 0;
