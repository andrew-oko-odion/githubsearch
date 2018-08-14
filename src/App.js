import React, { Component } from 'react';
import './App.css';
import { Grid }  from 'semantic-ui-react'
import Routes from './Routes'
import TopNavigationMenu from './TopNavigationMenu' 

class App extends Component {
  render() {
      return (
	  <div>
	      <TopNavigationMenu />
	      <Grid centered>
		  <Grid.Column computer={12}> 
		      <Routes />
		  </Grid.Column>
	  </Grid>
	  </div>
    );
  }
}

export default App;
