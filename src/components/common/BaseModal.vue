<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  show: boolean;
  title?: string;
  maxWidth?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown));
onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

const customWidthClass = computed(() => {
  if (!props.maxWidth) return 'modal-w-md';
  if (props.maxWidth.includes('max-w-xl')) return 'modal-w-xl';
  if (props.maxWidth.includes('max-w-2xl')) return 'modal-w-2xl';
  if (props.maxWidth.includes('max-w-lg')) return 'modal-w-lg';
  return 'modal-w-md';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="base-modal-backdrop"
        @click.self="emit('close')"
      >
        <div
          class="base-modal-card"
          :class="customWidthClass"
        >
          <!-- Header (only if title or header slot given) -->
          <div v-if="title || $slots.header" class="base-modal-header">
            <slot name="header">
              <h3 class="base-modal-title">{{ title }}</h3>
            </slot>
            <button
              type="button"
              @click="emit('close')"
              class="base-modal-close"
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="base-modal-body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="base-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.base-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(22, 18, 12, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.base-modal-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  border: 1px solid #ebdcc5;
  width: 100%;
  max-height: calc(100dvh - 36px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  font-family: 'Nunito', sans-serif;
  animation: modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-w-md { max-width: 460px; }
.modal-w-lg { max-width: 520px; }
.modal-w-xl { max-width: 660px; }
.modal-w-2xl { max-width: 760px; }

.base-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #ebdcc5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fffdf9;
}

.base-modal-title {
  font-size: 16px;
  font-weight: 850;
  color: #2b2216;
  margin: 0;
}

.base-modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f4ece0;
  border: none;
  color: #7d6b56;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.16s ease;
}

.base-modal-close:hover {
  background: #ebdcc5;
  color: #2b2216;
}

.base-modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.base-modal-footer {
  padding: 14px 20px;
  border-top: 1px solid #ebdcc5;
  background: #fbf8f2;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@keyframes modalPop {
  0% { transform: scale(0.95) translateY(6px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Dark mode overrides */
:global(html.dark) .base-modal-backdrop {
  background: rgba(10, 8, 5, 0.78);
}

:global(html.dark) .base-modal-card {
  background: #1c1914 !important;
  border-color: #382d1c !important;
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.75), 0 0 0 1px #3a2e1c !important;
}

:global(html.dark) .base-modal-header {
  background: #1c1914 !important;
  border-bottom-color: #2e2518 !important;
}

:global(html.dark) .base-modal-title {
  color: #fdfaf3 !important;
}

:global(html.dark) .base-modal-close {
  background: #2b2214 !important;
  color: #cbb9a3 !important;
}

:global(html.dark) .base-modal-close:hover {
  background: #382c1b !important;
  color: #ffffff !important;
}

:global(html.dark) .base-modal-footer {
  background: #16130e !important;
  border-top-color: #2e2518 !important;
}
</style>
