<template>
  <div class="habits-page">
    <div class="content-container">
      <header class="page-header">
        <div class="header-left">
          <div class="breadcrumb">Performance / <span class="active">Habits</span></div>
          <h1 class="page-title">Daily <span class="text-indigo-600">Consistency</span></h1>
          <p class="page-subtitle">Small wins every day lead to massive results over time.</p>
        </div>

        <div class="header-right">
          <div class="streak-card">
            <span class="fire-icon">🔥</span>
            <div class="streak-info">
              <span class="count">{{ bestStreak }} Day</span>
              <span class="label">Best Streak</span>
            </div>
          </div>
          <button class="btn-add-habit" @click="$router.push('/habits/create')">
            + Create New Habit
          </button>
        </div>
      </header>

      <div class="weekly-strip">
        <div v-for="day in weekDays" :key="day.date" class="day-card" :class="{ 'is-today': day.isToday }">
          <span class="day-name">{{ day.name }}</span>
          <span class="day-date">{{ day.date }}</span>
          <div v-if="day.isPast || day.isToday" class="dot-success"></div>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="Search habits..." />
        </div>
      </div> <!-- Fixed: Removed stray header tag here -->

      <section class="habits-section">
        <div v-if="filteredHabits && filteredHabits.length > 0" class="table-container">
          <table class="habits-table">
            <thead>
              <tr>
                <th>Habit Name</th>
                <th>Current Streak</th>
                <th>Status</th>
                <th class="text-center">Today's Check</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in filteredHabits" :key="h.id">
                <td>
                  <div class="habit-info-cell">
                    <div class="habit-icon-mini">⚡</div>
                    <span class="habit-name-text">{{ h.name || 'Untitled' }}</span>
                  </div>
                </td>
                <td><span class="streak-tag">🔥 {{ h.streak || 0 }} Days</span></td>
                <td>
                  <span class="status-badge" :class="h.completed ? 'completed' : 'pending'">
                    {{ h.completed ? 'Done' : 'Pending' }}
                  </span>
                </td>
                <td class="text-center">
                  <button class="check-btn-table" :class="{ 'checked': h.completed }" @click="toggleHabit(h)">
                    <span v-if="h.completed">✓</span>
                  </button>
                </td>
                <td class="text-center">
                  <div class="action-buttons">
                    <button class="btn-edit" @click="$router.push(`/habits/edit/${h.documentId}`)">Edit</button>
                    <button class="btn-delete" @click="deleteHabit(h.documentId)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty-habits">
          <div class="empty-illustration">⚡</div>
          <h3>No habits found</h3>
          <button class="btn-primary-small" @click="$router.push('/habits/create')">Create Habit</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
definePageMeta({ layout: "dashboard" });

const habits = ref([]); // Initialized as empty array
const searchQuery = ref('');
const API_URL = 'http://127.0.0.1:1337/api/habits';

const fetchHabits = async () => {
  try {
    const response = await $fetch(API_URL);
    // Flat mapping for Strapi v5
    habits.value = response?.data || [];
  } catch (e) {
    console.error("Fetch Error:", e);
    habits.value = [];
  }
};

const filteredHabits = computed(() => {
  if (!habits.value) return [];
  return habits.value.filter(h => h.name?.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const toggleHabit = async (habit) => {
  const newStatus = !habit.completed;
  const newStreak = newStatus ? (Number(habit.streak) || 0) + 1 : Math.max(0, (Number(habit.streak) || 0) - 1);
  try {
    await $fetch(`${API_URL}/${habit.documentId}`, {
      method: 'PUT',
      body: { data: { completed: newStatus, streak: newStreak } } // Strapi 'data' wrapper
    });
    await fetchHabits();
  } catch (e) { console.error(e); }
};

const deleteHabit = async (docId) => {
  if (!confirm("Delete this habit?")) return;
  try {
    await $fetch(`${API_URL}/${docId}`, { method: 'DELETE' });
    await fetchHabits();
  } catch (e) { console.error(e); }
};

const bestStreak = computed(() => {
  if (!habits.value.length) return 0;
  return Math.max(...habits.value.map(h => Number(h.streak) || 0));
});

const weekDays = computed(() => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      name: days[d.getDay()],
      date: d.getDate().toString().padStart(2, '0'),
      isToday: d.toDateString() === today.toDateString(),
      isPast: d < today && d.toDateString() !== today.toDateString()
    };
  });
});

