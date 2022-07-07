import './Navbar.scss';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer'

function Navbar() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
    return (
      <nav className="navbar">
        <ul className='navbar_ul'>
          {!isAuth &&
            <>
              <li className='navbar_li'>
                  <Link to="/registration" className='navbar_link'>Signup</Link>
              </li>
              <li className='navbar_li'>
                  <Link to="/login" className='navbar_link'>Login</Link>
              </li>
            </>
          }
          {isAuth &&
            <li className='navbar_li'>
              <div className='navbar_link' onClick={()=>{dispatch(logout())}}>Logout</div>
            </li>
          }
        </ul>
      </nav>
    );
  }
  
  export default Navbar;