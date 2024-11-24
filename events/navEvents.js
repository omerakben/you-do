import { getTodos } from '../api/todoAPI';
import renderToDOM from '../utils/renderToDom';
import TodoCard from '../components/TodoCard';

const filterAndRenderTodos = (todos, searchTerm = '', filter = 'all', status = null) => {
  // Sort todos by priority (high -> medium -> low)
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  let filteredTodos = [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Apply status filter if specified
  if (status) {
    filteredTodos = filteredTodos.filter((todo) => todo.status === status);
  } else if (filter === 'active') {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);
  }

  // Apply search filter if there's a search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(searchLower) || todo.description.toLowerCase().includes(searchLower));
  }

  // Render filtered todos
  let cards = '';
  if (filteredTodos.length) {
    filteredTodos.forEach((todo) => {
      cards += TodoCard(todo);
    });
  } else {
    cards = '<h3 class="text-center">No Todos Found</h3>';
  }

  renderToDOM('#todo-cards', cards);
};

const navEvents = (user) => {
  // Search functionality
  let searchTimeout;
  document.querySelector('.search-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  document.querySelector('#search-input').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value;
      const activeButton = document.querySelector('.btn-group .active');
      const status = activeButton ? activeButton.dataset.status : null;

      getTodos(user.uid).then((todos) => {
        filterAndRenderTodos(todos, searchTerm, 'all', status);
      });
    }, 300);
  });

  // Filter buttons
  document.querySelector('.btn-group').addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    // Update active button
    document.querySelectorAll('.btn-group .btn').forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    const searchTerm = document.querySelector('#search-input').value;
    const { status } = button.dataset;

    getTodos(user.uid).then((todos) => {
      filterAndRenderTodos(todos, searchTerm, 'all', status);
    });
  });
};

export default navEvents;
