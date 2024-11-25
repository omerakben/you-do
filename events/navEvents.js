import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

const navEvents = (user) => {
  const formContainer = document.querySelector('#form-container');

  // Optimized event handler for all todos
  document.querySelector('#all-todos').addEventListener('click', () => {
    formContainer.innerHTML = '';
    formContainer.classList.remove('active');
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
      searchInput.value = '';
    }
    TodoList(user);
  });

  // Optimized status filter handling
  const handleStatusFilter = (e) => {
    formContainer.innerHTML = '';
    formContainer.classList.remove('active');
    const { status } = e.currentTarget.dataset;
    TodoList(user, status);
  };

  // Add event listeners to all status filter buttons
  document.querySelectorAll('[data-status]').forEach((btn) => {
    btn.addEventListener('click', handleStatusFilter);
  });

  // Optimized create todo handling
  document.querySelector('#create-todo').addEventListener('click', () => {
    formContainer.classList.add('active');
    TodoForm(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Search functionality is now handled directly in TodoList component
  // We only need to handle the initial page load search if needed
  const initialSearchInput = document.querySelector('#search-input');
  if (initialSearchInput && initialSearchInput.value) {
    TodoList(user, null, initialSearchInput.value.trim());
  }
};

export default navEvents;
