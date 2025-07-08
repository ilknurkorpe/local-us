<template>
  <div class="not-found-container">
    <div class="black-card p-6">
      <i class="pi pi-exclamation-triangle not-found-icon"></i>
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">Sorry, the page you are looking for was not found.</p>
      <p class="not-found-suggestion">You may have clicked on the wrong link or the page you were looking for has been removed.</p>
      <router-link to="/" class="not-found-button">
        Back to Home Page
      </router-link>
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  name: 'NotFound',
  setup(){
    onMounted(() => {
      document.title = '404 | Not Found'
    });
  }
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  text-align: center;
  padding: 2rem;
}

.not-found-icon {
  font-size: 9rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.not-found-title {
  font-size: 5rem;
  font-weight: bold;
  color: #ef4444;
  margin-bottom: 1rem;
}

.not-found-message {
  font-size: 1.5rem;
  color: #f4f4f4;
  margin-bottom: 1rem;
}

.not-found-suggestion {
  font-size: 15px;
  font-weight: 200;
  color: #f4f4f4;
  margin-bottom: 2rem;
}

.not-found-button,.not-found-button:hover {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  color: #34D399;
}
</style>