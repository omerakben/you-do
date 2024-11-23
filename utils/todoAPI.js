import firebase from 'firebase/app';
import 'firebase/database';

const endpoint = process.env.APP_DATABASE_URL;

// GET ALL TODOS
const getTodos = (uid) => new Promise((resolve, reject) => {
  firebase.database().ref('todos')
    .orderByChild('uid')
    .equalTo(uid)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        resolve(Object.values(snapshot.val()));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE TODO
const createTodo = (todoObj) => new Promise((resolve, reject) => {
  firebase.database().ref('todos').push(todoObj)
    .then((response) => {
      const payload = { firebaseKey: response.key, ...todoObj };
      firebase.database().ref(`todos/${response.key}`).update(payload)
        .then(() => resolve(payload));
    })
    .catch(reject);
});

// UPDATE TODO
const updateTodo = (todoObj) => new Promise((resolve, reject) => {
  firebase.database().ref(`todos/${todoObj.firebaseKey}`).update(todoObj)
    .then(resolve)
    .catch(reject);
});

// DELETE TODO
const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  firebase.database().ref(`todos/${firebaseKey}`).remove()
    .then(resolve)
    .catch(reject);
});

// GET SINGLE TODO
const getSingleTodo = (firebaseKey) => new Promise((resolve, reject) => {
  firebase.database().ref(`todos/${firebaseKey}`).once('value')
    .then((snapshot) => resolve(snapshot.val()))
    .catch(reject);
});

export {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getSingleTodo,
}; 