const TodoCard = (todoObj) => {
  const getStatusClass = (status) => {
    const classes = {
      Ready: {
        text: 'text-primary',
        border: 'border-primary'
      },
      InProgress: {
        text: 'text-warning',
        border: 'border-warning'
      },
      Done: {
        text: 'text-success',
        border: 'border-success'
      },
      Blocked: {
        text: 'text-danger',
        border: 'border-danger'
      }
    };
    return classes[status] || { text: 'text-primary', border: 'border-primary' };
  };

  const getPriorityIndicator = (priority) => {
    const indicators = {
      critical: {
        icon: '<img src="/images/svg/critical.svg" class="priority-icon critical" alt="Critical Priority" />',
        class: 'priority-critical'
      },
      high: {
        icon: '<img src="/images/svg/high.svg" class="priority-icon high" alt="High Priority" />',
        class: 'priority-high'
      },
      medium: {
        icon: '<img src="/images/svg/medium.svg" class="priority-icon medium" alt="Medium Priority" />',
        class: 'priority-medium'
      },
      low: {
        icon: '<img src="/images/svg/low.svg" class="priority-icon low" alt="Low Priority" />',
        class: 'priority-low'
      },
      trivial: {
        icon: '<img src="/images/svg/trivial.svg" class="priority-icon trivial" alt="Trivial Priority" />',
        class: 'priority-trivial'
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
              <div class="priority-wrapper ms-2 ${priorityIndicator.class}">
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
                <option value="Ready" ${todoObj.status === 'Ready' ? 'selected' : ''}>
                  <img src="/images/svg/ready.svg" class="status-icon" alt="Ready" width="16" height="16" />
                  Ready
                </option>
                <option value="InProgress" ${todoObj.status === 'InProgress' ? 'selected' : ''}>
                  <img src="/images/svg/inProgress.svg" class="status-icon" alt="InProgress" width="16" height="16" />
                  In Progress
                </option>
                <option value="Blocked" ${todoObj.status === 'Blocked' ? 'selected' : ''}>
                  <img src="/images/svg/blocked.svg" class="status-icon" alt="Blocked" width="16" height="16" />
                  Blocked
                </option>
                <option value="Done" ${todoObj.status === 'Done' ? 'selected' : ''}>
                  <img src="/images/svg/done.svg" class="status-icon" alt="Done" width="16" height="16" />
                  Done
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
