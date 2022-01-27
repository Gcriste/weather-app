import React from 'react';
import Card from 'react-bootstrap/Card';
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

const TwelveHours = ({ weatherAllData }) => {
	let firstTwelveHours =
		weatherAllData && weatherAllData?.hourly ? weatherAllData.hourly.filter((item, index) => index < 12) : [];
	return (
		<Card className='twelve-hour-container'>
			<Card.Body>
				<h2>Next Twelve Hours</h2>
				<hr></hr>
				<div className='time-container'>
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
								spaceBetween: 0
							},
							1296: {
								slidesPerView: 6,
								spaceBetween: 0
							}
						}}
					>
						{firstTwelveHours.map((item, index) => (
							<SwiperSlide key={index}>
								<div className='each-hour'>
									<Card.Text>
										{format(new Date(fromUnixTime(item.dt).toString()), 'EEEE h:mm aaa')}
									</Card.Text>
									<Card.Img
										variant='top'
										alt={item.weather[0].icon}
										src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
									/>

									<Card.Text className='bold-text-sub-title'>
										{Math.round(item.temp)} &#8457;
									</Card.Text>
									<Card.Text>{item.weather[0].description}</Card.Text>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</Card.Body>
		</Card>
	);
};

export default TwelveHours;
