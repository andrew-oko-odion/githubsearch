
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TopNavigationMenu extends Component {

    state = {};
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
	const { activeItem } = this.state;

	return (
	    <Menu size="big">
		<Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
		    Github Search
		</Menu.Item>

		<Menu.Menu position='right'>
		    <Menu.Item as={Link} to="/about" name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>
			About
		    </Menu.Item>
		</Menu.Menu>
	    </Menu>
	)
    }
}
