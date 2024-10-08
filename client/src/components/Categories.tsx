import {
  useQuery,
} from '@tanstack/react-query';
import {
  Button,
  Container,
  Col,
  Dropdown,
  Modal,
  Row,
} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getCategories } from '../services';

const Categories = () => {
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(0);
  const [modalCategory, setModalCategory] = useState('');

  const handleShow = (dur: number, cat: string) => {
    setShow(true);
    setDuration(dur);
    setModalCategory(cat);
  };
  const handleClose = () => {
    setShow(false);
  };

  const categoriesQuery = useQuery({ queryKey: ['categories'], queryFn: getCategories });
  return (
    <Container>
      <h1>Choose a Quiz Topic</h1>
      <Row className="row-cols-3 g-4">
        {categoriesQuery.data?.map((category: string) => {
          return (
            <Col key={category}>
              <Dropdown className="d-grid">
                <Dropdown.Toggle variant="outline-secondary">
                  {category}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => { handleShow(2, category); }}
                  >
                    2 minute quiz
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => { handleShow(4, category); }}
                  >
                    4 minute quiz
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          );
        })}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>
              This quiz is on the topic "{modalCategory}".
            </li>
            <li>
              Total duration of the quiz is {duration} minutes.
              Quiz will automatically
              stop at the end of this duration.
            </li>
            <li>
              Quiz can also be prematurely ended by clicking the Submit
              button.
            </li>
            <li>You are free to navigate to any question.</li>
            <li>
              Leaving the page without submitting would lead to loss of your
              answers
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" data-bs-dismiss="modal" onClick={handleClose}>
            Cancel
          </Button>
          <Link to={`/${modalCategory}/${duration}min`}>
            <Button variant="primary">Start Quiz</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categories;
