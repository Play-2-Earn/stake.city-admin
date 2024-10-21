import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './Components/SideBar';
import Content from './Pages/Content';
import Transactions from './Pages/Transactions';
import TaskStatus from './Pages/TaskStatus';

function App() {
  return (
    <div className="App">
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route path='/overview' element={<Content title="OverView" />} />
          <Route path='/transactions' element={<Transactions  title="Transactions"/>} />
          <Route path='/taskstatus' element={<TaskStatus  title="Task Status"/>} />
        </Routes>

    </div>
  );
}

export default App;
