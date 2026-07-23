<template>
  <div class="goals-page">
    <div class="content-container">
      
      <header class="page-header">
        <div class="header-left">
          <div class="breadcrumb">Application / <span class="active">Goals</span></div>
          <h1 class="page-title">Target <span class="text-indigo-600">Objectives</span></h1>
          <p class="page-subtitle">Manage and monitor your growth milestones.</p>
        </div>

        <div class="header-right">
          <div class="progress-summary">
            <span class="label">Overall Completion</span>
            <div class="progress-bar-bg">
              <div class="progress-fill" :style="{ width: overallProgress + '%' }"></div>
            </div>
            <span class="percentage">{{ overallProgress }}%</span>
          </div>
          <button class="btn-add-goal" @click="$router.push('/goals/create')">
            + Create New Goal
          </button>
        </div>
      </header>

      <div class="filter-bar">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="Search goals..." />
        </div>
        <div class="tabs">
          <button 
            v-for="tab in ['All', 'In Progress', 'Completed']" 
            :key="tab"
            class="tab" 
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- GOALS TABLE SECTION -->
      <section class="goals-section">
        <div v-if="filteredGoals.length" class="table-container">
          <table class="goals-table">
            <thead>
              <tr>
                <th>Title & Description</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Progress</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="g in filteredGoals" :key="g.id">
                <td>
                  <div class="goal-info">
                    <span class="goal-name">{{ g.title || 'Untitled Goal' }}</span>
                    <!-- Integrated Guard Logic here -->
                    <span class="goal-desc">
                      {{ Array.isArray(g.description) ? g.description[0]?.children[0]?.text : (g.description || 'No description available') }}
                    </span>
                  </div>
                </td>
                <td><span class="deadline-tag">{{ g.deadline || 'No date' }}</span></td>
                <td>
                  <span class="status-badge" :class="g.status_goal?.toLowerCase()">
                    {{ g.status_goal || 'pending' }}
                  </span>
                </td>
                <td>
                  <div class="table-progress">
                    <div class="mini-bar-bg">
                      <div class="mini-bar-fill" :style="{ width: (g.progress || 0) + '%' }"></div>
                    </div>
                    <span class="mini-pct">{{ g.progress || 0 }}%</span>
                  </div>
                </td>
                <td class="text-center">
                  <div class="action-buttons">
                    <button class="btn-edit" @click="$router.push(`/goals/edit/${g.id}`)">Edit</button>
                    <button class="btn-delete" @click="handleDelete(g.id)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="empty-goals">
          <div class="empty-illustration">🎯</div>
          <h3>No goals found</h3>
          <button class="btn-primary-small" @click="$router.push('/goals/create')">Create Goal</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
definePageMeta({ layout: "dashboard" });

// Added activeTab ref which was missing in your lower script block
const activeTab = ref('All');
const goals = ref([]);
const searchQuery = ref('');
const API_URL = 'http://127.0.0.1:1337/api/goals';

const fetchGoals = async () => {
  try {
    const res = await $fetch(API_URL);
    goals.value = res?.data || [];
  } catch (e) {
    console.error("Goals Fetch Error:", e);
  }
};

// Logic for deleting goals
const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this goal?")) return;
  try {
    // Note: Ensure your DELETE endpoint matches your Strapi documentId or ID logic
    await $fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await fetchGoals();
  } catch (e) {
    console.error("Delete failed:", e);
    alert("Delete failed.");
  }
};

const overallProgress = computed(() => {
  if (!goals.value.length) return 0;
  const total = goals.value.reduce((acc, g) => acc + (Number(g.progress) || 0), 0);
  return Math.round(total / goals.value.length);
});

const filteredGoals = computed(() => {
  if (!goals.value) return [];
  return goals.value.filter(g => {
    const matchesSearch = g.title?.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    let matchesTab = true;
    const status = g.status_goal?.toLowerCase();
    if (activeTab.value === 'In Progress') {
       matchesTab = (status === 'pending' || status === 'in-progress');
    } else if (activeTab.value === 'Completed') {
       matchesTab = (status === 'completed');
    }

    return matchesSearch && matchesTab;
  });
});

onMounted(fetchGoals);
</script>

<style scoped>
/* Styles remain exactly as you provided */
.goals-page { background: #f8fafc; min-height: 100vh; padding: 20px 0 60px; }
.content-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
.page-title { font-size: 2rem; font-weight: 800; }
.breadcrumb { font-size: 12px; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
.breadcrumb .active { color: #4f46e5; font-weight: 600; }
.page-subtitle { color: #64748b; font-size: 15px; margin-top: 4px; }
.header-right { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
.progress-summary { display: flex; align-items: center; gap: 12px; background: white; padding: 8px 16px; border-radius: 12px; border: 1px solid #e2e8f0; }
.progress-summary .label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }
.progress-bar-bg { width: 120px; height: 8px; background: #e2e8f0; border-radius: 10px; }
.progress-fill { height: 100%; background: #4f46e5; border-radius: 10px; }
.percentage { font-size: 12px; font-weight: 800; color: #1e293b; width: 30px; text-align: right; }
.btn-add-goal { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; }

.filter-bar { background: white; display: flex; justify-content: space-between; padding: 12px 20px; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 25px; align-items: center; }
.search-input { display: flex; align-items: center; gap: 10px; flex: 1; }
.search-input input { border: none; outline: none; font-size: 14px; width: 100%; color: #1e293b; background: transparent; }
.tab { border: none; background: none; padding: 8px 16px; cursor: pointer; font-weight: 600; color: #64748b; }
.tab.active { background: #f1f5f9; color: #4f46e5; border-radius: 8px; }

.table-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.goals-table { width: 100%; border-collapse: collapse; text-align: left; }
.goals-table th { background: #f8fafc; padding: 16px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
.goals-table td { padding: 16px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.goal-info { display: flex; flex-direction: column; }
.goal-name { font-weight: 700; color: #1e293b; font-size: 14px; }
.goal-desc { font-size: 12px; color: #64748b; }
.status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: capitalize; }
.status-badge.pending { background: #fef3c7; color: #92400e; }
.status-badge.in-progress { background: #e0e7ff; color: #3730a3; }
.status-badge.completed { background: #dcfce7; color: #166534; }
.deadline-tag { font-size: 13px; color: #475569; font-weight: 500; }
.table-progress { display: flex; align-items: center; gap: 8px; }
.mini-bar-bg { width: 80px; height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
.mini-bar-fill { height: 100%; background: #4f46e5; transition: width 0.3s; }
.mini-pct { font-size: 11px; font-weight: 700; color: #1e293b; }
.action-buttons { display: flex; gap: 8px; justify-content: center; }
.btn-edit { background: #f1f5f9; color: #4f46e5; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; }
.btn-delete { background: #fff1f2; color: #be123c; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; }
.text-center { text-align: center; }

.empty-goals { text-align: center; padding: 60px; background: white; border-radius: 16px; border: 1px dashed #cbd5e1; }
.btn-primary-small { background: #f1f5f9; color: #4f46e5; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }
</style>