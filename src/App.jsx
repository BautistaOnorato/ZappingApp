import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Genre from './pages/Genre';
import Layout from './components/Layout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route key={1} path='/' element={<Home />}/>
          <Route key={2} path='/genre/:id' element={<Genre />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
