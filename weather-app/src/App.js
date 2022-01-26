import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Components/Header';
import Search from './Components/Search';
import List from './Components/List';

import './App.css';

const App = () => {
	const startingData = [
		{ title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
		{ title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
		{ title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
		{ title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' },
		{ title: 'test', description: 'test description', uvIndex: 'test uv', date: 'hi' }
	];
	const [cityName, setCityName] = useState('');
	const [weatherData, setWeatherData] = useState(startingData);
	const apiKey = '13119145d21b8c993842cb2808e0a390';

	const handleChange = (e) => {
		setCityName(e.target.value);
	};
	const handleSearch = () => {
		fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=${5}&appid=${apiKey}`)
			.then((response) => response.json())
			.then((data) => setWeatherData(data));
	};

	return (
		<Container className='p-3'>
			<Header />
			<Search handleSearch={handleSearch} handleChange={handleChange} />
			<List weatherData={startingData} />
		</Container>
	);
};

export default App;
