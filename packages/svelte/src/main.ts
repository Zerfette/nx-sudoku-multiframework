import { mount } from 'svelte'
import App from './app/App.svelte'
import './index.css'

const app = mount(App, {
  target: document.getElementById('app') as Element,
})

export default app
