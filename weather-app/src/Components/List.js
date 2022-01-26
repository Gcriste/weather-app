import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const List = ({ weatherData }) => {
	return (
		<>
			<Container>
				<Row>
					{weatherData.map((item) => (
						<Col sm={4}>
							<Card>
								<Card.Body>
									<Card.Title>{item.title}</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>{item.description}</Card.Subtitle>
									<Card.Text>UV Index: {item.uvIndex}</Card.Text>
									<Card.Text>Date: {item.date}</Card.Text>
									<Card.Link href='#'>Another Link</Card.Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default List;
