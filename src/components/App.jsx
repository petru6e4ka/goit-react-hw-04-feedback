import { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Statistics } from './Statistics';

const BlockContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #edf0f7;
`;

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const handleIncrement = useCallback(
    evt => {
      setState(prevState => ({
        ...prevState,
        [evt.target.name]: prevState[evt.target.name] + 1,
      }));
    },
    [setState]
  );

  const countTotalFeedback = useMemo(
    () => Object.values(state).reduce((prev, next) => prev + next),
    [state]
  );

  const countPositiveFeedbackPercentage = useMemo(
    () => Math.round((state.good * 100) / countTotalFeedback),
    [state, countTotalFeedback]
  );

  return (
    <BlockContainer>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={handleIncrement}
        />
      </Section>
      <Section title="Statistics">
        <Statistics
          {...state}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage}
        />
      </Section>
    </BlockContainer>
  );
};
