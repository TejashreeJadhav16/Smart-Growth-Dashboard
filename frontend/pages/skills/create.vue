<template>
  <div class="create-page-wrapper">
    <header class="page-header">
      <div class="header-left">
        <NuxtLink to="/skills" class="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Skills
        </NuxtLink>
        <h1 class="title">Add New <span class="text-indigo-600">Skill</span></h1>
        <p class="subtitle">Define a new area of expertise to track your growth.</p>
      </div>
    </header>

    <div class="form-container">
      <form @submit.prevent="handleCreate" class="premium-form">
        <div class="input-group">
          <label>Skill Name <span class="required">*</span></label>
          <input 
            v-model="form.name" 
            type="text" 
            required 
            placeholder="e.g. UX Design, Python, Leadership"
            class="premium-input"
          />
        </div>

        <div class="input-group">
          <label>Proficiency Level (1-10) <span class="required">*</span></label>
          <div class="slider-container">
            <input 
              v-model.number="form.level" 
              type="range" 
              min="1" 
              max="10" 
              step="1"
              class="premium-range"
            />
            <div class="level-badge">Level {{ form.level }}</div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="$router.push('/skills')">Cancel</button>
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="!loading">Save Skill</span>
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
const form = ref({ name: '', level: 1 });

const handleCreate = async () => {
  loading.value = true;
  try {
    await $fetch('http://127.0.0.1:1337/api/skills', {
      method: 'POST',
      body: { 
        data: { 
          name: form.value.name, 
          level: Number(form.value.level),
          publishedAt: new Date() 
        } 
      }
    });
    navigateTo('/skills');
  } catch (e) {
    alert("Error: Ensure Skill find/create permissions are enabled in Strapi.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.create-page-wrapper { max-width: 600px; margin: 60px auto; padding: 0 20px; }
.page-header { margin-bottom: 32px; }
.back-link { display: flex; align-items: center; gap: 8px; color: #64748b; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 12px; }
.title { font-size: 32px; font-weight: 800; color: #1e293b; margin: 0; }
.text-indigo-600 { color: #4f46e5; }
.subtitle { color: #94a3b8; font-size: 15px; margin-top: 4px; }

.form-container { background: white; padding: 40px; border-radius: 24px; border: 1px solid #e2e8f0; }
.input-group { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
label { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
.required { color: #ef4444; }

.premium-input { padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; background: #fcfcfd; font-size: 15px; }
.premium-range { width: 100%; accent-color: #4f46e5; cursor: pointer; }

.slider-container { display: flex; align-items: center; gap: 20px; }
.level-badge { background: #f5f3ff; color: #4f46e5; padding: 6px 16px; border-radius: 10px; font-weight: 800; min-width: 85px; text-align: center; border: 1px solid #ddd6fe; }

.form-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
.btn-cancel { background: none; border: none; color: #94a3b8; font-weight: 600; cursor: pointer; padding: 10px 20px; }
.btn-submit { background: #4f46e5; color: white; padding: 12px 32px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3); }
</style>