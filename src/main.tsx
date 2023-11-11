import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { HashRouter } from 'react-router-dom'
import { boards } from "../data.json"

// LocalStorage DB
const boardsData = localStorage.getItem('boards')
if (!boardsData) {
  localStorage.setItem('boards', JSON.stringify(boards))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter basename='/'>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
  ,
)
