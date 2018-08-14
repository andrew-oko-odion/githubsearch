import React, { Component } from 'react'
import { Segment, Grid, Card, Image, Icon } from 'semantic-ui-react'

export default (props) => {

    const {avatar_url, name, location, followersCount, followingCount, bio, blog} = props;
    
    return (
	<div>
	    <Grid>
		<Grid.Column>
		    <Segment> 
			<Card>
			    { avatar_url && <Image src={avatar_url} /> }
			    <Card.Content>
				<Card.Header> {name} </Card.Header>
				<Card.Meta>
				    { location && <span className='date'>{location}</span> }
				</Card.Meta>
				{ bio && <Card.Description>{bio}</Card.Description> } 
			    </Card.Content>
			    <Card.Content extra>
				{ followersCount && <a>
				<Icon name='user' />
				{followersCount} Followers
				</a>
				}
				
				{ blog && <a style={{float: 'right'}}>
				    <Icon name='unlink' />
				    {blog}
				</a> }
			    </Card.Content>
			</Card>
		    </Segment> 
		</Grid.Column>
	  </Grid> 
	</div> 
    )
}
