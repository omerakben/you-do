import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { debounce } from '../utils/searchUtils';

const navEvents = (user) => {
  // ALL TODOS
  document.querySelector('#all-todos').addEventListener('click', () => {
    document.querySelector('#form-container').innerHTML = '';
    document.querySelector('#search-input').value = '';
    TodoList(user);
  });

  // STATUS FILTERS (including Blocked)
  document.querySelectorAll('[data-status]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelector('#form-container').innerHTML = '';
      const { status } = e.currentTarget.dataset;
      TodoList(user, status);
    });
  });

  // CREATE TODO
  document.querySelector('#create-todo').addEventListener('click', () => {
    const formContainer = document.querySelector('#form-container');
    formContainer.classList.add('active');
    TodoForm(user);
  });

  // Add search handler with debouncing
  const handleSearch = debounce((searchTerm) => {
    document.querySelector('#form-container').innerHTML = '';
    TodoList(user, null, searchTerm);
  }, 300);

  // Search event listener
  document.querySelector('#search-input').addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });
};

export default navEvents;
