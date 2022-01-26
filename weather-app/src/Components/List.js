import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css';
import { fromUnixTime, format } from 'date-fns';

const List = ({ weatherData }) => {
	return weatherData ? (
		<>
			<Container>
				<Row>
					{weatherData.daily.map((item) => (
						<Col className='list-card-container' key={item.dt} sm={4}>
							<Card>
								<Card.Body>
									<Card.Title>
										{format(new Date(fromUnixTime(item.dt).toString()), 'MM/dd/yyyy')}
									</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										{item.weather[0].description}
									</Card.Subtitle>
									<Card.Text>Average temp: {item.temp.day} &#8457;</Card.Text>
									<Card.Text>Wind speed: {item.wind_speed} mph</Card.Text>
									<Card.Text>
										<img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
									</Card.Text>
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
