import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SideBar from './Components/UI/SideBar';
import Content from './Components/Overview/Content';
import Transactions from './Components/Transactions/Transactions';
import TaskStatus from './Components/TaskStatus/TaskStatus';
import LogActivity from './Components/LogActivity/LogActivity';
import Reported from './Components/Reported/Reported';

function App() {
  return (
    <div className="App">
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route path='/overview' element={<Content title="OverView" />} />
          <Route path='/transactions' element={<Transactions  title="Transactions"/>} />
          <Route path='/taskstatus' element={<TaskStatus  title="Task Status"/>} />
          <Route path='/logactivity' element={<LogActivity  title="Log Activity"/>} />
          <Route path='/reported' element={<Reported  title="Reported"/>} />
        </Routes>

    </div>
  );
}

export default App;
