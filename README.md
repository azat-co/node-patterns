footer: © NodeProgram.com, 2016
slidenumbers: true

# Node Patterns

From Callbacks to Observer

---

# Slides :page_facing_up:

<https://github.com/azat-co/node-patterns>

---

# About Presenter

Azat Mardan

![inline](images/azat.jpeg)

Twitter: @azat_co
Email: hi@azat.co
Blog: webapplog.com

---

# About Presenter

* Technology Fellow at Capital One
* Experience: FDIC, NIH, DocuSign, HackReactor and Storify
* Books: Practical Node.js, Pro Express.js and Express.js API

---

![left 100%](images/proexpress.png)
![right 100%](images/practicalnode.png)

---

![left 100%](images/reactquickly.jpg)

![right 100%](images/fullstackjavascript.jpg)

---

![left 100%](images/reactquickly.jpg)

FREE: 7+ hours of videos

<http://reactquickly.co>

and
<http://bit.ly/1Umn0pC>

![right 100%](images/fullstackjavascript.jpg)

---

# Node Basics

* JavaScript
* Asynchronous + Event Driven
* Non-Blocking I/O

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
* Use obververs

---

# Named Functions

```js
callOne({...}, processResponse1)

function processResponse1(error, data1) {
  callTwo(data1, processResponse2)
}

function processResponse2(error, data2) {
  callThere(data2, processResponse3)
}

function processResponse3(error, data1) {
  ...
}
```

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

# Import

```js
// code A
module.exports = function(options){
  // code B
}
```

When you `require`, code A is run and code B is not.
Code A is run only once, no matter how many times you `require`.
You need to invoke the object to run code B.

---

# Singletons

* `require`: modules are cached

---

```js
// module.js
var a = 1 // Private
module.exports = {
  b: 2 // Public
}
```


---

```js
// program.js
var m = require('./module')
console.log(m.a) // undefined
console.log(m.b) // 2
m.b ++
require('./main')
```

---


```js
// main.js
var m = require('./module')
console.log(m.b) // 3
```

---

# Demo

```
node main.js
node program.js
```

---


# Problem 6

Modules are cached on based on their resolved filename.

Filename will break the caching

```js
var m = require('./MODULE')
var m = require('./module')
```

Or different paths


---

# Solution

`global`

---


`global.name`

or

`GLOBAL.name`



---

```js
_log = global.console.log
global.console.log = function(){
  var args = arguments
  args[0] = '\033[31m' +args[0] + '\x1b[0m'
  return _log.apply(null, args)
}
```

---

global is powerful... anti-pattern

similar `window.jQuery = jQuery`

use it sparringly


^with a lot of power comes a lot of responsibility

---

# Problem 7

Callbacks are still hard to manage even in modules!

---

# Example

1. Module Job is performing a task.
1. In the main file, we import Job.

How do we specify a callback (some future logic) on the Job's task completion?

---

Maybe:

```js
var job = require('./job.js')(callback)
```

---


Maybe:

```js
var job = require('./job.js')(callback)
```


What about multiple callbacks?

Not very scalable 😢

---

# Solution

Observer pattern with event emitters!

---

```js
// module.js
var util = require('util')
var Job = function Job() {
    // ...
    this.process = function() {
        // ...
        job.emit('done', { completedOn: new Date() })
    }
}

util.inherits(Job, require('events').EventEmitter)
module.exports = Job
```

^ module

---

```js
// main.js
var Job = require('./module.js')
var job = new Job()

job.on('done', function(details){
  console.log('Job was completed at', details.completedOn)
  job.removeAllListeners()
})

job.process()
```

^main

---

```js
emitter.listeners(eventName)

emitter.on(eventName, listener)

emitter.once(eventName, listener)

emitter.removeListener(eventName, listener)
```

---

## Event Emitters, modules and callbacks are at the core of Node.

---

# Taking it Further

* `async` and `neo-async`
* Promises - not really helping much
* Generators - promising
* Async await - nice wrapper for promises

---

# Learning Node

NodeProgram.com

**What**: Node+Express+MongoDB+React
**Where:** March 12-13, NYC

---


Q&A ❓🙋 :+1:

Send bugs 🐛 to

<https://github.com/azat-co/node-patterns/issues>

Twitter: @azat_co
