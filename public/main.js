// USE WITH FIREBASE AUTH
import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

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
