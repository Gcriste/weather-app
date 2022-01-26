import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css';

const FirstRow = ({ weatherData, previouslySearchedCities, handleClickCity }) => {
	let noDuplicateCities = previouslySearchedCities ? [...new Set(previouslySearchedCities)] : [];
	let cityName =
		weatherData && weatherData?.city?.name ? `http://www.google.com/search?q=${weatherData.city.name}` : '#';
	return weatherData && weatherData?.list?.[0].weather?.[0].description ? (
		<>
			<Container>
				<Row>
					<Col className='first-row-container' key={weatherData.city.id} sm={8}>
						<Card>
							<Card.Body>
								<Card.Title>{weatherData.city.name}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>
									{weatherData.list[0].weather[0].description}
								</Card.Subtitle>
								<Card.Text>Current temperature: {weatherData.list[0].main.temp} &#8457;</Card.Text>
								<Card.Text>Wind Speed: {weatherData.list[0].wind.speed} mph</Card.Text>
								{/* <Card.Text>Date: {weatherData[0].date}</Card.Text> */}
								<Card.Link href={cityName} target='_blank'>
									Find out more about the city
								</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col className='first-row-container' sm={4}>
						<Card>
							<Card.Body>
								<Card.Title>Previously Searched Cities</Card.Title>
								{noDuplicateCities.length
									? noDuplicateCities.map((item) => (
											<Card.Text
												className='searched-city'
												onClick={(e) => handleClickCity(e)}
												value={item}
												key={item}
											>
												{item}
											</Card.Text>
									  ))
									: ''}
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
