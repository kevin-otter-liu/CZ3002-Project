import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import BudgetPage from './pages/BudgetPage';

import { Switch, Route } from 'react-router-dom';
function App() {
    return (
      <div>
        <Switch>
          <Route path='/' exact>
            <BudgetPage />
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
