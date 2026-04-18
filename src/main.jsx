import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//AppInıtializer görünmeyen yardımcı component => localStorage'dan veriyi yükler, notes değişince kaydeder
//RouterProvider ise sayfalar ekrana basan ana yapı => /, /new, /detail sayfalarını çalıştırır
