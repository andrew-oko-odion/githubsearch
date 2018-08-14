import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SearchGithub from './SearchGithub'
import Profile from './Profile'

export default () => {
    return (
	<Switch>
	    <Route exact path="/" component={SearchGithub} />
	</Switch>
    );
}
