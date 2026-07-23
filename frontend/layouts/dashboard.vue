<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="logo-sq">
          <div class="logo-inner"></div>
        </div>
        <span class="brand-name">Smart<span class="thin">Growth</span></span>
      </div>
      <!-- --- NEW BACK BUTTON --- -->
  <NuxtLink to="/" class="menu-link back-to-site">
    <svg class="m-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    <span class="link-text">Back to Home</span>
  </NuxtLink>
  
  <div class="menu-divider"></div>
      <nav class="nav-menu">
        <NuxtLink to="/dashboard" class="menu-link" active-class="active">
          <svg class="m-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span class="link-text">Overview</span>
        </NuxtLink>

        <NuxtLink to="/goals" class="menu-link" active-class="active">
          <svg class="m-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span class="link-text">Goals</span>
        </NuxtLink>

        <NuxtLink to="/habits" class="menu-link" active-class="active">
          <svg class="m-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span class="link-text">Habits</span>
        </NuxtLink>

        <NuxtLink to="/skills" class="menu-link" active-class="active">
          <svg class="m-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span class="link-text">Skills</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <div class="user-card">
          <img src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff" alt="User Profile" />
          <div class="user-info">
            <p class="u-name">Admin User</p>
            <p class="u-status">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="main-body">
      <div class="scroll-container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style>
/* --- GLOBAL RESET --- */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

body, html {
  margin: 0;
  padding: 0;
  background: #030712; 
  font-family: 'Inter', sans-serif;
  overflow: hidden; /* Prevents double scrollbars */
}

.dashboard-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}
/* --- BACK BUTTON & DIVIDER STYLES --- */
.back-to-site {
  margin-bottom: 4px;
  color: #6366f1 !important; /* Standout Indigo */
  background: rgba(99, 102, 241, 0.05);
}

.back-to-site:hover {
  background: rgba(99, 102, 241, 0.12) !important;
  color: #818cf8 !important;
}

.back-to-site:hover .m-icon-svg {
  transform: translateX(-5px) scale(1.1) !important; /* Slide left animation */
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 12px 16px;
}
/* --- SIDEBAR STYLING --- */
.sidebar {
  width: 280px;
  background: #090e1a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  flex-shrink: 0;
  height: 100vh;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 48px;
  padding-left: 8px;
}

.logo-sq {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 10px;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.logo-inner {
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 3px;
  transform: rotate(45deg);
}

.brand-name { 
  color: white; 
  font-weight: 800; 
  font-size: 20px; 
  letter-spacing: -0.5px;
}

.thin { 
  font-weight: 300; 
  opacity: 0.6; 
}

/* --- NAVIGATION MENU --- */
.nav-menu { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.link-text {
  transition: transform 0.3s ease;
}

/* SVG ICON LOGIC */
.m-icon-svg {
  width: 20px;
  height: 20px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.3s ease;
}

/* HOVER STATES */
.menu-link:hover {
  background: rgba(255, 255, 255, 0.03);
  color: white;
}

.menu-link:hover .m-icon-svg {
  color: white;
  transform: scale(1.1);
}

/* ACTIVE STATE */
.menu-link.active {
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  font-weight: 700;
}

.menu-link.active .m-icon-svg {
  color: #818cf8;
  filter: drop-shadow(0 0 8px rgba(129, 140, 248, 0.4));
}

/* --- SIDEBAR FOOTER --- */
.sidebar-footer {
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.user-card img { 
  width: 38px; 
  height: 38px; 
  border-radius: 12px; 
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.u-name { 
  color: white; 
  font-size: 14px; 
  font-weight: 600; 
  margin: 0; 
}

.u-status { 
  color: #64748b; 
  font-size: 11px; 
  font-weight: 500;
  margin: 2px 0 0; 
}

/* --- MAIN BODY CANVAS --- */
.main-body {
  flex: 1;
  background-color: #f8fafc; /* Premium Light Mode Canvas */
  overflow-y: auto; /* Only the content scrolls */
  height: 100vh;
}

.scroll-container {
  padding: 48px 60px; /* Airy professional spacing */
  max-width: 1400px;
  margin: 0 auto;
}

/* Custom Scrollbar for Main Content */
.main-body::-webkit-scrollbar {
  width: 8px;
}

.main-body::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.main-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.main-body::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Small screen responsiveness */
@media (max-width: 1024px) {
  .sidebar { width: 80px; padding: 24px 16px; }
  .brand-name, .link-text, .user-info, .u-status { display: none; }
  .sidebar-brand { padding-left: 0; justify-content: center; }
  .menu-link { justify-content: center; padding: 12px; }
  .user-card { justify-content: center; padding: 10px; }
}
/* --- SIDEBAR FOOTER (Adjusted Position) --- */
.sidebar-footer {
  /* margin-top: auto;  <-- Remove or comment this out to stop it from bottoming out */
  margin-top: 40px;      /* Fixed distance from the last menu link */
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 20px;   /* Adds breathing room at the bottom of the sidebar */
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

</style>