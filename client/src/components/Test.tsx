import {
  useQuery,
} from '@tanstack/react-query';
import {
  Button,
  Container,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { getOneCategoryData } from '../services';

const Test = () => {
  const [questionNum, setQuestionNum] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTimeLeft((t) => { return t - 1; });
    }, 1000);
  }, []);

  const userAnswered = () => {
  };

  const handlePrevious = () => {
    setQuestionNum((qn) => { return qn - 1; });
    userAnswered();
  };
  const handleNext = () => {
    setQuestionNum((qn) => { return qn + 1; });
  };
  const handleMarkForReview = () => {
  };

  const getCategoryFromPath = () => {
    const pathnameRe = /^\/([^/]+)\/([^/]+)/;
    const match = location.pathname.match(pathnameRe);
    if (!match) {
      throw new Error('Invalid pathname format');
    }
    return match[1];
  };

  const questionsQuery = useQuery({
    queryKey: ['oneCategoryData'], queryFn: () => {
      return getOneCategoryData(getCategoryFromPath());
    },
  });

  if (questionsQuery.isPending) {
    return <div>Loading data...</div>;
  } else if (questionsQuery.error) {
    throw questionsQuery.error;
  } else {
    return (
      <Container>
        <header className="d-flex justify-content-between bg-primary-subtle px-2 py-2 mb-4">
          <span className="fs-2">{getCategoryFromPath()}</span>
          <div className="d-flex align-items-center">
            <div className="bg-info-subtle rounded-3 me-2 px-2 py-1">
              Question Num: {questionNum}
            </div>
            <div className="bg-warning-subtle rounded-3 me-3 px-2 py-1">
              Time Left: {timeLeft}
            </div>
            <Button variant="danger" className="rounded-3 px-4 py-2" data-bs-toggle="modal" data-bs-target="#submit-confirmation">
              Submit
            </Button>
          </div>
        </header>
        <div className="d-flex justify-content-between">
          <div>
            <p id="question">{questionsQuery.data[questionNum - 1].question}</p>
            <div className="mb-3">
              <div>
                <input id="true" type="radio" name="answer" />
                <label htmlFor="true">True</label>
              </div>
              <div>
                <input id="false" type="radio" name="answer" />
                <label htmlFor="false">False</label>
              </div>
            </div>
            <Button
              variant="primary"
              className="me-2"
              onClick={handlePrevious}
              disabled={questionNum == 1}
            >Previous</Button>
            <Button
              variant="primary"
              className="me-2"
              onClick={handleNext}
              disabled={questionNum === questionsQuery.data.length}
            >Next</Button>
            <Button
              variant="warning"
              onClick={handleMarkForReview}
            >Mark for Review</Button>
          </div>
        </div>
      </Container>
    );
  }
};

export default Test;
