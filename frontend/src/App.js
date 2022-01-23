import LoginPage from './pages/LoginPage';
import { Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
