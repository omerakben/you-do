import { getTodos } from '../api/todoAPI';
import TodoCard from './TodoCard';
import renderToDOM from '../utils/renderToDom';

const TodoList = async (user) => {
  const domString = `
    <div class="todo-container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>My Todo List</h2>
        <button class="btn btn-success" id="add-todo-btn">
          <i class="fas fa-plus"></i> Add New Todo
        </button>
      </div>
      <div class="todo-filters mb-3">
        <div class="btn-group" role="group">
          <button class="btn btn-outline-primary" data-filter="all">All</button>
          <button class="btn btn-outline-primary" data-filter="active">Active</button>
          <button class="btn btn-outline-primary" data-filter="completed">Completed</button>
        </div>
      </div>
      <div id="todo-cards" class="row"></div>
    </div>
  `;

  renderToDOM('#todo-container', domString);

  try {
    const todos = await getTodos(user.uid);
    let cards = '';

    if (todos.length) {
      todos.forEach((todo) => {
        cards += TodoCard(todo);
      });
    } else {
      cards = '<h3 class="text-center">No Todos Found</h3>';
    }

    renderToDOM('#todo-cards', cards);
  } catch (error) {
    console.error('Error loading todos:', error);
    renderToDOM('#todo-cards', '<h3 class="text-center text-danger">Error loading todos</h3>');
  }
};

export default TodoList;
