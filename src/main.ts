import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

const app = createApp(App)

app.use(router)

enableMocking().then(() => app.mount('#app'))
