import { useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="hero-section">
        <Container>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Explore the World of Cinema
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Discover, review, and manage your favorite movies in one place.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            {user.id ? (
              <Button as={Link} to="/movies" variant="primary" size="lg">🎬 Browse Movies</Button>
            ) : (
              <div>
                <Button as={Link} to="/login" variant="primary" size="lg" className="me-3">Get Started</Button>
              </div>
            )}
          </motion.div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div style={{ fontSize: '3rem' }}>🔍</div>
              <h3 className="mt-3">Discover Movies</h3>
              <p className="text-secondary">
                Browse a vast catalog of movies from all genres and eras.
              </p>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div style={{ fontSize: '3rem' }}>✍️</div>
              <h3 className="mt-3">Leave Comments</h3>
              <p className="text-secondary">
                Share your thoughts and read comments from other movie lovers.
              </p>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div style={{ fontSize: '3rem' }}>👑</div>
              <h3 className="mt-3">Admin Control</h3>
              <p className="text-secondary">
                Admins can easily manage the movie catalog with full CRUD functionality.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
