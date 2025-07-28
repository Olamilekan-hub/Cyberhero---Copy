import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "../src/redux/store";
import { Provider } from "react-redux";

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          background: 'linear-gradient(135deg, #1a4480, #16caca)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>🌍 Mission G.A.I.A.</h1>
          <p>Something went wrong. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#16caca',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hide loading screen function
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    document.body.classList.add('loaded');
    // Remove loading screen after animation
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }, 500);
  }
};

// App wrapper with error handling
const AppWrapper = () => {
  React.useEffect(() => {
    // Hide loading screen once React loads
    hideLoadingScreen();
    
    // Handle audio context errors
    window.addEventListener('error', (e) => {
      if (e.message.includes('AudioContext') || e.message.includes('audio')) {
        console.warn('Audio error caught and handled:', e.message);
        e.preventDefault();
      }
    });
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  );
};

// Render the app
try {
  ReactDOM.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>,
    document.getElementById("root")
  );
} catch (error) {
  console.error('Failed to render React app:', error);
  
  // Fallback if React fails completely
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="
        padding: 20px;
        text-align: center;
        color: white;
        background: linear-gradient(135deg, #1a4480, #16caca);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      ">
        <h1>🌍 Mission G.A.I.A.</h1>
        <p>Loading environmental education platform...</p>
        <p><a href="/" style="color: #16caca;">Refresh to try again</a></p>
      </div>
    `;
  }
  
  hideLoadingScreen();
}

// Performance monitoring
reportWebVitals();