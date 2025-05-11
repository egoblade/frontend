import React, { useState, useContext } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // если пришли по защите, в state.from хранится предыдущий путь
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // после логина отправляем туда, откуда пришли
      navigate(from, { replace: true });
    } catch (err) {
      setError('Неправильные имя или пароль');
    }
  };

  return (
    <Container style={{ maxWidth: 400 }} className="mt-5">
      <h3>Вход</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Войти
        </Button>
      </Form>
    </Container>
  );
}
