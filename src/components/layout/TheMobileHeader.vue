<script setup lang="ts">
defineProps<{
  isDark?: boolean;
}>();

const emit = defineEmits<{
  (e: 'open-faq'): void;
  (e: 'toggle-sidebar'): void;
  (e: 'toggle-theme'): void;
}>();
</script>

<template>
  <header class="mobile-header">
    <button
      type="button"
      class="mobile-menu-btn"
      aria-label="Mở menu điều hướng"
      @click="emit('toggle-sidebar')"
    >
      <i class="fa-solid fa-bars-staggered" aria-hidden="true"></i>
    </button>

    <a href="#" class="brand">
      <span class="brand-icon">
        <img src="/assets/locket-widget.svg" class="locket-logo" width="36" height="36" alt="" aria-hidden="true">
      </span>
      <span>Locket Gold</span>
    </a>

    <div class="mobile-header-actions">
      <!-- Dark/Light Theme Button -->
      <button
        type="button"
        class="theme-icon-btn"
        :aria-label="isDark ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'"
        @click="emit('toggle-theme')"
      >
        <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
      </button>

      <!-- FAQ Button -->
      <a href="#faq" class="help-button" aria-label="Câu hỏi thường gặp" @click="emit('open-faq')">
        <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
      </a>
    </div>
  </header>
</template>

<style scoped>
.mobile-menu-btn {
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: #ffffff;
  border: 1px solid #ebd9b5;
  color: #7d6545;
  display: grid;
  place-items: center;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transition: all 0.15s ease;
}

.mobile-menu-btn:active {
  transform: scale(0.95);
  background: #fdf5e2;
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  font-size: 17px;
  font-weight: 850;
  color: #2b2216;
}

.brand-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(248, 197, 51, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-icon-btn,
.help-button {
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: #ffffff;
  border: 1px solid #ebd9b5;
  color: #7d6545;
  display: grid;
  place-items: center;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
  transition: all 0.15s ease;
}

.theme-icon-btn:active,
.help-button:active {
  transform: scale(0.95);
  background: #fdf5e2;
}

.theme-icon-btn i {
  color: #f59e0b;
}
</style>
