import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AddQuestion from './components/AddQuestion';
import GameRoom from './components/GameRoom';


function App(){
  return(
      <Router>
        <Routes>
          <Route path='/' element={<GameRoom/>} />
          <Route path='/questions' element={<AddQuestion />} />
        </Routes>
      </Router>
  )
}



export default App;
