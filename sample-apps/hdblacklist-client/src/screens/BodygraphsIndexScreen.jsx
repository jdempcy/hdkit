import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import BodygraphsIndexList from './BodygraphsIndexList';
import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

class BodygraphsIndexScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        user: {}
       };
    } // End constructor

    componentDidMount() { 
        this.getBodygraphs(); // Fetch bodygraphs from Rails server.
      }
      
    getBodygraphs = () => {
    axios.get(`${REACT_APP_API_URL}/users`, {withCredentials: true})
    .then(response => {
        console.log('bodygraphs fetched:')
        console.log(response)
    })
    .catch(error => console.log('API error:', error));
  } // End loginStatus()

render() {
    return (
        <div>
              <BodygraphsIndexList /><br />
              <Link color="primary" href="#" onClick={(e) => e.preventDefault()} sx={{ mt: 3 }}>
                See more bodygraphs
              </Link><br />

              <Link color="primary" href="/bodygraphs/new" sx={{ mt: 3 }}>
                Add new bodygraph
              </Link>
        </div>
    ); // End return
  } // End render()
}; // End class App

export default BodygraphsIndexScreen;
