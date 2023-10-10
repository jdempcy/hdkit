import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const { REACT_APP_API_URL } = process.env;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
    };
  };

  handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({
        [name]: value
      });
  };

  handleSubmit = (event) => {
      event.preventDefault();
      const {email, password} = this.state;
      let user = {
        email: email,
        password: password
      }
      axios.post(`${REACT_APP_API_URL}/login`, {user}, {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            this.props.handleLogin(response.data)
            this.redirect()
          } else {
            this.setState({
              errors: response.data.errors
            })
          }
        })
        .catch(error => console.log('api errors:', error))
  }; // end handleSubmit()

  redirect = () => {
      this.props.history.push('/')
  };

  handleErrors = () => {
      return (
        <div>
          <ul>
          {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
            })}
          </ul>
        </div>
      )
  };

render() {
  const {email, password} = this.state;

  return (
        <div>
          <h1>Log In</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <button placeholder="submit" type="submit">
              Log In
            </button>
            <div>
             or <Link to='/signup'>sign up</Link>
            </div>

          </form>
          <div>
            {
              this.state.errors ? this.handleErrors() : null
            }
          </div>
        </div>
      );
    }
}
export default Login;
