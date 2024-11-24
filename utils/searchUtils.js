// Debounce function to limit API calls
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Search function that filters todos based on search term
const searchTodos = (todos, searchTerm) => {
  if (!searchTerm.trim()) return todos;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return todos.filter((todo) => todo.title.toLowerCase().includes(lowerSearchTerm) || todo.description.toLowerCase().includes(lowerSearchTerm));
};

export { debounce, searchTodos };
