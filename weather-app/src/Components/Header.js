import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

const Header = () => {
	return (
		<Container className='p-5 mb-4 bg-light rounded-3'>
			<h1 className='header'>Weather API App</h1>
			{/* <Dropdown.Menu show>
				<Dropdown.Header>Dropdown header</Dropdown.Header>
				<Dropdown.Item eventKey='2'>Another action</Dropdown.Item>
				<Dropdown.Item eventKey='3'>Something else here</Dropdown.Item>
			</Dropdown.Menu> */}
		</Container>
	);
};

export default Header;
