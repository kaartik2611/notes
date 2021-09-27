import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from './components/Header';
import { Notes } from './components/Notes';
import { Todo } from './components/Todo';
import { Login } from './components/Login'
import { Register } from './components/Register'
function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/todo" exact>
            <Todo />
          </Route>
          <Route path="/notes" exact>
            <Notes />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App;
