
import App from './app/App.svelte'
import './index.css'

const app = new App({
  target: document.getElementById('app') as Element,
})

export default app
