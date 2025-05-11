import React from 'react';
import { Container } from 'react-bootstrap';

export default function ManagerPanel() {
  return (
    <Container className="mt-5">
      <h2>Панель менеджера</h2>
      <p>Здесь доступен функционал только для менеджеров и дирекции.</p>
    </Container>
  );
}
