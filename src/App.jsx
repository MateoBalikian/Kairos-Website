import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Futebol from './pages/Futebol'
import Ciclismo from './pages/Ciclismo'
import Natacao from './pages/Natacao'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/futebol" element={<Futebol />} />
        <Route path="/ciclismo" element={<Ciclismo />} />
        <Route path="/natacao" element={<Natacao />} />
      </Routes>
    </BrowserRouter>
  )
}
