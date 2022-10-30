import { Box } from './Box';

import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'good':
      return {
        ...state,
        good: state.good + 1,
      };
    case 'neutral':
      return {
        ...state,
        neutral: state.neutral + 1,
      };
    case 'bad':
      return {
        ...state,
        bad: state.bad + 1,
      };

    default:
      return state;
  }
};

export const App = () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onButtonClick = ({ target: { name: type } }) => {
    dispatch({ type });
  };

  const getTotal = () => {
    return state.good + state.neutral + state.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((state.good * 100) / getTotal());
  };

  return (
    <Box width="50%" p="15px">
      <Section title="Please leave feedback">
        <FeedbackOptions
          statOptions={Object.keys(state)}
          onButtonClick={onButtonClick}
        />
      </Section>
      <Section title="Statistics">
        {getTotal() ? (
          <Statistics
            stats={state}
            statOptions={Object.keys(state)}
            total={getTotal()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <p>No feedback given</p>
        )}
      </Section>
    </Box>
  );
};
