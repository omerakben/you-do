import { createTodo, updateTodo } from '../api/todoAPI';
import TodoList from './TodoList';

const TodoForm = (user, obj = {}) => {
  const domString = `
    <form id="${obj.firebaseKey ? `update-todo--${obj.firebaseKey}` : 'submit-todo'}" class="mb-4">
      <div class="form-group">
        <label for="title">Todo Title</label>
        <input type="text" class="form-control" id="title" placeholder="Enter Todo" value="${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" rows="3" required>${obj.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label for="priority">Priority</label>
        <select class="form-control" id="priority" required>
          <option value="high" ${obj.priority === 'high' ? 'selected' : ''}>High</option>
          <option value="medium" ${obj.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="low" ${obj.priority === 'low' ? 'selected' : ''}>Low</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">
        ${obj.firebaseKey ? 'Update' : 'Submit'} Todo
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
      completed: obj.completed || false,
      uid: user.uid,
      createdAt: obj.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (obj.firebaseKey) {
      updateTodo({ ...todoObj, firebaseKey: obj.firebaseKey })
        .then(() => {
          TodoList(user);
        });
    } else {
      createTodo(todoObj).then(() => {
        TodoList(user);
      });
    }
  });
};

export default TodoForm;
