import { getTodos } from '../api/todoAPI';
import TodoCard from './TodoCard';
import renderToDOM from '../utils/renderToDom';

const TodoList = async (user) => {
  const domString = `
    <div class="todo-container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>My Todo List</h2>
      </div>
      <div id="todo-cards" class="row row-cols-1 row-cols-md-3 g-4"></div>
    </div>
  `;

  renderToDOM('#todo-container', domString);

  try {
    const todos = await getTodos(user.uid);
    let cards = '';

    if (todos.length) {
      // Sort todos by priority (high -> medium -> low)
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      const sortedTodos = todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      sortedTodos.forEach((todo) => {
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
