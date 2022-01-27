import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PreviouslySearched from './PreviouslySearched';
import Accordion from 'react-bootstrap/Accordion';
import { fromUnixTime, format } from 'date-fns';
import './Component.css';

const FirstRow = ({ weatherData, weatherAllData, previouslySearchedCities, handleClickCity, handleClearCities }) => {
	let cityName =
		weatherData && weatherData?.city?.name ? `http://www.google.com/search?q=${weatherData.city.name}` : '#';
	let firstTwelveHours =
		weatherAllData && weatherAllData?.hourly ? weatherAllData.hourly.filter((item, index) => index < 9) : [];

	let dailyMinAndMax = weatherAllData && weatherAllData?.daily ? weatherAllData.daily : [];

	return weatherData &&
		weatherData?.list?.[0].weather?.[0].description &&
		firstTwelveHours &&
		firstTwelveHours.length ? (
		<>
			<Container>
				<Row>
					<Col className='first-row-container' key={weatherData.city.id} sm={8}>
						<Card>
							<Card.Body>
								<Row>
									<Col sm={6}>
										<Card.Title>{weatherData.city.name}</Card.Title>
										<Card.Title className='bold-text-title'>
											{Math.round(weatherData.list[0].main.temp)} &#8457;
										</Card.Title>
										<Card.Subtitle className='mb-2 text-muted'>
											{weatherData.list[0].weather[0].description}
										</Card.Subtitle>
										<Card.Text>
											<Row>
												<Col sm={4}>Day: {Math.round(dailyMinAndMax[0].temp.day)} &#8457;</Col>
												<Col sm={4}>
													{' '}
													Night: {Math.round(dailyMinAndMax[0].temp.night)} &#8457;
												</Col>
											</Row>
										</Card.Text>
										<Card.Link href={cityName} target='_blank'>
											Find out more about the city
										</Card.Link>
									</Col>
									<Col sm={6}>
										{' '}
										<Accordion className='top-margin-container'>
											<Accordion.Item eventKey='0'>
												<Accordion.Header className='accordion-override'>
													More details
												</Accordion.Header>
												<Accordion.Body className='accordion-override'>
													<div>Wind Speed: {weatherData.list[0].wind.speed} mph</div>
												</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>

					<Col className='first-row-container' sm={4}>
						<PreviouslySearched
							previouslySearchedCities={previouslySearchedCities}
							handleClickCity={handleClickCity}
							handleClearCities={handleClearCities}
						/>
					</Col>
				</Row>
				<Row>
					<Col className='first-row-container' sm={12}>
						<h2>Next Twelve Hours</h2>
						<Card>
							<Card.Body>
								<div className='time-container'>
									{firstTwelveHours.map((item) => (
										<div key={item.temp} className='each-hour'>
											<Card.Img
												variant='top'
												alt={item.weather[0].icon}
												src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
											/>

											<Card.Text className='bold-text'>{Math.round(item.temp)} &#8457;</Card.Text>
											<Card.Text>{item.weather[0].description}</Card.Text>
											<Card.Text>
												{format(new Date(fromUnixTime(item.dt).toString()), 'E h aaa')}
											</Card.Text>
										</div>
									))}
								</div>
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
