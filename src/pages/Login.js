import { useState, useContext } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://movieapp-9vzc.onrender.com/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password } )
    })
    .then(res => res.json())
    .then(data => {
      if (data.access) {
        localStorage.setItem('token', data.access);
        fetch('https://movieapp-9vzc.onrender.com/users/profile', {
          headers: { 'Authorization': `Bearer ${data.access}` }
        } )
        .then(res => res.json())
        .then(userData => {
          setUser({ id: userData._id, email: userData.email, isAdmin: userData.isAdmin });
          notyf.success('Login successful!');
          navigate('/movies');
        });
      } else {
        notyf.error(data.message || 'Login failed');
        setIsLoading(false);
      }
    })
    .catch(() => {
      notyf.error('An error occurred during login');
      setIsLoading(false);
    });
  };

  return (
    <Container className="auth-container d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="auth-card">
              <Card.Body className="p-4 p-sm-5">
                <div className="text-center mb-4">
                  <h2 className="auth-title mb-3 text-muted">Login</h2>
                </div>
                <Form onSubmit={loginUser}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={isLoading} size="lg">
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <p className="mb-0 text-secondary">
                    Don't have an account? <Link to="/register" className="auth-toggle-link">Register</Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
