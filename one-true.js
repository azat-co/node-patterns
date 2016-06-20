process.on('uncaughtException',
  e => require('opn')(`http://stackoverflow.com/search?q=[js ]+${e.message}`)
)

throw new Error('Boom!')