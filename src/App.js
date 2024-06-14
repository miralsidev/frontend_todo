
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from '../src/Components/Todo'
import Reg from './Components/Reg';
import Login from './Components/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path='todo' element={<Todo />}></Route>
        <Route path='reg' element={<Reg />}></Route>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
