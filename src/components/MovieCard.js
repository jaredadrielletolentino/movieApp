import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MovieCard({ movie }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-100"
    >
      <Card className="movie-card h-100">
        <Card.Body className="d-flex flex-column">
          <Card.Title className="card-title">{movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 card-subtitle">
            {movie.director} ({movie.year})
          </Card.Subtitle>
          <div className="mb-3">
            <Badge bg="dark" text="light">{movie.genre}</Badge>
          </div>
          <Card.Text className="card-text flex-grow-1">
            {movie.description.substring(0, 100)}...
          </Card.Text>
          {/* --- STYLE CHANGE --- */}
          <Button 
            as={Link} 
            to={`/movies/${movie._id}`} 
            variant="primary" 
            className="mt-auto align-self-start"
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
