<script setup>
// Use the useRouter composable for navigation
const router = useRouter();

const go = () => {
  // This will now navigate the user to the dashboard page
  router.push("/dashboard");
};
</script>

<template>
  <div class="container">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    
    <div class="card">
      <div class="badge">v2.0 Beta</div>
      <h1 class="title">Smart Growth <span class="gradient-text">Dashboard</span></h1>
      <p class="subtitle">
        Elevate your workflow with AI-driven insights. 
        Track, analyze, and scale your goals with precision.
      </p>

      <!-- The @click event is now active -->
      <button class="btn" @click="go">
        <span>Enter Dashboard</span>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <div class="footer-note">Trusted by 10k+ achievers</div>
    </div>
  </div>
</template>

<style scoped>
/* Your existing styles remain the same */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #030712;
  font-family: 'Inter', sans-serif;
}

.blob {
  position: absolute;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
  filter: blur(80px);
  border-radius: 50%;
  z-index: 0;
  opacity: 0.4;
}
.blob-1 { top: -10%; left: -10%; }
.blob-2 { bottom: -10%; right: -10%; background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); }

.card {
  position: relative;
  z-index: 10;
  backdrop-filter: blur(25px) saturate(180%);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 50px 40px;
  border-radius: 32px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  color: white;
  width: 400px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  color: #94a3b8;
}

.title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(to right, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 35px;
  color: #94a3b8;
  font-weight: 300;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: white;
  color: #0f172a;
  padding: 16px 24px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
  background: #f8fafc;
}

.footer-note {
  margin-top: 25px;
  font-size: 12px;
  color: #475569;
}
</style>