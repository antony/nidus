import App from './components/app/component.html'
import { Store } from 'svelte/store'
import 'photonkit/dist/css/photon.css'

const store = new Store({})

export default new App({
  target: document.body,
  store
})
