import { Link, NavLink } from 'react-router-dom';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Link to='/' className={classes.logo}>
        ProjectName
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/'>Settings</NavLink>
          </li>
          <li>
            <NavLink to='/'>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
