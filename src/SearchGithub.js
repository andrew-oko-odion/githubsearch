
import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'
import Profile from './Profile'
import axios from 'axios'

const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))

var newSource = [];

export default class SearchGithub extends Component {


    state = {};
    
    componentWillMount() {
	this.resetComponent()
    }

    getUserData(user){
	axios.get(`https://api.github.com/search/users?q=${user}&type=user&per_page=5`)
	     .then((response) => {
		 console.log(response);
		 newSource = response.data.items.map((item) => 
		     ({ ...item, title: item.login, image: item.avatar_url })
		 )
	     })
	     .catch((error) => {
		 this.setState({
		     serverError: error.data
		 });
	     })
	console.log(newSource);
    }
    
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
	this.setState({ value: result.title })
    }

    handleSearchChange = (e, { value }) => {
	this.setState({ isLoading: true, value })
	
	this.getUserData(value);
	setTimeout(() => {
	    if (this.state.value.length < 1) return this.resetComponent();
	    const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
	    const isMatch = result => re.test(result.title);

	    this.setState({
		isLoading: false,
		results: _.filter(newSource, isMatch),
	    })
	}, 300);
    }

    render() {
	const { isLoading, value, results } = this.state

	return (
	    <div>
		<Grid>
		    <Grid.Row>
			<Grid.Column computer={8}> 
			    <Header style={{marginTop: '3em'}}> Search Github user to view his profile </Header>
			    <Search
				loading={isLoading}
				onResultSelect={this.handleResultSelect}
				onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
				results={results}
				value={value}
				{...this.props}
			    />
			</Grid.Column>
		    </Grid.Row>
		    
		    <Grid.Row>
			<Grid.Column computer={12}>
			    <Profile user={this.props.user} />  
			</Grid.Column> 
		    </Grid.Row>
		</Grid>
	    </div>
	)
    }
}
