import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  // 0.2s后滚动到100px
  setTimeout(() => {
    window.scrollTo({
      top: 3300,
      behavior: 'smooth',
    });
  }, 200);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
