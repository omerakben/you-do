import { deleteTodo, updateTodo, getSingleTodo } from '../api/todoAPI';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const domEvents = (user) => {
  document.querySelector('#app').addEventListener('click', (e) => {
    // Delete Todo
    if (e.target.dataset.deleteId) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure?')) {
        deleteTodo(e.target.dataset.deleteId).then(() => {
          TodoList(user);
        });
      }
    }

    // Edit Todo
    if (e.target.dataset.editId) {
      getSingleTodo(e.target.dataset.editId).then((todoObj) => {
        TodoForm(user, todoObj);
      });
    }

    // Toggle Complete
    if (e.target.dataset.todoId) {
      getSingleTodo(e.target.dataset.todoId).then((todoObj) => {
        updateTodo({ ...todoObj, completed: !todoObj.completed })
          .then(() => TodoList(user));
      });
    }

    // Add New Todo Button
    if (e.target.id === 'add-todo-btn') {
      TodoForm(user);
    }
  });
};

export default domEvents;
