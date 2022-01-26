import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';
import Search from './Components/Search';
import FirstRow from './Components/FirstRow';
import List from './Components/List';
import ModalContainer from './Components/ModalContainer';

import './App.css';

const App = () => {
	// const startingData = [
	// 	{ id: 1, title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
	// 	{ id: 2, title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
	// 	{ id: 3, title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
	// 	{ id: 4, title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
	// 	{ id: 5, title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' }
	// ];
	const [cityName, setCityName] = useState('');
	const [weatherFirstData, setWeatherFirstData] = useState('');
	const [previouslySearchedCity, setPreviouslySearchedCity] = useState([weatherFirstData]);
	const [weatherAllData, setWeatherAllData] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [containerClassName, setContainerClassName] = useState('');

	const apiKey = 'c9a9ed03a355403f4cb9a36e931c0b4a';

	const handleChange = (e) => {
		setCityName(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			console.log('click');
			handleSearch();
		}
		console.log(e);
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
	}, [weatherFirstData]);

	const callOtherRequest = () => {
		const lat = weatherFirstData.city.coord.lat;
		const lon = weatherFirstData.city.coord.lon;
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
			.then((response) => response.json())
			.then((data) => setWeatherAllData(data));
	};

	// useEffect(() => {
	// 	console.log(responseData);
	// 	setWeatherAllData(responseData);
	// }, [weatherFirstData]);

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
				<FirstRow
					weatherData={weatherFirstData}
					previouslySearchedCities={previouslySearchedCity}
					handleClickCity={(e) => handleClickCity(e)}
				/>
				{showModal ? <ModalContainer show={showModal} handleClose={handleClose} /> : null}
				<List weatherData={weatherAllData} />
			</Container>
		</Container>
	);
};

export default App;
