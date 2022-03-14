import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import TransactionPage from './pages/TransactionPage';

import { Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <TransactionPage />
        </Route>
        <Route path='/main' exact>
          <MainPage />
        </Route>
        <Route path='/errorPage' exact>
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
