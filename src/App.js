import React,{Component} from 'react';
// import logo from './logo.svg';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('.//Pages/Login'));
const Page404 = React.lazy(() => import('./Pages/Page404'));
const Page500 = React.lazy(() => import('./Pages/Page500'));
const Container = React.lazy(() =>import('../src/containers'))
class App extends Component {

render(){
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props =><Login {...props} />} />
            <Route exact path="/404" name="Login Page" render={props =><Page404 {...props} />} />
            <Route exact path="/500" name="Login Page" render={props =><Page500 {...props} />} />
            
            <Route path="/" name="Home" render={props =><Container {...props} />} />
            {/* <Route exact path="/dashboard" name="Dashboard" render={props =><Dashboard {...props} />} /> */}

          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App;
