import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';
import Search from './Components/Search';
import FirstRowAndTwelve from './Components/FirstRowAndTwelve';
import FiveDays from './Components/FiveDays';
import ModalContainer from './Components/ModalContainer';

import './App.css';

const App = () => {
	const [cityName, setCityName] = useState('');
	const [weatherFirstData, setWeatherFirstData] = useState('');
	const [previouslySearchedCity, setPreviouslySearchedCity] = useState([weatherFirstData]);
	const [weatherAllData, setWeatherAllData] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [containerClassName, setContainerClassName] = useState('');

	const apiKey = '13119145d21b8c993842cb2808e0a390';

	const handleChange = (e) => {
		setCityName(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};
	const handleSearch = () => {
		cityName
			? fetch(
					`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=${6}&appid=${apiKey}&units=imperial`
			  )
					.then((response) => response.json())
					.then((data) => setWeatherFirstData(data))
			: setShowModal(true);
		setCityName('');
	};

	const handleClose = () => setShowModal(false);

	const handleClickCity = (e) => {
		let city = e.target.textContent;
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${6}&appid=${apiKey}&units=imperial`)
			.then((response) => response.json())
			.then((data) => setWeatherFirstData(data));
	};

	const callOtherRequest = () => {
		const lat = weatherFirstData.city.coord.lat;
		const lon = weatherFirstData.city.coord.lon;
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
			.then((response) => response.json())
			.then((data) => setWeatherAllData(data));
	};

	useEffect(() => {
		if (weatherFirstData && weatherFirstData.cod !== '404') {
			callOtherRequest();
			setPreviouslySearchedCity([...previouslySearchedCity, weatherFirstData.city.name]);
			let noDuplicateCities = previouslySearchedCity ? [...new Set(previouslySearchedCity)] : [];
			localStorage.setItem('cities', JSON.stringify(noDuplicateCities));
			const weatherConditions = weatherFirstData.list[0].weather[0].description;
			if (weatherConditions) {
				weatherConditions === 'clear sky'
					? setContainerClassName('clear-sky')
					: weatherConditions === 'cloudy'
					? setContainerClassName('cloudy')
					: setContainerClassName('rainy');
			}
		} else if (weatherFirstData.cod === '404') {
			setShowModal(true);
			setCityName('');
		}
	}, [weatherFirstData]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClearCities = () => {
		setCityName('');
		setPreviouslySearchedCity(['']);
		setWeatherFirstData('');
		setWeatherAllData('');
		setContainerClassName('');
		localStorage.setItem('cities', JSON.stringify(previouslySearchedCity));
	};

	return (
		<Container className={containerClassName}>
			<Container className='p-3'>
				<Header />
				<Search
					handleKeyDown={handleKeyDown}
					handleSearch={handleSearch}
					handleChange={handleChange}
					cityName={cityName}
				/>
				<FirstRowAndTwelve
					weatherData={weatherFirstData}
					weatherAllData={weatherAllData}
					previouslySearchedCities={previouslySearchedCity}
					handleClickCity={(e) => handleClickCity(e)}
					handleClearCities={handleClearCities}
				/>
				{showModal ? <ModalContainer show={showModal} handleClose={handleClose} /> : null}
				<FiveDays weatherData={weatherAllData} />
			</Container>
		</Container>
	);
};

export default App;
