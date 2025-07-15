import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

export default function UserView({ movies }) {
  return (
    <Container className="mt-5">
      <h1 className="page-title text-center text-muted">Movie Catalog</h1>
      <Row>
        {movies.map(movie => (
          <Col key={movie._id} lg={4} md={6} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
