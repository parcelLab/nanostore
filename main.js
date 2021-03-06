const Emitter = require('tiny-emitter')

function Store(initial={}) {
  const bus = new Emitter()
  let state = { ...initial }

  this.on = bus.on.bind(bus)
  this.emit = bus.emit.bind(bus)

  this.set = function (stateMod) {
    state = { ...state, ...stateMod }
    this.emit('state:changed')
  }

  this.get = function () {
    return state
  }
  
  this.subscribe = function (fn) {
    this.on('state:changed', () => {
      fn(this.get())
    })
  }  
}

module.exports = Store
