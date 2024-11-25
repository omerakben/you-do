import { deleteTodo, updateTodo, getSingleTodo } from '../api/todoAPI';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import triggerConfetti from '../utils/confetti';

const domEvents = (user) => {
  document.querySelector('#app').addEventListener('click', (e) => {
    // Edit Todo - Optimized handler
    if (e.target.closest('[data-edit-id]')) {
      e.preventDefault();
      const editButton = e.target.closest('[data-edit-id]');
      const formContainer = document.querySelector('#form-container');
      formContainer.innerHTML = '';
      formContainer.classList.add('active');
      const todoId = editButton.dataset.editId;
      getSingleTodo(todoId).then((todoObj) => {
        TodoForm(user, todoObj);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      });
    }

    // Delete Todo - Optimized handler
    if (e.target.closest('[data-delete-id]')) {
      e.preventDefault();
      const deleteButton = e.target.closest('[data-delete-id]');
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this todo?')) {
        deleteTodo(deleteButton.dataset.deleteId).then(() => {
          TodoList(user);
        });
      }
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
            if (newStatus === 'Done' && oldStatus !== 'Done') {
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
      if (formContainer.classList.contains('active')) {
        formContainer.classList.remove('active');
        setTimeout(() => {
          formContainer.innerHTML = '';
        }, 300); // Match transition duration
      } else {
        formContainer.classList.add('active');
        TodoForm(user);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  });
};

export default domEvents;
