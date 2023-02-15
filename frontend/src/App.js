import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import EditTeacher from "./pages/EditTeacher";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/users/add" element={<AddUser />}/>
          <Route path="/users/edit/:id" element={<EditUser />}/>
          <Route path="/students" element={<Students />}/>
          <Route path="/students/add" element={<AddStudent />}/>
          <Route path="/students/edit/:id" element={<EditStudent />}/>
          <Route path="/teachers" element={<Teachers />}/>
          <Route path="/teachers/add" element={<AddTeacher />}/>
          <Route path="/teachers/edit/:id" element={<EditTeacher />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
