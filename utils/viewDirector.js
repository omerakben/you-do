import firebase from 'firebase/app';
import 'firebase/auth';
import client from './client';
import TodoList from '../components/TodoList';
import domEvents from '../events/domEvents';
import NavBar from '../components/NavBar';
import navEvents from '../events/navEvents';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    // Always render navbar with current auth state
    NavBar(user);

    if (user) {
      // person is logged in
      TodoList(user);
      domEvents(user);
      navEvents(user);
    } else {
      // person is NOT logged in
      document.querySelector('#form-container').innerHTML = '';
      document.querySelector('#todo-container').innerHTML = '';
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
