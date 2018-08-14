
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

    constructor(props){
	super(props);
	this.state = {
	    bio: '',
	    name: '',
	    login: '',
	    avatar_url: '',
	    blog: '',
	    followersCount: '',
	    followingCount: '',
	    location: ''
	};
    }
    
    componentWillMount() {
	this.resetComponent()
    }

    getUser(){
	axios.get(`https://api.github.com/users/${this.state.value}`)
	     .then((response) => {
		 console.log(response.data);
		 this.setState({
		     bio: response.data.bio,
		     name: response.data.name,
		     login: response.data.login,
		     avatar_url: response.data.avatar_url,
		     blog: response.data.blog,
		     followersCount: response.data.followers,
		     followingCount: response.data.followingCount,
		     location: response.data.location
		 });
	     })
	     .catch((error) => console.log(error))
    }

    
    searchGithubUsers(user){
	axios.get(`https://api.github.com/search/users?q=${user}&type=user&per_page=5`)
	     .then((response) => {
		 newSource = response.data.items.map((item) => 
		     ({ ...item, title: item.login, image: item.avatar_url })
		 )
	     })
	     .catch((error) => {
		 this.setState({
		     serverError: error.data
		 });
	     })
    }
    
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
	this.setState({ value: result.title })
	this.getUser();
    }

    handleSearchChange = (e, { value }) => {
	this.setState({ isLoading: true, value })
	
	this.searchGithubUsers(value);
	setTimeout(() => {
	    if (this.state.value.length < 1) return this.resetComponent();
	    const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
	    const isMatch = result => re.test(result.title);

	    this.setState({
		isLoading: false,
		results: _.filter(newSource, isMatch),
	    })
	}, 200);
    }

    render() {
	const { isLoading, value, results } = this.state
	const {avatar_url, name, location, followersCount, followingCount, bio, blog} = this.state;
	return (
	    <div>
		<Grid>
		    <Grid.Row>
			<Grid.Column computer={8}> 
			    <Header style={{marginTop: '3em'}}> Search Github User </Header>
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
			    { this.state.name &&  <Profile bio={bio} name={name}
				     location={location}
				     blog={blog}
				     avatar_url={avatar_url}
				     followersCount={followingCount}
				     followingCount={followingCount}
				  /> }
			</Grid.Column> 
		    </Grid.Row>
		</Grid>
	    </div>
	)
    }
}
