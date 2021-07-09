import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashBoard from "./Pages/Dashboard/DashBoard";
import Private from "./Component/PrivateRoutes/Private";

function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Route path={['/', '/home']} exact>
                <Home />
            </Route>
            <Route path={['/login', '/register']} >
                <Login />
            </Route>
            <Private path={['/dashboard', '/profile']} component={DashBoard} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
