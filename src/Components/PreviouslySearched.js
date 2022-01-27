import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PreviouslySearched = ({ previouslySearchedCities, handleClickCity, handleClearCities }) => {
	let noDuplicateCities = previouslySearchedCities ? [...new Set(previouslySearchedCities)] : [];
	return (
		<Card>
			<Card.Body>
				<Card.Title>Previously Searched Cities</Card.Title>
				{noDuplicateCities.length
					? noDuplicateCities.map((item) => (
							<Card.Text
								className='searched-city'
								onClick={(e) => handleClickCity(e)}
								value={item}
								key={item}
							>
								{item}
							</Card.Text>
					  ))
					: ''}
				<Button variant='danger' onClick={handleClearCities}>
					Clear
				</Button>
			</Card.Body>
		</Card>
	);
};

export default PreviouslySearched;
