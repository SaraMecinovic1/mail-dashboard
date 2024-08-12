
import ReactDOM from 'react-dom/client'; // Importuj createRoot iz 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Ako imaš CSS fajlove

const root = ReactDOM.createRoot(document.getElementById('root')); // Kreiraj root koristeći createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
