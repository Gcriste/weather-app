import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PreviouslySearched from './PreviouslySearched';
import Accordion from 'react-bootstrap/Accordion';
import TwelveHours from './TwelveHours';
import { fromUnixTime, format } from 'date-fns';

const FirstRow = ({ weatherData, weatherAllData, previouslySearchedCities, handleClickCity, handleClearCities }) => {
	const cityName =
		weatherData && weatherData?.city?.name ? `http://www.google.com/search?q=${weatherData.city.name}` : '#';

	const firstDay = weatherAllData && weatherAllData?.daily ? weatherAllData.daily : [];

	const getSunriseOrMoonriseLabel = (data) => {
		const response =
			format(new Date(fromUnixTime(data.current.dt).toString()), 'aaa') === 'am' ? 'Sunrise' : 'Moonrise';
		return response;
	};
	const getSunsetOrMoonsetLabel = (data) => {
		const response =
			format(new Date(fromUnixTime(data.current.dt).toString()), 'aaa') === 'am' ? 'Sunset' : 'Moonset';
		return response;
	};

	const getSunriseOrMoonrise = (data) => {
		const response =
			format(new Date(fromUnixTime(data.current.dt).toString()), 'aaa') === 'am'
				? format(new Date(fromUnixTime(data.daily[0].sunrise).toString()), 'h:mm aaa')
				: format(new Date(fromUnixTime(data.daily[0].moonrise).toString()), 'h:mm aaa');
		return response;
	};

	const getSunsetOrMoonset = (data) => {
		const response =
			format(new Date(fromUnixTime(data.current.dt).toString()), 'aaa') === 'am'
				? format(new Date(fromUnixTime(data.daily[0].sunset).toString()), 'h:mm aaa')
				: format(new Date(fromUnixTime(data.daily[0].moonset).toString()), 'h:mm aaa');
		return response;
	};

	return weatherData &&
		weatherData?.list?.[0].weather?.[0].description &&
		weatherAllData?.hourly &&
		weatherAllData?.current ? (
		<>
			<Container>
				<Row>
					<Col className='first-row-container' key={weatherData.city.id} sm={8}>
						<Card>
							<Card.Body>
								<h2>Current Weather</h2>
								<hr></hr>
								<Row>
									<Col sm={6}>
										<Card.Title>{weatherData.city.name}</Card.Title>
										<Card.Title className='bold-text-title'>
											{Math.round(weatherData.list[0].main.temp)} &#8457;
										</Card.Title>
										<Card.Text>
											Feels Like {Math.round(weatherData.list[0].main.feels_like)} &#8457;
										</Card.Text>
										<Card.Subtitle className='mb-2 text-muted'>
											{weatherData.list[0].weather[0].description}
										</Card.Subtitle>
										<Row>
											<Col className='bottom-padding' sm={4}>
												<Card.Text>Day: {Math.round(firstDay[0].temp.day)} &#8457;</Card.Text>
											</Col>
											<Col className='bottom-padding' sm={4}>
												<Card.Text>
													Night: {Math.round(firstDay[0].temp.night)} &#8457;
												</Card.Text>
											</Col>
										</Row>
										<Card.Link href={cityName} target='_blank'>
											Find out more about {weatherData?.city?.name}
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
													Wind Speed {weatherData.list[0].wind.speed} mph
												</Accordion.Body>
												<Accordion.Body className='accordion-override'>
													Humidity {weatherData.list[0].main.humidity}%
												</Accordion.Body>
												<Accordion.Body className='accordion-override'>
													UV index {firstDay[0].uvi} of 10
												</Accordion.Body>
												<Accordion.Body className='accordion-override'>
													<Row>
														<Col sm={6}>
															{getSunriseOrMoonriseLabel(weatherAllData)}{' '}
															{getSunriseOrMoonrise(weatherAllData)}
														</Col>
														<Col sm={6}>
															{getSunsetOrMoonsetLabel(weatherAllData)}{' '}
															{getSunsetOrMoonset(weatherAllData)}
														</Col>
													</Row>
												</Accordion.Body>
												{/* <Accordion.Body className='accordion-override'>
													Wind Speed: {weatherData.list[0].wind.speed} mph
												</Accordion.Body> */}
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
						<TwelveHours weatherAllData={weatherAllData} />
					</Col>
				</Row>
			</Container>
		</>
	) : (
		<div></div>
	);
};

export default FirstRow;
