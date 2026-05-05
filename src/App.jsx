import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Corrida from './pages/Corrida'
import Ciclismo from './pages/Ciclismo'
import Natacao from './pages/Natacao'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corrida" element={<Corrida />} />
        <Route path="/ciclismo" element={<Ciclismo />} />
        <Route path="/natacao" element={<Natacao />} />
      </Routes>
    </BrowserRouter>
  )
}
