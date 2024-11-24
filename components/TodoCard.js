const TodoCard = (todoObj) => {
  const getStatusClass = (status) => {
    const classes = {
      'Ready to Start': {
        text: 'text-primary',
        border: 'border-primary'
      },
      'In Progress': {
        text: 'text-warning',
        border: 'border-warning'
      },
      Done: {
        text: 'text-success',
        border: 'border-success'
      }
    };
    return classes[status] || { text: 'text-primary', border: 'border-primary' };
  };

  const getPriorityIndicator = (priority) => {
    const indicators = {
      high: {
        icon: `<div class="priority-indicator">
                <div class="priority-arrow">🔺</div>
                <div class="priority-arrow">🔺</div>
                <div class="priority-arrow">🔺</div>
              </div>`,
      },
      medium: {
        icon: `<div class="priority-indicator">
                <div class="priority-arrow">🔺</div>
                <div class="priority-arrow">🔺</div>
              </div>`,
      },
      low: {
        icon: `<div class="priority-indicator">
                <div class="priority-arrow">🔺</div>
              </div>`,
      }
    };
    return indicators[priority] || indicators.low;
  };

  const statusClasses = getStatusClass(todoObj.status);
  const priorityIndicator = getPriorityIndicator(todoObj.priority);

  const domString = `
    <div class="col">
      <div class="card h-100 shadow-sm border-4 ${statusClasses.border}">
        <div class="card-body d-flex flex-column">
          <div class="card-header-section mb-3">
            <div class="d-flex justify-content-between align-items-start">
              <h5 class="card-title text-truncate mb-0 flex-grow-1">
                ${todoObj.title}
              </h5>
              <div class="priority-wrapper ms-2">
                ${priorityIndicator.icon}
              </div>
            </div>
          </div>
          
          <div class="card-description flex-grow-1 mb-3">
            <p class="card-text">${todoObj.description}</p>
          </div>

          <div class="card-actions mt-auto">
            <div class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-2">
              <select 
                class="form-select form-select-sm status-select ${statusClasses.text}"
                data-todo-id="${todoObj.firebaseKey}"
                data-status-select
              >
                <option value="Ready to Start" ${todoObj.status === 'Ready to Start' ? 'selected' : ''}>
                  🔵 Ready to Start
                </option>
                <option value="In Progress" ${todoObj.status === 'In Progress' ? 'selected' : ''}>
                  🟡 In Progress
                </option>
                <option value="Done" ${todoObj.status === 'Done' ? 'selected' : ''}>
                  🟢 Done
                </option>
              </select>
              <div class="d-flex gap-2 justify-content-center">
                <button class="btn btn-link text-success-emphasis p-2" data-edit-id="${todoObj.firebaseKey}">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-link text-danger p-2" data-delete-id="${todoObj.firebaseKey}">
                  <i class="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return domString;
};

export default TodoCard;
