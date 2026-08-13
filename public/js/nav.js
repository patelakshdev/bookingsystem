// public/js/nav.js
// Renders responsive mobile top header and sticky mobile bottom navigation bar.

function renderHeader(active) {
  const el = document.getElementById('site-header');
  if (!el) return;
  const user = Auth.getUser();
  const loggedIn = Auth.isLoggedIn();
  const isStaff = Auth.isStaff();

  const isHome = active === 'home';
  const isDoctors = active === 'doctors';
  const isDashboard = active === 'dashboard';
  const isReception = active === 'reception';

  el.innerHTML = `
    <!-- Top Mobile & Desktop Navigation Header -->
    <header class="bg-ink text-white sticky top-0 z-40 border-b border-white/10 backdrop-blur-md bg-ink/95">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 h-16 flex items-center justify-between">
        <a href="/index.html" class="flex items-center gap-2.5 shrink-0" aria-label="Doctor On Call home">
          <div class="w-9 h-9 rounded-xl bg-teal/20 border border-teal/40 flex items-center justify-center shadow-inner">
            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path d="M13 2 L13 24 M2 13 L24 13" stroke="#D97706" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="13" cy="13" r="10" stroke="#F4F7F6" stroke-width="1.5" opacity="0.4"/>
            </svg>
          </div>
          <span class="font-display text-lg tracking-tight font-semibold">Doctor <span class="text-brass font-normal">On Call</span></span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="/index.html" class="text-sm font-medium transition hover:text-brass ${isHome ? 'text-brass font-semibold' : 'text-white/80'}">Home</a>
          <a href="/doctors.html" class="text-sm font-medium transition hover:text-brass ${isDoctors ? 'text-brass font-semibold' : 'text-white/80'}">Find a Doctor</a>
          ${loggedIn && !isStaff ? `<a href="/dashboard.html" class="text-sm font-medium transition hover:text-brass ${isDashboard ? 'text-brass font-semibold' : 'text-white/80'}">My Appointments</a>` : ''}
          ${isStaff ? `<a href="/reception/index.html" class="text-sm font-medium transition hover:text-brass ${isReception ? 'text-brass font-semibold' : 'text-white/80'}">Reception Desk</a>` : `<a href="/reception/login.html" class="text-sm font-medium transition hover:text-brass ${isReception ? 'text-brass font-semibold' : 'text-white/80'}">Staff Portal</a>`}
        </nav>

        <!-- Right Header User Controls -->
        <div class="flex items-center gap-3">
          ${loggedIn
            ? `<div class="flex items-center gap-2">
                 <span class="hidden sm:inline text-xs font-mono text-white/70 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">${user?.name || 'User'}</span>
                 <button id="logout-btn" class="text-xs font-medium px-3.5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition active:scale-95">Sign out</button>
               </div>`
            : `<div class="flex items-center gap-2">
                 <a href="/login.html" class="text-xs font-medium px-3.5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition active:scale-95">Sign in</a>
                 <a href="/register.html" class="text-xs font-semibold px-4 py-2 rounded-full bg-brass text-ink hover:brightness-110 transition shadow-sm active:scale-95">Book Now</a>
               </div>`
          }
        </div>
      </div>
    </header>

    <!-- Sticky Mobile Bottom Navigation Bar (Visible on mobile screens) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-2 flex justify-around items-center">
      <a href="/index.html" class="nav-item flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-teal transition ${isHome ? 'active text-teal' : ''}">
        <svg class="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span>Home</span>
      </a>

      <a href="/doctors.html" class="nav-item flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-teal transition ${isDoctors ? 'active text-teal' : ''}">
        <svg class="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span>Doctors</span>
      </a>

      ${loggedIn && !isStaff ? `
        <a href="/dashboard.html" class="nav-item flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-teal transition ${isDashboard ? 'active text-teal' : ''}">
          <svg class="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>Appointments</span>
        </a>
      ` : ''}

      ${isStaff ? `
        <a href="/reception/index.html" class="nav-item flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-teal transition ${isReception ? 'active text-teal' : ''}">
          <svg class="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span>Desk</span>
        </a>
      ` : ''}

      <a href="${loggedIn ? (isStaff ? '/reception/index.html' : '/dashboard.html') : '/login.html'}" class="nav-item flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-teal transition">
        <svg class="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span>${loggedIn ? 'Account' : 'Sign in'}</span>
      </a>
    </nav>
  `;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try { await Api.post('/auth/logout'); } catch {}
      Auth.clear();
      window.location.href = '/index.html';
    });
  }
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <footer class="bg-ink text-white/70 border-t border-white/10 mt-16">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div class="font-display text-lg text-white mb-2">Doctor <span class="text-brass font-normal">On Call</span></div>
          <p class="text-xs text-white/60 leading-relaxed max-w-xs">Premium doctor appointments with real-time doctor availability and instant booking.</p>
        </div>
        <div>
          <div class="text-white text-xs font-mono uppercase tracking-wider mb-3">Quick Navigation</div>
          <ul class="space-y-2 text-xs">
            <li><a href="/doctors.html" class="hover:text-white transition">Find a doctor</a></li>
            <li><a href="/register.html" class="hover:text-white transition">Create an account</a></li>
            <li><a href="/dashboard.html" class="hover:text-white transition">My appointments</a></li>
          </ul>
        </div>
        <div>
          <div class="text-white text-xs font-mono uppercase tracking-wider mb-3">Staff Portal</div>
          <ul class="space-y-2 text-xs">
            <li><a href="/reception/login.html" class="hover:text-white transition">Reception desk sign in</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 py-4 text-center text-xs text-white/40">© ${new Date().getFullYear()} Doctor On Call Platform.</div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page') || '';
  renderHeader(page);
  renderFooter();
});
