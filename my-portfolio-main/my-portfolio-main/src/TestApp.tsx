import { useState } from 'react';

const TestApp = () => {
  const [test, setTest] = useState('Hello World');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Portfolio Test</h1>
      <p>{test}</p>
      <button onClick={() => setTest('Button clicked!')}>
        Test Button
      </button>
      <div style={{ marginTop: '20px', color: 'blue' }}>
        If you can see this, React is working!
      </div>
    </div>
  );
};

export default TestApp;
