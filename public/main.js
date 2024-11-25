// Import Bootstrap JS and Popper.js (required for Bootstrap)
import '@popperjs/core';
import 'bootstrap';

// Import styles in correct order
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/main.scss';

// Import Components
import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';

// Initialize App
const init = () => {
  document.querySelector('#app').innerHTML = `
    <div id="navigation"></div>
    <div id="main-container">
      <div id="form-container"></div>
      <div id="todo-container"></div>
    </div>
  `;

  ViewDirectorBasedOnUserAuthStatus();
};

init();
