import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComponent({ body }) {
  return (
    <Card bg="light" text="info" style={{ width: '18rem' }}>
     {body ? (
              <Card.Body>{body}</Card.Body>

     )
     :( <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  )}
       
    </Card>
  );
}

export default CardComponent;