onMounted(fetchHabits);
</script>

<style scoped>

.habits-page { background: #f8fafc; min-height: 100vh; padding: 20px 0 60px; }

.content-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }



.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }

.breadcrumb { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }

.breadcrumb .active { color: #4f46e5; font-weight: 600; }

.page-title { font-size: 2rem; font-weight: 800; color: #1e293b; margin: 0; }

.text-indigo-600 { color: #4f46e5; }

.page-subtitle { color: #64748b; font-size: 15px; margin-top: 4px; }



.header-right { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }

.streak-card { display: flex; align-items: center; gap: 12px; background: white; padding: 8px 16px; border-radius: 12px; border: 1px solid #e2e8f0; }

.streak-info .count { display: block; font-weight: 800; color: #1e293b; font-size: 14px; }

.streak-info .label { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; }

.btn-add-habit { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; }



.weekly-strip { display: flex; gap: 12px; margin-bottom: 30px; }

.day-card { flex: 1; background: white; padding: 12px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; border: 1px solid #e2e8f0; }

.day-card.is-today { border: 2px solid #4f46e5; background: #f5f3ff; }

.day-name { font-size: 11px; font-weight: 700; color: #94a3b8; }

.day-date { font-size: 16px; font-weight: 800; color: #1e293b; margin-top: 2px; }

.dot-success { width: 5px; height: 5px; background: #10b981; border-radius: 50%; margin-top: 6px; }



.filter-bar { background: white; display: flex; justify-content: space-between; padding: 12px 20px; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 25px; align-items: center; }

.search-input { display: flex; align-items: center; gap: 10px; flex: 1; }

.search-input input { border: none; outline: none; font-size: 14px; width: 100%; color: #1e293b; background: transparent; }

.tab { border: none; background: none; padding: 8px 16px; cursor: pointer; font-weight: 600; color: #64748b; }

.tab.active { background: #f1f5f9; color: #4f46e5; border-radius: 8px; }



.table-container { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }

.habits-table { width: 100%; border-collapse: collapse; text-align: left; }

.habits-table th { background: #f8fafc; padding: 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }

.habits-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }



.habit-info-cell { display: flex; align-items: center; gap: 12px; }

.habit-icon-mini { width: 32px; height: 32px; background: #f1f5f9; border-radius: 8px; display: grid; place-items: center; font-size: 14px; }

.habit-name-text { font-weight: 700; color: #1e293b; font-size: 14px; }



.streak-tag { font-size: 13px; font-weight: 600; color: #475569; }

.status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }

.status-badge.pending { background: #fef3c7; color: #92400e; }

.status-badge.completed { background: #dcfce7; color: #166534; }



.check-btn-table { width: 28px; height: 28px; border-radius: 6px; border: 2px solid #e2e8f0; background: transparent; color: #10b981; font-weight: 900; cursor: pointer; transition: 0.2s; }

.check-btn-table.checked { background: #ecfdf5; border-color: #10b981; }



.action-buttons { display: flex; gap: 8px; justify-content: center; }

.btn-edit { background: #f1f5f9; color: #4f46e5; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; }

.btn-delete { background: #fff1f2; color: #be123c; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; }

.text-center { text-align: center; }



.empty-habits { text-align: center; padding: 60px; background: white; border-radius: 16px; border: 1px dashed #cbd5e1; }

.btn-primary-small { background: #f1f5f9; color: #4f46e5; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }

</style>