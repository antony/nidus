import App from './components/app/component.html'
import { Store } from 'svelte/store'

const store = new Store({})

export default new App({
  target: document.body,
  store
})
