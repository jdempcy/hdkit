import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';

import HomeSignedIn from './HomeSignedIn';
import SignIn from './screens/SignInScreen';
import Signup from './components/registrations/Signup';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: {}
     };
  } // End constructor

  componentDidMount() { 
    this.loginStatus(); // Check with the Rails server to see if the user is logged in.
  }

  loginStatus = () => {
    axios.get(`${REACT_APP_API_URL}/logged_in`, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response);
      } else {
        this.handleLogout();
      }
    })
    .catch(error => console.log('API error:', error));
  } // End loginStatus()

  handleLogin = (response) => { 
    // For some reason sometimes response has response.user and other times response.data.user (d'oh!)
    let user = response.user ? response.user : response.data.user;
    this.setState({
      isLoggedIn: true,
      user: user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact path='/login'
              render={props => (
              <SignIn {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/signup'
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              path={['/bodygraphs', 
                     '/outer-planets', 
                     '/day-planner', 
                     '/the-world', 
                     '/research-center',
                     '/learning-center',
                     '/rave-mandala',
                     '/mystic-corner',
                     '/special-interest'
                    ]}
              render={props => (
                !this.state.isLoggedIn ? "" : 
                <HomeSignedIn {...props} user={this.state.user} handleLogout={this.handleLogout} />
              )}
            />
            <Route
              exact path='/'
              render={props => (
                !this.state.isLoggedIn ? "" : 
                <HomeSignedIn {...props} user={this.state.user} handleLogout={this.handleLogout} />
              )}
            />    
          </Switch>
        </BrowserRouter>
      </div>
    ); // End return
  } // End render()
}; // End class App

export default App;
