import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // Setting our component before init
  prepare() {}

  // Return template of component
  toHtml() {
    return ''
  }

  // Notifying listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscribing on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Сюда приходят только те изменения по тем полям, на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Initialize componen
  // Add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Delete component
  // Clear listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
