import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  const sampleProducts = [
    { id: 1, title: 'Обои "HC31182-44pl"', price: '2500 ₽', img: '/images/sample1.jpg' },
    { id: 2, title: 'Обои "Wall123"', price: '3000 ₽', img: '/images/sample2.jpg' },
    { id: 3, title: 'Обои "Rinnegan9"', price: '1500 ₽', img: '/images/sample3.jpg' },
  ];

  return (
    <>
      <h1 className="mb-4">Аврора</h1>
      <Row>
        {sampleProducts.map(prod => (
          <Col key={prod.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={prod.img} />
              <Card.Body>
                <Card.Title>{prod.title}</Card.Title>
                <Card.Text>Цена: {prod.price}/рулон</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
