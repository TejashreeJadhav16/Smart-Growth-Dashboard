<template>
  <div class="create-page-wrapper">
    <header class="page-header">
      <div class="header-left">
        <NuxtLink to="/habits" class="back-link">← Back to Habits</NuxtLink>
        <h1 class="title">Edit <span class="text-indigo-600">Habit</span></h1>
      </div>
    </header>
    <div class="form-container">
      <form @submit.prevent="handleUpdate" class="premium-form">
        <div class="input-group">
          <label>Habit Name *</label>
          <input v-model="form.name" type="text" required class="premium-input" />
        </div>
        <div class="form-row">
          <div class="input-group">
            <label>Streak</label>
            <input v-model.number="form.streak" type="number" class="premium-input" />
          </div>
          <div class="input-group">
            <label>Today's Status</label>
            <select v-model="form.completed" class="premium-select">
              <option :value="false">Not Done</option>
              <option :value="true">Completed</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="$router.push('/habits')">Cancel</button>
          <button type="submit" class="btn-submit" :disabled="loading">Update Habit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
definePageMeta({ layout: "dashboard" });

const route = useRoute();
const loading = ref(false);
const form = ref({ name: '', streak: 0, completed: false });

const fetchHabit = async () => {
  try {
    const res = await $fetch(`http://127.0.0.1:1337/api/habits/${route.params.id}`);
    if (res?.data) {
      form.value = { 
        name: res.data.name, 
        streak: res.data.streak, 
        completed: res.data.completed 
      };
    }
  } catch (e) {
    console.error("Fetch Error:", e);
    navigateTo('/habits');
  }
};

const handleUpdate = async () => {
  loading.value = true;
  try {
    await $fetch(`http://127.0.0.1:1337/api/habits/${route.params.id}`, {
      method: 'PUT',
      body: { data: { ...form.value } } // Wrapper
    });
    navigateTo('/habits');
  } catch (e) {
    alert("Update failed. Check permissions.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchHabit);
</script>

<style scoped>
/* Same styles as create.vue */
.create-page-wrapper { max-width: 600px; margin: 60px auto; padding: 0 20px; }
.page-header { margin-bottom: 32px; }
.back-link { color: #64748b; text-decoration: none; font-weight: 600; font-size: 14px; }
.title { font-size: 32px; font-weight: 800; color: #1e293b; margin-top: 8px; }
.form-container { background: white; padding: 32px; border-radius: 20px; border: 1px solid #e2e8f0; }
.input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; flex: 1; }
.form-row { display: flex; gap: 16px; margin-bottom: 24px; }
label { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; }
.premium-input, .premium-select { padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; width: 100%; }
.form-actions { display: flex; gap: 12px; }
.btn-submit { flex: 1; background: #4f46e5; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 700; cursor: pointer; }
.btn-cancel { padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; cursor: pointer; }
.text-indigo-600 { color: #4f46e5; }
</style>