process.on('uncaughtException',
  e => require('opn')(`http://stackoverflow.com/search?q=[node.js ]+${e.message}`)
)

throw new Error('Boom!')