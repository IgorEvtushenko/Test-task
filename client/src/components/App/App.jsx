import Navbar from '../Navbar/Navbar'
import Registration from '../Registration/Registration'
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import UserPage from '../UserPage/UserPage'
import CreateCompany from '../UserPage/CreateCompany/CreateCompany'
import EditCompany from '../UserPage/EditCompany/EditCompany';
import EditUser from '../UserPage/EditUser/EditUser';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../../action/user';

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(auth())
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        {!isAuth ?
        <Routes>
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={''} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        : 
        <Routes>
          <Route exact path="/edit_user" element={<EditUser />} />
          <Route exact path="/edit_company" element={<EditCompany />} />
          <Route exact path="/create" element={<CreateCompany />} />
          <Route exact path="/login" element={<Navigate to="/" />} />
          <Route exact path="/" element={<UserPage />} />
        </Routes>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;