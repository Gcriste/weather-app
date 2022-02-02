import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Component.css';
import { fromUnixTime, format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './Component.css';
// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);

const List = ({ weatherData }) => {
	let fiveDays =
		weatherData && weatherData?.daily?.length ? weatherData.daily.filter((item, index) => index < 5) : [];

	return fiveDays && fiveDays.length ? (
		<>
			<Container>
				<Row>
					<Col sm={12}>
						<Card className='twelve-hour-container'>
							<Card.Body>
								<h2>Next 5 Days</h2>
								<hr></hr>
								{/* <Swiper navigation={true} className='mySwiper'> */}
								<div className='five-day-container'>
									<Swiper
										navigation={true}
										breakpoints={{
											640: {
												slidesPerView: 2,
												spaceBetween: 20
											},
											768: {
												slidesPerView: 3,
												spaceBetween: 20
											},
											1024: {
												slidesPerView: 5,
												spaceBetween: 20
											},
											1296: {
												slidesPerView: 5,
												spaceBetween: 20
											}
										}}
									>
										{fiveDays.map((item, index) => (
											// <SwiperSlide>
											<SwiperSlide key={index}>
												<div className='each-day'>
													<Card.Text>
														{format(
															new Date(fromUnixTime(item.dt).toString()),
															'EEEE, MMMM dd'
														)}
													</Card.Text>
													<Card.Subtitle className='mb-2 text-muted'>
														{item.weather[0].description}
													</Card.Subtitle>
													<Card.Text>
														Average temp: {Math.round(item.temp.day)} &#8457;
													</Card.Text>
													<Card.Text>Wind speed: {item.wind_speed} mph</Card.Text>
													<Card.Text className='five-day-img'>
														<img
															alt={item.weather[0].icon}
															src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
														/>
													</Card.Text>
												</div>
											</SwiperSlide>

											// </SwiperSlide>
										))}
									</Swiper>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	) : (
		<Container>
			<Row>
				<Col sm={12}>
					<Card className='twelve-hour-container'>
						<Card.Body>
							<h2>Next 5 Days</h2>
							<hr></hr>
							{/* <Swiper navigation={true} className='mySwiper'> */}
							<div className='five-day-container'>
								<Swiper
									navigation={true}
									breakpoints={{
										640: {
											slidesPerView: 2,
											spaceBetween: 20
										},
										768: {
											slidesPerView: 3,
											spaceBetween: 20
										},
										1024: {
											slidesPerView: 5,
											spaceBetween: 20
										},
										1296: {
											slidesPerView: 5,
											spaceBetween: 20
										}
									}}
								>
									{[...Array(5)].map((item, index) => (
										// <SwiperSlide>
										<SwiperSlide key={index}>
											<div className='each-day'>
												<Card.Text>Date</Card.Text>
												<Card.Subtitle className='mb-2 text-muted'>condition</Card.Subtitle>
												<Card.Text>Average temp &#8457;</Card.Text>
												<Card.Text>Wind speed</Card.Text>
												<Card.Text className='five-day-img'>
													<img alt='img placeholder' src={``} />
												</Card.Text>
											</div>
										</SwiperSlide>

										// </SwiperSlide>
									))}
								</Swiper>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default List;
