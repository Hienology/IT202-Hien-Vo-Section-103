import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <span class="navbar-brand">
          <i class="bi bi-shop"></i> OFFICE SUPPLIES STORE
        </span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="https://www.linkedin.com/in/hien-vo-minh-28b553327/" target="_blank" rel="noopener noreferrer">
                <img class="align-middle" src="https://uploads.onecompiler.io/43m3nvgh8/43m3qv6kd/3536505.png" alt="LinkedIn" style="max-width:10%" align="right">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-dark text-white text-center py-4 mt-5">
      <div class="container">
        <p class="mb-0">&copy; 2025 Office Supplies Store. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Office Supplies Store';
}
