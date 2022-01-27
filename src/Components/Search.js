import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = ({ handleSearch, handleChange, cityName, handleKeyDown }) => {
	return (
		<>
			<Container>
				<Row>
					<Col sm={12} lg={12}>
						<InputGroup className='mb-3'>
							<InputGroup.Text className='search-side-text'>Search for a city</InputGroup.Text>
							<FormControl
								onChange={(e) => handleChange(e)}
								onKeyDown={(e) => handleKeyDown(e)}
								value={cityName}
								aria-label='city-name'
								placeholder='Ex: Nashville'
							/>
							<Button variant='success' onClick={handleSearch}>
								Search
							</Button>
						</InputGroup>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Search;
