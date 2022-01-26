import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css';

const List = ({ weatherData }) => {
	return weatherData ? (
		<>
			<Container>
				<Row>
					{weatherData.daily.map((item) => (
						<Col className='list-card-container' key={item.dt} sm={4}>
							<Card>
								<Card.Body>
									<Card.Title>1/28/2022</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										{item.weather[0].description}
									</Card.Subtitle>
									<Card.Text>Temperature: {item.temp.day}</Card.Text>
									<Card.Text>Wind speed: {item.wind_speed}</Card.Text>
									<Card.Link href='#'>Another Link</Card.Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	) : (
		<div></div>
	);
};

export default List;
