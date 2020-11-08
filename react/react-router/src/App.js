import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './pages/SignPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Route path='/main' component={Header} />
        <Switch>
          <Route path='/main/profile' component={ProfilePage} />
          <Route path='/main' component={MainPage} />
          <Route path='/sign' component={SignPage} />
          <Route render={() => <div className='error'>에러 페이지</div>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
