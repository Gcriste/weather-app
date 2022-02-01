import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css';
import { fromUnixTime, format } from 'date-fns';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// // import Swiper core and required modules
// import SwiperCore, { Navigation } from 'swiper';

// // install Swiper modules
// SwiperCore.use([Navigation]);

const List = ({ weatherData }) => {
	let fiveDays =
		weatherData && weatherData?.daily?.length ? weatherData.daily.filter((item, index) => index < 5) : [];

	return fiveDays && fiveDays.length ? (
		<>
			<Container>
				<Row>
					<Col sm={12}>
						<Card>
							<Card.Body>
								<h2>Next 5 Days</h2>
								<hr></hr>
								{/* <Swiper navigation={true} className='mySwiper'> */}
								{fiveDays.map((item) => (
									// <SwiperSlide>

									<Card>
										<Card.Body>
											<Card.Title>
												{format(new Date(fromUnixTime(item.dt).toString()), 'EEEE, MMMM dd')}
											</Card.Title>
											<Card.Subtitle className='mb-2 text-muted'>
												{item.weather[0].description}
											</Card.Subtitle>
											<Card.Text>Average temp: {Math.round(item.temp.day)} &#8457;</Card.Text>
											<Card.Text>Wind speed: {item.wind_speed} mph</Card.Text>
											<Card.Text className='five-day-img'>
												<img
													alt={item.weather[0].icon}
													src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
												/>
											</Card.Text>
										</Card.Body>
									</Card>

									// </SwiperSlide>
								))}
								{/* </Swiper> */}
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

export default List;
