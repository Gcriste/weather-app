import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';
import Search from './Components/Search';
import FirstRow from './Components/FirstRow';
import List from './Components/List';

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
	const [weatherAllData, setWeatherAllData] = useState('');
	const apiKey = '58de0acb5a7de5b2d7ed2c6cbf971820';

	const handleChange = (e) => {
		setCityName(e.target.value);
	};
	const handleSearch = () => {
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=${6}&appid=${apiKey}&units=imperial`)
			.then((response) => response.json())
			.then((data) => setWeatherFirstData(data));
	};

	useEffect(() => {
		if (weatherFirstData) {
			callOtherRequest();
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
		<Container className='p-3'>
			<Header />
			<Search handleSearch={handleSearch} handleChange={handleChange} />
			<FirstRow weatherData={weatherFirstData} />
			<List weatherData={weatherAllData} />
		</Container>
	);
};

export default App;
