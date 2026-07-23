<template>
  <div class="app-layout">
    <header class="nav-container">
      <div class="nav-glass"></div>
      
      <div class="nav-content">
        <div class="brand" @click="navigateTo('/')">
          <div class="brand-logo">
            <div class="logo-inner"></div>
          </div>
          <span class="brand-text">Smart<span class="thin">Growth</span></span>
        </div>

        <nav class="nav-pill">
          <NuxtLink to="/dashboard" class="nav-link" active-class="active">
            <svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Dashboard
          </NuxtLink>
          
          <NuxtLink to="/goals" class="nav-link" active-class="active">
            <svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
            </svg>
            Goals
          </NuxtLink>
          
          <NuxtLink to="/habits" class="nav-link" active-class="active">
            <svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Habits
          </NuxtLink>

          <!-- --- NEW SKILLS LINK --- -->
  <NuxtLink to="/skills" class="nav-link" active-class="active">
    <svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
    Skills
  </NuxtLink>
        </nav>

        <div class="nav-right">
          <div class="status-badge">
            <span class="status-dot"></span>
            System Live
          </div>
        </div>
      </div>

      <div class="header-line">
        <div class="line-glow"></div>
      </div>
    </header>

    <main class="main-viewport">
      <slot />
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.app-layout {
  background-color: #030712;
  min-height: 100vh;
  color: white;
  font-family: 'Inter', sans-serif;
}

.nav-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  z-index: 1000;
  overflow: hidden;
}

.nav-glass {
  position: absolute;
  inset: 0;
  background: rgba(3, 7, 18, 0.8);
  backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-content {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.brand-logo {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 8px;
  display: grid;
  place-items: center;
}

.logo-inner {
  width: 10px;
  height: 10px;
  border: 2px solid white;
  border-radius: 2px;
  transform: rotate(45deg);
}

.brand-text {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.thin { font-weight: 300; opacity: 0.5; }

/* Nav Pill */
.nav-pill {
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  padding: 5px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  text-decoration: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.03);
}

.nav-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.nav-icon-svg {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.nav-link.active .nav-icon-svg {
  color: #818cf8;
  opacity: 1;
}

/* Status Badge */
.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
}

/* Animated Header Line */
.header-line {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.line-glow {
  position: absolute;
  height: 100%;
  width: 25%;
  background: linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  from { left: -25%; }
  to { left: 100%; }
}

.main-viewport {
  padding-top: 72px;
}
</style>