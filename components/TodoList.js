import { getTodos } from '../api/todoAPI';
import TodoCard from './TodoCard';
import renderToDOM from '../utils/renderToDom';
import { searchTodos, debounce } from '../utils/searchUtils';

const TodoList = async (user, filter = null, searchTerm = '') => {
  // Store current scroll position
  const scrollPosition = window.scrollY;

  const domString = `
    <div class="todo-container">
      <div class="list-header mb-4">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2 class="mb-0">My Todo List</h2>
          <form class="d-flex header-search-form" role="search" onsubmit="return false;">
            <input 
              class="form-control"
              id="search-input"
              type="search" 
              placeholder="Search todos..." 
              aria-label="Search"
              value="${searchTerm}"
              autocomplete="off"
            >
            ${searchTerm ? `
            ` : ''}
          </form>
        </div>
        ${searchTerm ? `
          <div class="search-status mt-2">
            Showing results for: "${searchTerm}"
          </div>
        ` : ''}
      </div>
      <div id="todo-cards" class="row g-4"></div>
    </div>
  `;

  renderToDOM('#todo-container', domString);

  // Reattach search event listeners
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    // Focus the search input if there's a search term
    if (searchTerm) {
      searchInput.focus();
      // Prevent cursor from moving to start
      const inputLength = searchInput.value.length;
      searchInput.setSelectionRange(inputLength, inputLength);
    }

    // Add debounced search handler
    const handleSearch = debounce((value) => {
      const currentScroll = window.scrollY;
      // Don't trim the value here to preserve spaces
      TodoList(user, filter, value).then(() => {
        // Restore scroll position after search
        window.scrollTo(0, currentScroll);
      });
    }, 300);

    // Add input event listener
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    // Prevent form submission
    searchInput.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // Clear search button functionality
    const clearButton = document.querySelector('.clear-search');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        TodoList(user, filter, '');
      });
    }
  }

  try {
    const todos = await getTodos(user.uid);
    const priorityOrder = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
      trivial: 4,
    };
    const statusOrder = {
      InProgress: 0,
      ReadyToStart: 1,
      Blocked: 2,
      Done: 3,
    };

    // Apply filters and sort
    const filteredAndSortedTodos = todos
      .filter((todo) => {
        if (searchTerm) {
          // Use the searchTerm without trimming to preserve spaces
          return searchTodos([todo], searchTerm).length > 0;
        }
        return filter ? todo.status === filter : true;
      })
      .sort((a, b) => {
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];
        return statusDiff || priorityOrder[a.priority] - priorityOrder[b.priority];
      });

    // Render todos or no results message
    const content = filteredAndSortedTodos.length
      ? filteredAndSortedTodos.map(TodoCard).join('')
      : `<h3 class="text-center col-12">${searchTerm ? 'No matching to-do found' : 'No to-do found'}</h3>`;

    renderToDOM('#todo-cards', content);

    // Restore scroll position after rendering
    window.scrollTo(0, scrollPosition);
  } catch (error) {
    console.error('Error loading to-dos:', error);
    renderToDOM('#todo-cards', '<h3 class="text-center text-danger">Error loading to-dos</h3>');
  }
};

export default TodoList;
