import React from 'react';
import { Link } from 'react-router-dom';

function Header({ location, history }) {
  return (
    <header className='header'>
      <strong>Header</strong>
      <ul>
        <li>
          <button onClick={() => history.push('/main')}>홈</button>
        </li>
        <li>
          <Link to='/main/profile'>프로필</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
