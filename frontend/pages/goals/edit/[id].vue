<template>
  <div class="edit-goal-page">
    <div class="form-container">
      <header class="form-header">
        <button class="btn-back" @click="$router.push('/goals')">← Back to Goals</button>
        <h1 class="page-title">Edit <span class="text-indigo-600">Goal</span></h1>
        <p class="page-subtitle">Update your objectives and track your progress.</p>
      </header>

      <form @submit.prevent="handleUpdate" class="goal-form">
        <div class="form-group">
          <label for="title">Goal Title</label>
          <input v-model="form.title" type="text" id="title" required />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <!-- Using textarea for plain text -->
          <textarea v-model="form.description" id="description" rows="4"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="deadline">Deadline</label>
            <input v-model="form.deadline" type="date" id="deadline" required />
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select v-model="form.status_goal" id="status">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="progress">Progress</label>
            <span class="progress-value">{{ form.progress }}%</span>
          </div>
          <input v-model="form.progress" type="range" id="progress" min="0" max="100" class="range-slider" />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="$router.push('/goals')">Cancel</button>
          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Update Goal' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({ layout: "dashboard" });

const route = useRoute();
const router = useRouter();
const loading = ref(false);

const form = ref({
  title: '',
  description: '',
  deadline: '',
  status_goal: 'pending',
  progress: 0
});

// Strapi v5 Endpoint using 127.0.0.1 and port 1337
const API_URL = `http://127.0.0.1:1337/api/goals/${route.params.id}`;

const fetchGoalDetails = async () => {
  try {
    const response = await $fetch(API_URL);
    if (response?.data) {
      const item = response.data;
      
      // FIX: Check if description is a JSON array (Strapi Blocks) and convert to string
      let cleanDescription = '';
      if (Array.isArray(item.description)) {
        cleanDescription = item.description[0]?.children[0]?.text || '';
      } else {
        cleanDescription = item.description || '';
      }

      form.value = {
        title: item.title,
        description: cleanDescription,
        deadline: item.deadline,
        status_goal: item.status_goal || 'pending',
        progress: item.progress || 0
      };
    }
  } catch (e) {
    console.error("Fetch error:", e);
    router.push('/goals');
  }
};

const handleUpdate = async () => {
  loading.value = true;
  try {
    await $fetch(API_URL, {
      method: 'PUT',
      body: {
        data: { // Strapi v5 requires the 'data' wrapper
          title: form.value.title,
          description: form.value.description,
          deadline: form.value.deadline,
          status_goal: form.value.status_goal,
          progress: Number(form.value.progress)
        }
      }
    });
    router.push('/goals');
  } catch (e) {
    console.error("Update failed:", e);
    alert("Check Strapi permissions for 'update' in the Public role.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchGoalDetails);
</script>

<style scoped>
.edit-goal-page {
  background: #f8fafc;
  min-height: 100vh;
  padding: 60px 20px;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.form-header { margin-bottom: 32px; }
.btn-back { 
  background: none; border: none; color: #64748b; 
  font-weight: 600; cursor: pointer; margin-bottom: 16px; padding: 0;
}
.page-title { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
.page-subtitle { color: #64748b; font-size: 15px; }

.goal-form { display: flex; flex-direction: column; gap: 24px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

label { font-size: 14px; font-weight: 700; color: #475569; }
input, textarea, select {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  transition: all 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.label-row { display: flex; justify-content: space-between; align-items: center; }
.progress-value { font-weight: 800; color: #4f46e5; font-size: 14px; }

.range-slider {
  -webkit-appearance: none; width: 100%; height: 8px;
  background: #e2e8f0; border-radius: 5px; outline: none;
}
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px;
  background: #4f46e5; border-radius: 50%; cursor: pointer;
}

.form-actions { display: flex; gap: 12px; margin-top: 12px; }
.btn-submit {
  flex: 2; background: #4f46e5; color: white; border: none;
  padding: 14px; border-radius: 10px; font-weight: 700; cursor: pointer;
}
.btn-cancel {
  flex: 1; background: #f1f5f9; color: #64748b; border: none;
  padding: 14px; border-radius: 10px; font-weight: 700; cursor: pointer;
}

.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
.text-indigo-600 { color: #4f46e5; }
</style>