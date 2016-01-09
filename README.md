
# board-io

An extendable implementation of Johnny Five's [IO Plugins](https://github.com/rwaldron/johnny-five/wiki/IO-Plugins).

Implements all required and optional methods, along with the required constants - `MODE`, `HIGH`, `LOW`, etc.

You should configure the relevant pins of your board in your constructor, then emit the ready event.

E.g.:

```javascript
var util = require('util'),
  BoardIO = require('board-io');

MyIO = function(path, callback) {
  // call super constructor
  BoardIO.call(this);

  // .. configure pins
  this._pins.push(..);
  
  // wait for an async method or use proccess.nextTick to 
  // signal events
  process.nextTick(function() {
    // connect to hardware and emit "connect" event
    this.emit("connect");
  
    // all done, emit ready event
    this.emit("ready");
  
    // finally call the passed callback
    callback();
  }.bind(this));
}
util.inherits(IO, BoardIO);
```

Finally implement any of the IO Plugin methods of your choosing:

```javascript
// implement digitalWrite
MyIO.prototype.digitalWrite = function(pin, value) {
  ..
};
```

## Logging

By default BoardIO will print a message when every non-implemented method is invoked.  To prevent this, set the `quiet` property of the super constructor args to true:

```javascript
MyIO = function(path, callback) {
  // call super constructor
  BoardIO.call(this, {
    ..
    quiet: true
  });

  ..
}
util.inherits(IO, BoardIO);
```

## Changelog

### 3.1.0

1. Adds new i2cXXX methods
2. Prints deprecation warning when calling old sendI2CXXX methods

### 3.0.0 - Initial release

1. All Firmata methods stubbed out
