import { signIn, signOut } from '../utils/auth';

const NavBar = (user) => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- Navbar Brand -->
        <a class="navbar-brand" href="#">
          <i class="fas fa-tasks"></i> To-Do App
        </a>

        ${user ? `
        <!-- Navbar Content -->
        <div class="d-flex align-items-center flex-grow-1">
          <!-- Search Form -->
          <form class="d-flex mx-auto search-form" style="width: 40%;" role="search">
            <input 
              class="form-control me-2" 
              id="search-input"
              type="search" 
              placeholder="Search todos..." 
              aria-label="Search"
            >
          </form>

          <!-- Filter Buttons -->
          <div class="btn-group mx-2" role="group">
            <button class="btn btn-outline-light" data-filter="all">All</button>
            <button class="btn btn-outline-light" data-status="Ready to Start">🔵 Ready</button>
            <button class="btn btn-outline-light" data-status="In Progress">🟡 In Progress</button>
            <button class="btn btn-outline-light" data-status="Done">🟢 Done</button>
          </div>

          <!-- Add Todo Button -->
          <button class="btn btn-success me-2" id="add-todo-btn">
            <i class="fas fa-plus"></i> Add Todo
          </button>

          <!-- Logout Button -->
          <button class="btn btn-danger" id="google-auth">
            <i class="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
        ` : `
        <!-- Sign In Button -->
        <button class="btn btn-primary ms-auto" id="google-auth">
          <i class="fas fa-sign-in-alt"></i> Sign In with Google
        </button>
        `}
      </div>
    </nav>
  `;

  document.querySelector('#navigation').innerHTML = domString;

  // Add event listener for auth button
  document.querySelector('#google-auth').addEventListener('click', () => {
    if (user) {
      signOut();
    } else {
      signIn();
    }
  });
};

export default NavBar;
