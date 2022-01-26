import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css';

const FirstRow = ({ weatherData }) => {
	return weatherData ? (
		<>
			<Container>
				<Row>
					<Col className='first-row-container' key={weatherData.city.id} sm={12}>
						<Card>
							<Card.Body>
								<Card.Title>{weatherData.city.name}</Card.Title>
								<Card.Subtitle>Temperature: {weatherData.list[0].main.temp}</Card.Subtitle>
								<Card.Text>Description: {weatherData.list[0].weather[0].description}</Card.Text>
								<Card.Text>Wind Speed: {weatherData.list[0].wind.speed}</Card.Text>
								{/* <Card.Text>Date: {weatherData[0].date}</Card.Text> */}
								<Card.Link href='#'>Another Link</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	) : (
		<div></div>
	);
};

export default FirstRow;
