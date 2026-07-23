<!-- components/GoalCard.vue example -->
<script setup>
const props = defineProps({
  goal: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="card">
    <h3>{{ goal.title }}</h3> <!-- Ensure this is .title, not .name -->
    <p>{{ goal.status_goal }}</p> <!-- Ensure this is .status_goal -->
  </div>
</template>