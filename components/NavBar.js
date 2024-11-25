import { signIn, signOut } from '../utils/auth';

const NavBar = (user) => {
  const domString = `
    <nav class="navbar navbar-expand-xxl navbar-dark bg-dark fixed-top" role="navigation">
      <div class="container-fluid">
        <!-- Navbar Brand and Hamburger -->
        <div class="d-flex align-items-center">
          <a class="navbar-brand" href="#" aria-label="To-Do App Home">
            <i class="fas fa-tasks" aria-hidden="true"></i> To-Do App
          </a>
          ${user ? `
            <button class="navbar-toggler ms-3 d-xxl-none" type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarContent" 
              aria-controls="navbarContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation menu">
              <span class="navbar-toggler-icon"></span>
            </button>
          ` : ''}
        </div>

        ${user ? `
        <!-- Collapsible Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent" role="menu">
          <div class="navbar-nav flex-column flex-xxl-row w-100 align-items-start align-items-xxl-center">
            <!-- Filter Buttons -->
            <div class="btn-group flex-column flex-xxl-row my-2 my-xxl-0" role="group" aria-label="Todo filters">
              <button class="btn btn-outline-light d-flex align-items-center gap-2" id="all-todos" role="menuitem">
                <i class="fas fa-list" aria-hidden="true"></i> All To-Dos
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="ReadyToStart" role="menuitem">
                <img src="/images/svg/ready.svg" class="status-icon" alt="" aria-hidden="true" />
                Ready To Start
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="InProgress" role="menuitem">
                <img src="/images/svg/inProgress.svg" class="status-icon" alt="" aria-hidden="true" />
                In Progress
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="Blocked" role="menuitem">
                <img src="/images/svg/blocked.svg" class="status-icon" alt="" aria-hidden="true" />
                Blocked
              </button>
              <button class="btn btn-outline-light d-flex align-items-center gap-2" data-status="Done" role="menuitem">
                <img src="/images/svg/done.svg" class="status-icon" alt="" aria-hidden="true" />
                Done
              </button>
            </div>
            
            <!-- Add To-Do Button -->
            <button class="btn btn-success d-flex align-items-center justify-content-center gap-3 px-4" 
              id="create-todo" 
              style="min-width: 150px;"
              role="menuitem"
              aria-label="Create new todo">
              <i class="fas fa-plus" aria-hidden="true"></i> Add To-Do
            </button>

            <!-- Sign Out Button -->
            <div class="mt-2 mt-xxl-0 ms-xxl-3">
              <button class="btn btn-danger" id="google-auth" role="menuitem">
                <i class="fas fa-sign-out-alt" aria-hidden="true"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
        <div class="navbar-backdrop"></div>
        ` : `
        <!-- Sign In Button -->
        <button class="btn btn-primary ms-auto" id="google-auth">
          <i class="fas fa-sign-in-alt" aria-hidden="true"></i> Sign In with Google
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

  // Update the sidebar toggle functionality
  if (user) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggleButton = document.querySelector('.navbar-toggler');
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

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

      // Reset transitioning flag after animation completes
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    };

    // Handle sidebar toggle button click
    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar(!navbar.classList.contains('show'));
    });

    // Touch events for swipe
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;

      if (window.innerWidth < 1400) {
        // Swipe right to open
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

    // Close sidebar when clicking on a nav item
    navbar.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        if (window.innerWidth < 1400) {
          toggleSidebar(false);
        }
      });
    });

    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 1400) {
          toggleSidebar(false, true);
        }
      }, 250);
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('show')) {
        toggleSidebar(false);
      }
    });
  }
};

export default NavBar;
