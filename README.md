# Node Patterns

 From Callbacks to Observer

---

# Node Basics

* JavaScript
* Asynchronous + Event driven
* Non-blocking I/O

---

# Why Care?

---

* Async code is hard
* Code complexity grows exponentially
* Good code organization is important

---

# JavaScript? :unamused:


---


# Problem 1

How to schedule something in the future?

---

# Callbacks All the Way!

Functions are First-Class Citizens

---

```js
var t = function(){...}
setTimeout(t, 1000)
```

t is a callback

---

```js
var fs = require('fs')
var callback = function(error, data){...}
fs.readFile('data.csv', 'utf-8', callback)
```

---

# Conventions

* `error` 1st argument, null if everything is okay
* `data` is the second argument
* `callback` is the last argument


---

Naming doesn't matter but order matters.

Node.js won't enforce the arguments.

Convention is not a guarantee. It's just a style. — Read documentation or source code.

---

# Problem 2

How to ensure the right sequence? Control flow 😕

---

HTTP request to get an auth token, then to fetch data, then to PUT an update.

They must be executed in a certain order.

---

```js
... // callback is defined, callOne, callTwo, and callThree are defined
callOne({...}, function(error, data1) {
    if (error) return callback(error, null)
    // work to parse data1 to get auth token
    // fetch the data from the API
    callTwo(data1, function(error, data2) {
        if (error) return callback(error, null)
        // data2 is the response, transform it and make PUT call
        callThree(data2, function(error, data3) {
            //
            if (error) return callback(error, null)
            // parse the response
            callback(null, data3)
        })
    })
})
```

---

# Callback Hell

* Hard to read
* Hard to modify/maintain/enhance
* Easy for devs to make bugs
* Closing parens - 👿

---

# Solutions

* Abstract into named functions (hoisted or variables)
* `async` and `neo-async`
* Promises - not really helping much
* Generators - promising
* Async await - nice wrapper for promises

---

# Async Code

Concurrent is not parallel.

---

# Problem 3: No Classes

(At least in ES5)

Objects inherit from other objects

Functions are objects too.


---

# Solution

`require('util').inherits(child, parent)`


---

# Problem 4

How to modularize code properly?

---

* `module.exports = {...}`
* `module.exports.obj = {...}`
* `exports.obj = {...}`

Note: `exports = {...}` is anti-pattern.

---

# Problem 5

How to modularize dynamic code or where to initialize?

---

# Solution

* `module.exports = function(options) {...}`
* `module.exports.func = function(options) {...}`
* `exports.func = function(options) {...}`


---

# Singletons

* `require`
* `global`

---

# Problem 6

Module Job is performing a task

In the main file, we import Job.

How do we specify a callback (some future logic) on the Job's task completion?

---

Callbacks? 😢

That's callback hell.

---

# Solution

Observer pattern with event emitters!

---

```js
var util = require('util');
var Job = function Job() {
    // ...
    this.process = function() {
        // ...
        job.emit('done', { completedOn: new Date() });
    }
};

util.inherits(Job, require('events').EventEmitter);
module.exports = Job;
```

^ module

---

```js
var job = new Job();

job.on('done', function(details){
  console.log('Job was completed at', details.completedOn);
  job.removeAllListeners();
});

job.process();
```

^main

---

```js
emitter.listeners(eventName);

emitter.on(eventName, listener);

emitter.once(eventName, listener);

emitter.removeListener(eventName, listener);
```
