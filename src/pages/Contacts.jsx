import React from 'react';
import { Container } from 'react-bootstrap';

export default function Contacts() {
  return (
    <Container className="mt-5">
      <h2>Контакты</h2>
      <p>Телефон: +7 (777) 456‑78‑90</p>
      <p>Email: info_aurora@mail.ru</p>
      <p>Адрес: г. Байконур, ул. улица Нестеренко </p>
    </Container>
  );
}