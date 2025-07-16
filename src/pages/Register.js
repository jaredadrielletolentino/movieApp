import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import { motion } from 'framer-motion';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://movieapp-9vzc.onrender.com/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, mobileNo, password } )
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Successfully Registered') {
        notyf.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        notyf.error(data.message || 'Registration failed');
      }
    })
    .catch(() => notyf.error('An error occurred'))
    .finally(() => setIsLoading(false));
  };

  return (
    <Container className="auth-container d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="auth-card">
              <Card.Body className="p-4 p-sm-5">
                <div className="text-center mb-4">
                  <h2 className="auth-title mb-3 text-muted">Register</h2>
                </div>
                <Form onSubmit={registerUser}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} className="auth-input" required minLength="8" />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required minLength="8" />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={isLoading} size="lg">
                      {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <p className="mb-0 text-secondary">
                    Already have an account? <Link to="/login" className="auth-toggle-link">Login</Link>
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
