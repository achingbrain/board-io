
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

  // connect to hardware and emit "connected" event
  this.emit("connected");

  // .. configure pins
  this._pins.push(..);

  // all done, emit ready event
  this.emit("ready");

  // finally call the passed callback
  callback();
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
