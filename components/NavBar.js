import { signIn, signOut } from '../utils/auth';
import * as svgIcons from '../src/assets/svg';

// Renders navigation bar component with user authentication state
const NavBar = (user) => {
  // Create navigation HTML string with conditional rendering based on user auth status
  const domString = `
    <nav class="navbar navbar-expand-xxl navbar-dark fixed-top" role="navigation" style="background: #181b34 !important;">
      <div class="container-fluid">
        <a class="navbar-brand text-white d-flex align-items-center" href="#" aria-label="To-Do App Home">
          <i class="fas fa-tasks" aria-hidden="true"></i>
          <span class="ms-3">To-Do</span>
        </a>
        ${user ? `
        <div class="d-flex align-items-center">
          <button class="navbar-toggler ms-0" type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" 
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation menu">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarContent" role="menu">
          <div class="navbar-nav flex-column flex-xxl-row w-100 align-items-start align-items-xxl-center">
            <div class="btn-group flex-column flex-xxl-row my-2 my-xxl-0" role="group" aria-label="Todo filters">
              <button class="btn btn-outline-light d-flex align-items-center gap-2" id="all-todos" role="menuitem">
                <i class="fas fa-list" aria-hidden="true"></i> All To-Dos
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="ReadyToStart" role="menuitem">
                <img src="${svgIcons.ready}" class="status-icon" alt="" aria-hidden="true" style="filter: invert(1);" />
                Ready To Start
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="InProgress" role="menuitem">
                <img src="${svgIcons.inProgress}" class="status-icon" alt="" aria-hidden="true" style="filter: invert(1);" />
                In Progress
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="Blocked" role="menuitem">
                <img src="${svgIcons.blocked}" class="status-icon" alt="" aria-hidden="true" style="filter: invert(1);" />
                Blocked
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="Done" role="menuitem">
                <img src="${svgIcons.done}" class="status-icon" alt="" aria-hidden="true" style="filter: invert(1);" />
                Done
              </button>
            </div>
            <button class="btn btn-success d-flex align-items-center justify-content-center gap-3 px-4 ms-xxl-auto" 
              id="create-todo" 
              style="min-width: 150px;"
              role="menuitem"
              aria-label="Create new todo">
              <i class="fas fa-plus" aria-hidden="true"></i> Add To-Do
            </button>
            <div class="mt-2 mt-xxl-0 ms-xxl-3">
              <button class="btn btn-danger" id="google-auth" role="menuitem">
                <i class="fas fa-sign-out-alt" aria-hidden="true"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
        <div class="navbar-backdrop"></div>
        ` : `
        <div class="w-100 d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 70px);">
          <button class="btn btn-primary btn-lg px-5 py-3" id="google-auth">
            <i class="fas fa-sign-in-alt me-2" aria-hidden="true"></i> Sign In with Google
          </button>
        </div>
        `}
      </div>
    </nav>
  `;

  // Insert navigation HTML into DOM
  document.querySelector('#navigation').innerHTML = domString;

  // Add click handler for authentication button
  document.querySelector('#google-auth').addEventListener('click', () => {
    if (user) {
      signOut();
    } else {
      signIn();
    }
  });

  // Setup mobile navigation functionality for authenticated users
  if (user) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggleButton = document.querySelector('.navbar-toggler');
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Toggle mobile sidebar visibility with animation handling
    const toggleSidebar = (show, immediate = false) => {
      if (isTransitioning && !immediate) return;
      isTransitioning = true;
      document.body.style.overflow = show ? 'hidden' : '';
      if (show) {
        navbar.classList.add('show');
        document.body.classList.add('sidebar-open');
        toggleButton.setAttribute('aria-expanded', 'true');
      } else {
        navbar.classList.remove('show');
        document.body.classList.remove('sidebar-open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    };

    // Handle hamburger menu button click
    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar(!navbar.classList.contains('show'));
    });

    // Track touch start position for swipe detection
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    // Handle swipe gestures for mobile sidebar
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (window.innerWidth < 1400) {
        if (swipeDistance > 50 && touchStartX < 30) {
          toggleSidebar(true);
        } else if (swipeDistance < -50 && navbar.classList.contains('show')) {
          toggleSidebar(false);
        }
      }
    }, { passive: true });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !toggleButton.contains(e.target) && navbar.classList.contains('show') && window.innerWidth < 1400) {
        toggleSidebar(false);
      }
    });

    // Close sidebar when clicking any button in mobile view
    navbar.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        if (window.innerWidth < 1400) {
          toggleSidebar(false);
        }
      });
    });

    // Handle window resize to properly display navigation
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 1400) {
          toggleSidebar(false, true);
        }
      }, 250);
    });

    // Close sidebar on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('show')) {
        toggleSidebar(false);
      }
    });
  }
};

export default NavBar;
