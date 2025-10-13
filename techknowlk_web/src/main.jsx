import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({
  duration: 1000,
  once: true,
});

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
