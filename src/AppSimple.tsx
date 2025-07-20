import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Portfolio Loading...</h1>
        <p>Theme: {theme}</p>
        <button onClick={toggleTheme} style={{ padding: '1rem', margin: '1rem' }}>
          Toggle Theme
        </button>
        <div style={{ marginTop: '2rem', color: 'var(--text-primary)' }}>
          If you can see this with styling, the CSS is loading correctly.
        </div>
      </div>
    </div>
  );
};

export default App;
