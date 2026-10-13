import { afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { useState } from 'react';

afterEach(() => {
  cleanup();
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>DevOps React Application</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

describe('App component', () => {
  it('renders the application heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'DevOps React Application',
      })
    ).toBeInTheDocument();
  });

  it('displays the initial count', () => {
    render(<App />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments the count when clicked', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Increment' })
    );

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});

