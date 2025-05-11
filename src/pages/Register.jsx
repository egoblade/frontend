import React, { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(username, password, role);
      navigate('/login');
    } catch (err) {
      setError('Ошибка при регистрации');
    }
  };

  return (
    <Container style={{ maxWidth: 400 }} className="mt-5">
      <h3>Регистрация</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Логин</Form.Label>
          <Form.Control value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Роль</Form.Label>
          <Form.Select value={role} onChange={e => setRole(e.target.value)}>
            <option value="client">Клиент</option>
            <option value="director">Дирекция</option>
            <option value="manager">Менеджер</option>
            <option value="warehouse">Складской</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </Container>
  );
}