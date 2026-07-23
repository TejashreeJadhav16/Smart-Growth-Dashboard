<template>
  <div class="dashboard-page">
    <div class="content-container">
      
      <header class="page-header">
        <div class="header-left">
          <div class="status-indicator">
            <span class="dot"></span>
            Live Performance
          </div>
          <h1 class="page-title">
            Performance <span class="text-indigo-600">Overview</span>
          </h1>
          <p class="page-subtitle">Welcome back, Admin. Here's your growth summary.</p>
        </div>
        
        <div class="header-actions">
          <button class="btn-outline-vertical">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Export</span>
          </button>
          <button class="btn-primary-solid" @click="$router.push('/goals/create')">
            <span class="plus">+</span> New Goal
          </button>
        </div>
      </header>

      <div class="stats-list">
        <!-- Total Goals Fetch -->
        <div class="stat-row">
          <div class="stat-content">
            <span class="stat-label">Total Goals</span>
            <p class="stat-value">{{ goalsCount }}</p>
          </div>
          <div class="stat-trend positive">+4.5%</div>
        </div>

        <!-- Habit Streak Fetch -->
        <div class="stat-row">
          <div class="stat-content">
            <span class="stat-label">Habit Streak</span>
            <p class="stat-value">{{ bestStreak }} days</p>
          </div>
          <div class="stat-trend positive">+4.5%</div>
        </div>

        <!-- Skill Points Fetch -->
        <div class="stat-row">
          <div class="stat-content">
            <span class="stat-label">Skill Points</span>
            <p class="stat-value">{{ totalSkillPoints.toLocaleString() }}</p>
          </div>
          <div class="stat-trend positive">+4.5%</div>
        </div>
      </div>

      <div class="insight-card-light">
        <div class="insight-content">
          <div class="insight-icon-box">🤖</div>
          <div class="insight-text">
            <h3>AI Growth Insight</h3>
            <p>Your consistency is high. Based on your <b>Skill Mastery</b>, you are on track to hit your next milestone 4 days early.</p>
          </div>
        </div>
        <button class="btn-white">Review Plan</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({ layout: 'dashboard' })

const goalsCount = ref(0)
const bestStreak = ref(0)
const totalSkillPoints = ref(0)

const fetchDashboardData = async () => {
  try {
    // 1. Fetch Goals
    // Make sure the URL matches your Strapi endpoint exactly
    const goalsRes = await $fetch('http://127.0.0.1:1337/api/goals')
    
    // DEBUG: Uncomment the line below to see exactly what Strapi is sending
    // console.log('Goals API Response:', goalsRes)

    // Strapi v5 returns { data: [ {...}, {...} ] }
    // We check if data exists and is an array before taking the length
    if (goalsRes && Array.isArray(goalsRes.data)) {
      goalsCount.value = goalsRes.data.length
    } else {
      goalsCount.value = 0
    }

    // 2. Fetch Habits for Streak
    const habitsRes = await $fetch('http://127.0.0.1:1337/api/habits')
    if (habitsRes?.data?.length) {
      const streaks = habitsRes.data.map(h => Number(h.streak) || 0)
      bestStreak.value = Math.max(...streaks)
    }

    // 3. Fetch Skills for Points
    const skillsRes = await $fetch('http://127.0.0.1:1337/api/skills')
    if (skillsRes?.data?.length) {
      totalSkillPoints.value = skillsRes.data.reduce((acc, curr) => 
        acc + (Number(curr.level) * 100 + 800), 0
      )
    }

  } catch (e) {
    console.error("Dashboard Sync Error:", e)
    goalsCount.value = 0
  }
}
onMounted(fetchDashboardData)
</script>
<style scoped>
/* Normalizing font sizes and padding */
.dashboard-page {
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 30px;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 1.75rem; /* Reduced from 2.5rem */
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.95rem; /* Reduced from 1.1rem */
  margin-top: 2px;
}

/* Stats List Styling */
.stats-list {
  display: flex;
  flex-direction: column;
  gap: 16px; /* Reduced gap */
  margin-bottom: 30px;
}

.stat-row {
  background: white;
  padding: 20px 30px; /* Reduced padding */
  border-radius: 16px; /* Slightly tighter corners */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  border: 1px solid #f1f5f9;
}

.stat-label {
  color: #94a3b8;
  font-size: 12px; /* Smaller label */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 24px; /* Reduced from 36px */
  font-weight: 800;
  color: #1e293b;
  margin-top: 4px;
}

.stat-trend {
  color: #10b981;
  background: #ecfdf5;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
}

/* Actions Styling */
.header-actions { display: flex; gap: 12px; align-items: center; }

.btn-outline-vertical {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 10px 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
}

.btn-outline-vertical span { font-size: 10px; font-weight: 700; color: #64748b; }

.btn-primary-solid {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}

/* Insight Card Styling */
.insight-card-light {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  padding: 24px 32px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.insight-icon-box {
  background: rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 22px;
}

.insight-text h3 { font-size: 1.1rem; margin-bottom: 4px; }
.insight-text p { font-size: 0.9rem; opacity: 0.9; }

.btn-white {
  background: white;
  color: #4f46e5;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #e0e7ff;
  color: #4338ca;
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 10px;
}

.dot { width: 6px; height: 6px; background: #4338ca; border-radius: 50%; }
.text-indigo-600 { color: #4f46e5; }
</style>