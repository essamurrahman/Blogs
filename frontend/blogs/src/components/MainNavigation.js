import { NavLink } from 'react-router-dom';
import './navbar.css'
import classes from './MainNavigation.module.css';

function MainNavigation() {
      return (
        <header>
          <nav>
              <div className="navbar">
                  <div className="left">
                  </div>
                  <div className="nav">
                      <ul className="items">
                          <li>  <NavLink to="/blogs"
                                    className={({ isActive }) =>
                                      isActive ? classes.active : undefined
                                    }  end
                                          >
                                  Home
                                </NavLink>
                          </li>
                          <li>
                          <NavLink to="/login"
                                    className={({ isActive }) =>
                                      isActive ? classes.active : undefined
                                    }  end>
                                  Login
                                </NavLink></li>
                                <li>
                          <NavLink to="/signup"
                                    className={({ isActive }) =>
                                      isActive ? classes.active : undefined
                                    }  end>
                                  Sign Up
                                </NavLink></li>
                      </ul>
                  </div>
              </div> 
          </nav>
    </header>
      )
  }
  
 

export default MainNavigation;
