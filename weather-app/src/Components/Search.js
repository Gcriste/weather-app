import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = ({ handleSearch, handleChange }) => {
	return (
		<>
			<Container>
				<Row>
					<Col sm={8}>
						<InputGroup className='mb-3'>
							<InputGroup.Text>Search for a city</InputGroup.Text>
							<FormControl
								onChange={(e) => handleChange(e)}
								// value={this.state.cityName}
								aria-label='city-name'
								placeholder='Ex: Nashville'
							/>
							<Button onClick={handleSearch}>Search</Button>
						</InputGroup>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Search;
