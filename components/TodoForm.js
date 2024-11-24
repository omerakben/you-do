import { createTodo, updateTodo } from '../api/todoAPI';
import TodoList from './TodoList';

const TodoForm = (user, obj = {}) => {
  const domString = `
    <form id="${obj.firebaseKey ? `update-todo--${obj.firebaseKey}` : 'submit-todo'}" class="todo-form">
      <div class="form-group mb-3">
        <label for="title" class="form-label">To-Do Title</label>
        <input type="text" class="form-control" id="title" placeholder="Enter To-Do" value="${obj.title || ''}" required>
      </div>
      <div class="form-group mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3" required>${obj.description || ''}</textarea>
      </div>
      <div class="form-group mb-3">
        <label for="priority" class="form-label">Priority</label>
        <select class="form-control" id="priority" required>
          <option value="critical" ${obj.priority === 'critical' ? 'selected' : ''}>Critical</option>
          <option value="high" ${obj.priority === 'high' ? 'selected' : ''}>High</option>
          <option value="medium" ${obj.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="low" ${obj.priority === 'low' ? 'selected' : ''}>Low</option>
          <option value="trivial" ${obj.priority === 'trivial' ? 'selected' : ''}>Trivial</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="status" class="form-label">Status</label>
        <select class="form-control" id="status" required>
          <option value="Ready" ${obj.status === 'Ready' ? 'selected' : ''}>Ready</option>
          <option value="InProgress" ${obj.status === 'InProgress' ? 'selected' : ''}>In Progress</option>
          <option value="Blocked" ${obj.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">
        ${obj.firebaseKey ? 'Update' : 'Submit'}
      </button>
    </form>
  `;

  document.querySelector('#form-container').innerHTML = domString;

  // Form Submit Handler
  document.querySelector(`#${obj.firebaseKey ? `update-todo--${obj.firebaseKey}` : 'submit-todo'}`).addEventListener('submit', (e) => {
    e.preventDefault();

    const todoObj = {
      title: document.querySelector('#title').value,
      description: document.querySelector('#description').value,
      priority: document.querySelector('#priority').value,
      status: document.querySelector('#status').value,
      uid: user.uid,
      createdAt: obj.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (obj.firebaseKey) {
      updateTodo({ ...todoObj, firebaseKey: obj.firebaseKey })
        .then(() => {
          document.querySelector('#form-container').classList.remove('active');
          document.querySelector('#form-container').innerHTML = '';
          TodoList(user);
        });
    } else {
      createTodo(todoObj).then(() => {
        document.querySelector('#form-container').classList.remove('active');
        document.querySelector('#form-container').innerHTML = '';
        TodoList(user);
      });
    }
  });
};

export default TodoForm;
