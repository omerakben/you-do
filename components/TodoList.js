import { getTodos } from '../api/todoAPI';
import TodoCard from './TodoCard';
import renderToDOM from '../utils/renderToDom';
import { searchTodos } from '../utils/searchUtils';

const TodoList = async (user, filter = null, searchTerm = '') => {
  const domString = `
    <div class="todo-container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <h2 class="mb-3 mb-md-0">My Todo List</h2>
        ${searchTerm ? `<div class="search-status">Showing results for: "${searchTerm}"</div>` : ''}
      </div>
      <div id="todo-cards" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4"></div>
    </div>
  `;

  renderToDOM('#todo-container', domString);

  try {
    const todos = await getTodos(user.uid);
    let filteredTodos = todos;

    // Apply search filter
    if (searchTerm) {
      filteredTodos = searchTodos(filteredTodos, searchTerm);
    }

    // Apply status filter
    if (filter === 'Ready' || filter === 'InProgress' || filter === 'Done' || filter === 'Blocked') {
      filteredTodos = filteredTodos.filter((todo) => todo.status === filter);
    }

    // Priority order: critical → high → medium → low → trivial
    const priorityOrder = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
      trivial: 4
    };

    // Status order: In Progress → Ready → Blocked → Done
    const statusOrder = {
      InProgress: 0,
      Ready: 1,
      Blocked: 2,
      Done: 3
    };

    const sortedTodos = filteredTodos.sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff === 0) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return statusDiff;
    });

    let cards = '';
    if (sortedTodos.length) {
      sortedTodos.forEach((todo) => {
        cards += TodoCard(todo);
      });
    } else {
      cards = `<h3 class="text-center">${searchTerm ? 'No matching todos found' : 'No Todos Found'}</h3>`;
    }

    renderToDOM('#todo-cards', cards);
  } catch (error) {
    console.error('Error loading todos:', error);
    renderToDOM('#todo-cards', '<h3 class="text-center text-danger">Error loading todos</h3>');
  }
};

export default TodoList;
