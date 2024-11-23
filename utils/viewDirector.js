import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/loginButton';
import logoutButton from '../components/logoutButton';
import client from './client';
import TodoList from '../components/TodoList';
import domEvents from '../events/domEvents';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in do something...
      logoutButton();
      TodoList(user);
      domEvents(user); // Initialize event listeners
    } else {
      // person is NOT logged in
      loginButton();
      document.querySelector('#form-container').innerHTML = '';
      document.querySelector('#todo-container').innerHTML = '';
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
