import { createTodo, updateTodo } from '../api/todoAPI';
import TodoList from './TodoList';
import triggerConfetti from '../utils/confetti';

const TodoForm = (user, obj = {}) => {
  const formId = obj.firebaseKey ? `update-todo--${obj.firebaseKey}` : 'submit-todo';

  const domString = `
    <form id="${formId}" class="todo-form">
      <div class="form-group mb-3">
        <label for="title" class="form-label">To-Do Title</label>
        <input 
          type="text" 
          class="form-control" 
          id="title" 
          placeholder="Enter To-Do" 
          value="${obj.title || ''}" 
          required
          autocomplete="off"
        >
      </div>
      <div class="form-group mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea 
          class="form-control" 
          id="description"
          placeholder="Enter Description" 
          rows="3" 
          required
        >${obj.description || ''}</textarea>
      </div>
      <div class="form-group mb-3">
        <label for="priority" class="form-label d-flex justify-content-between align-items-center">
          Priority
          <small class="text-muted"><i class="fas fa-chevron-down"></i></small>
        </label>
        <select class="form-control" id="priority" required>
          <option value="" disabled ${!obj.priority ? 'selected' : ''}>Choose priority level...</option>
          <option value="critical" ${obj.priority === 'critical' ? 'selected' : ''}>Critical</option>
          <option value="high" ${obj.priority === 'high' ? 'selected' : ''}>High</option>
          <option value="medium" ${obj.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="low" ${obj.priority === 'low' ? 'selected' : ''}>Low</option>
          <option value="trivial" ${obj.priority === 'trivial' ? 'selected' : ''}>Trivial</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="status" class="form-label d-flex justify-content-between align-items-center">
          Status
          <small class="text-muted"><i class="fas fa-chevron-down"></i></small>
        </label>
        <select class="form-control" id="status" required>
          <option value="" disabled ${!obj.status ? 'selected' : ''}>Choose status...</option>
          <option value="ReadyToStart" ${obj.status === 'ReadyToStart' ? 'selected' : ''}>Ready To Start</option>
          <option value="InProgress" ${obj.status === 'InProgress' ? 'selected' : ''}>In Progress</option>
          <option value="Blocked" ${obj.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
        </select>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-primary">
          ${obj.firebaseKey ? 'Update' : 'Submit'}
        </button>
        <button type="button" class="btn btn-light" id="cancel-form">
          Cancel
        </button>
      </div>
    </form>
  `;

  const formContainer = document.querySelector('#form-container');
  formContainer.innerHTML = domString;

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const todoObj = {
      title: document.querySelector('#title').value.trim(),
      description: document.querySelector('#description').value.trim(),
      priority: document.querySelector('#priority').value,
      status: document.querySelector('#status').value,
      uid: user.uid,
      createdAt: obj.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const closeForm = () => {
      formContainer.classList.remove('active');
      setTimeout(() => {
        formContainer.innerHTML = '';
        TodoList(user);
      }, 300);
    };

    if (obj.firebaseKey) {
      updateTodo({ ...todoObj, firebaseKey: obj.firebaseKey })
        .then(closeForm)
        .catch((error) => {
          console.error('Error updating todo:', error);
          // You could add error handling UI here
        });
    } else {
      createTodo(todoObj)
        .then(() => {
          triggerConfetti();
          closeForm();
        })
        .catch((error) => {
          console.error('Error creating todo:', error);
          // You could add error handling UI here
        });
    }
  };

  document.querySelector(`#${formId}`).addEventListener('submit', handleFormSubmit);

  // Add event listener for cancel button
  document.querySelector('#cancel-form').addEventListener('click', () => {
    formContainer.classList.remove('active');
    setTimeout(() => {
      formContainer.innerHTML = '';
    }, 300); // Match transition duration
  });
};

export default TodoForm;
