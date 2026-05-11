import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Corrida from './pages/Corrida'
import Ciclismo from './pages/Ciclismo'
import Natacao from './pages/Natacao'
import PoseEstimation from './pages/PoseEstimation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corrida" element={<Corrida />} />
        <Route path="/ciclismo" element={<Ciclismo />} />
        <Route path="/natacao" element={<Natacao />} />
        <Route path="/pose-estimation" element={<PoseEstimation />} />
      </Routes>
    </BrowserRouter>
  )
}
