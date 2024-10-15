// App.test.tsx

// Add this line to make the file a module
export {}; 

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Telemetry Data', () => {
  render(<App />);
  const headingElement = screen.getByText(/Telemetry Data Management/i);
  // expect(headingElement).tobe();
});
