import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import 'react-circular-progressbar/dist/styles.css';
import Loading from "./components/Loading.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
        <App />
    </Suspense>
  </React.StrictMode>,
)
