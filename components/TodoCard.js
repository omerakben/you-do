const TodoCard = (todoObj) => {
  const getPriorityClass = (priority) => {
    const classes = {
      high: 'bg-danger',
      medium: 'bg-warning',
      low: 'bg-info'
    };
    return classes[priority] || 'bg-info';
  };

  const domString = `
    <div class="card m-2">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-between">
          ${todoObj.title}
          <span class="badge ${getPriorityClass(todoObj.priority)}">
            ${todoObj.priority}
          </span>
        </h5>
        <p class="card-text">${todoObj.description}</p>
        <div class="form-check mb-3">
          <input 
            class="form-check-input" 
            type="checkbox" 
            data-todo-id="${todoObj.firebaseKey}"
            ${todoObj.completed ? 'checked' : ''}
          >
          <label class="form-check-label ${todoObj.completed ? 'text-decoration-line-through' : ''}">
            Mark Complete
          </label>
        </div>
        <div class="btn-group" role="group">
          <button class="btn btn-outline-danger" data-delete-id="${todoObj.firebaseKey}">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
          <button class="btn btn-outline-info" data-edit-id="${todoObj.firebaseKey}">
            <i class="fas fa-edit"></i> Edit
          </button>
        </div>
      </div>
    </div>
  `;
  return domString;
};

export default TodoCard;
