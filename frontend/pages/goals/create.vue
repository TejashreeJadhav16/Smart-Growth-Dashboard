<template>
  <div class="create-page-wrapper">
    <header class="page-header">
      <div class="header-left">
        <NuxtLink to="/goals" class="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Goals
        </NuxtLink>
        <h1 class="title">Create New <span class="text-indigo-600">Goal</span></h1>
        <p class="subtitle">Fill in the details below to sync a new objective to your dashboard.</p>
      </div>
    </header>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="premium-form">
        
        <div class="input-group">
          <label>Goal Title <span class="required">*</span></label>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="e.g., Master Nuxt.js" 
            required 
            class="premium-input"
          />
        </div>

        <div class="input-group">
          <label>Description</label>
          <textarea 
            v-model="form.description" 
            placeholder="What steps will you take to reach this goal?" 
            rows="3"
            class="premium-textarea"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label>Initial Progress (%)</label>
            <input 
              v-model="form.progress" 
              type="number" 
              min="0" 
              max="100" 
              class="premium-input"
            />
          </div>

          <div class="input-group">
            <label>Target Deadline <span class="required">*</span></label>
            <input 
              v-model="form.deadline" 
              type="date" 
              required 
              class="premium-input"
            />
          </div>
        </div>

        <div class="input-group">
          <label>Goal Status</label>
          <div class="select-wrapper">
            <select v-model="form.status_goal" class="premium-select">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="$router.push('/goals')">Cancel</button>
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="!loading">Sync to Strapi</span>
            <span v-else class="loader"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({ layout: "dashboard" });

const loading = ref(false);

const form = ref({
  title: '',
  description: '',
  progress: 0,
  deadline: '',
  status_goal: 'pending' 
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const response = await $fetch('http://127.0.0.1:1337/api/goals', {
      method: 'POST',
      body: { 
        data: { // Required wrapper for Strapi
          title: form.value.title,
          description: form.value.description,
          progress: Number(form.value.progress),
          deadline: form.value.deadline,
          status_goal: form.value.status_goal 
        } 
      }
    });
    
    console.log("Strapi Saved Successfully:", response);
    navigateTo('/goals');
  } catch (e) {
    console.error("Submission failed:", e);
    alert("Sync Error: " + (e.response?._data?.error?.message || "Check Strapi permissions"));
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* CSS remains exactly the same as provided */
.create-page-wrapper { max-width: 800px; margin: 0 auto; }
.page-header { margin-bottom: 32px; }
.back-link { display: flex; align-items: center; gap: 8px; color: #64748b; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 12px; transition: all 0.2s ease; }
.back-link:hover { color: #4f46e5; transform: translateX(-4px); }
.title { font-size: 32px; font-weight: 800; color: #1e293b; margin: 0; }
.subtitle { color: #94a3b8; font-size: 15px; margin-top: 4px; }
.form-container { background: white; padding: 40px; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.02); }
.input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
label { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
.required { color: #ef4444; margin-left: 2px; }
input, textarea, select { padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 15px; color: #1e293b; background: #fcfcfd; transition: all 0.2s ease; }
input:focus, textarea:focus, select:focus { outline: none; border-color: #4f46e5; background: white; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
.form-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
.btn-cancel { background: none; border: none; color: #94a3b8; font-weight: 600; cursor: pointer; padding: 10px 20px; border-radius: 10px; transition: all 0.2s; }
.btn-cancel:hover { color: #64748b; background: #f1f5f9; }
.btn-submit { background: #4f46e5; color: white; padding: 12px 32px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3); transition: all 0.2s; }
.btn-submit:hover:not(:disabled) { background: #4338ca; transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.loader { width: 18px; height: 18px; border: 2px solid white; border-bottom-color: transparent; border-radius: 50%; display: inline-block; animation: rotation 1s linear infinite; }
@keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>