import { deleteTodo, updateTodo, getSingleTodo } from '../api/todoAPI';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import triggerConfetti from '../utils/confetti';

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
      const formContainer = document.querySelector('#form-container');
      formContainer.classList.add('active');

      getSingleTodo(e.target.dataset.editId).then((todoObj) => {
        TodoForm(user, todoObj);
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  // Handle status change
  document.querySelector('#app').addEventListener('change', (e) => {
    if (e.target.hasAttribute('data-status-select')) {
      const { todoId } = e.target.dataset;
      const { value: newStatus } = e.target;

      getSingleTodo(todoId).then((todoObj) => {
        const oldStatus = todoObj.status;
        updateTodo({ ...todoObj, status: newStatus })
          .then(() => {
            // Trigger confetti only when status changes to "Done"
            if (newStatus === 'Done' && oldStatus !== 'Done') {
              // Small delay to ensure the UI updates first
              setTimeout(triggerConfetti, 100);
            }
            TodoList(user);
          });
      });
    }
  });

  // Add New Todo Button
  document.querySelector('#app').addEventListener('click', (e) => {
    if (e.target.id === 'add-todo-btn') {
      const formContainer = document.querySelector('#form-container');
      formContainer.classList.toggle('active');

      if (formContainer.classList.contains('active')) {
        TodoForm(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        formContainer.innerHTML = '';
      }
    }
  });
};

export default domEvents;
