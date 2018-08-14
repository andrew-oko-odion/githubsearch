import React, { Component } from 'react'
import axios from 'axios'

export default class Profile extends Component {

    state = {
	
    };
    
    componentDidMount() {
	this.getUser();
    }
    getUser(){
	axios.get(`https://api.github.com/users/&${this.props.user}`)
	     .then((response) => {
		 console.log(response);
	     })
	     .catch((error) => console.log(error))
    }
    
    render(){	
	return (
	    <div>
		{this.props.user}
	    </div> 
	);
    }
}
