<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BaseModal from '../common/BaseModal.vue';
import { INSTALL_STEPS_GUIDE } from '../../constants/locketData';

const props = defineProps<{
  show: boolean;
  initialStep?: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentIdx = ref(props.initialStep ?? 0);

watch(() => props.initialStep, (newVal) => {
  if (newVal !== undefined && newVal >= 0 && newVal < INSTALL_STEPS_GUIDE.length) {
    currentIdx.value = newVal;
  }
});

watch(() => props.show, (isOpen) => {
  if (isOpen && props.initialStep !== undefined) {
    currentIdx.value = props.initialStep;
  }
});

const currentStepData = computed(() => {
  return INSTALL_STEPS_GUIDE[currentIdx.value] || INSTALL_STEPS_GUIDE[0];
});

function prevStep() {
  if (currentIdx.value > 0) {
    currentIdx.value--;
  }
}

function nextStep() {
  if (currentIdx.value < INSTALL_STEPS_GUIDE.length - 1) {
    currentIdx.value++;
  } else {
    emit('close');
  }
}
</script>

<template>
  <BaseModal :show="show" maxWidth="max-w-xl" @close="emit('close')">
    <div class="install-guide-modal">
      <!-- Modal Header -->
      <div class="guide-header">
        <div class="guide-title-row">
          <span class="guide-icon">
            <i class="fa-brands fa-apple" aria-hidden="true"></i>
          </span>
          <div>
            <h3>Hướng dẫn cài đặt chi tiết trên iPhone</h3>
            <p>Đã khoanh đỏ vị trí cần ấn từng bước thực tế</p>
          </div>
        </div>
        <div class="header-right">
          <div class="step-indicator-badge">
            Bước <strong>{{ currentIdx + 1 }}</strong> / {{ INSTALL_STEPS_GUIDE.length }}
          </div>
          <button type="button" class="close-guide-btn" @click="emit('close')" aria-label="Đóng hướng dẫn">
            ✕
          </button>
        </div>
      </div>

      <!-- Step Visualizer & Image Card -->
      <div class="guide-content-grid">
        <!-- Left: Image Preview with Red Circle Highlight -->
        <div class="guide-image-container">
          <div class="guide-image-wrapper">
            <img
              :src="currentStepData.image"
              :alt="currentStepData.title"
              class="step-screenshot"
              loading="eager"
            />
            <div class="tap-hint-pill">
              <i class="fa-solid fa-hand-pointer tap-icon" aria-hidden="true"></i>
              <span>{{ currentStepData.highlightText }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Step Info & Stepper Navigation -->
        <div class="guide-info-pane">
          <!-- Step Header Tag -->
          <div class="step-tag-pill">
            <span class="step-tag-num">BƯỚC {{ currentStepData.step }}</span>
            <span class="step-tag-phase">{{ currentIdx < 5 ? 'Giai đoạn 1: Cài hồ sơ' : 'Giai đoạn 2: Tin cậy CA' }}</span>
          </div>

          <h4 class="step-main-title">{{ currentStepData.title }}</h4>
          <p class="step-main-desc">{{ currentStepData.desc }}</p>

          <!-- Important Note / Highlight Box -->
          <div class="step-action-card">
            <div class="action-card-icon">
              <i class="fa-solid fa-bullseye" aria-hidden="true"></i>
            </div>
            <div>
              <strong>Vị trí khoanh đỏ:</strong>
              <span>{{ currentStepData.highlightText }}</span>
            </div>
          </div>

          <!-- Progress Dots -->
          <div class="step-dots-wrapper">
            <span class="dots-label">Chọn bước:</span>
            <div class="step-dots-row">
              <button
                v-for="(item, idx) in INSTALL_STEPS_GUIDE"
                :key="idx"
                type="button"
                class="dot-btn"
                :class="{ active: currentIdx === idx, passed: currentIdx > idx }"
                @click="currentIdx = idx"
                :title="item.title"
                :aria-label="`Chuyển đến bước ${idx + 1}`"
              >
                {{ idx + 1 }}
              </button>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="guide-actions-row">
            <button
              type="button"
              class="ios-button secondary"
              :disabled="currentIdx === 0"
              @click="prevStep"
            >
              <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
              <span>Bước trước</span>
            </button>

            <button
              type="button"
              class="ios-button primary flex-1"
              @click="nextStep"
            >
              <span>{{ currentIdx === INSTALL_STEPS_GUIDE.length - 1 ? 'Hoàn tất & Đóng' : 'Bước tiếp theo' }}</span>
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.install-guide-modal {
  font-family: 'Nunito', sans-serif;
  color: #2b2216;
}

.guide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebdcc5;
  margin-bottom: 14px;
}

.guide-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.guide-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #fdf6e7;
  color: #784a00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.guide-title-row h3 {
  font-size: 15px;
  font-weight: 850;
  margin: 0 0 2px;
  color: #2b2216;
}

.guide-title-row p {
  font-size: 11px;
  color: #7d6b56;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.step-indicator-badge {
  font-size: 11.5px;
  font-weight: 750;
  color: #8c5b08;
  background: #faebd0;
  padding: 4px 9px;
  border-radius: 99px;
  white-space: nowrap;
}

.close-guide-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f5efe2;
  border: 1px solid #ebdcc5;
  color: #7d6b56;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.16s ease;
}

.close-guide-btn:hover {
  background: #ebdcc5;
  color: #2b2216;
}

/* Two column layout on desktop */
.guide-content-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 18px;
  align-items: start;
}

.guide-image-container {
  display: flex;
  justify-content: center;
}

.guide-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 240px;
  height: 430px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background: #111;
  border: 3px solid #2b2216;
}

.step-screenshot {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  background: #fdfbf7;
}

.tap-hint-pill {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  background: rgba(220, 38, 38, 0.95);
  color: #ffffff;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 850;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.45);
  white-space: nowrap;
  backdrop-filter: blur(6px);
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tap-icon {
  font-size: 11px;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.guide-info-pane {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  justify-content: space-between;
}

.step-tag-pill {
  display: flex;
  align-items: center;
  gap: 6px;
}

.step-tag-num {
  font-size: 10px;
  font-weight: 900;
  color: #b45309;
  background: #fef3c7;
  padding: 2px 7px;
  border-radius: 6px;
}

.step-tag-phase {
  font-size: 10px;
  font-weight: 750;
  color: #7d6b56;
}

.step-main-title {
  font-size: 17px;
  font-weight: 850;
  color: #2b2216;
  margin: 0;
  line-height: 1.3;
}

.step-main-desc {
  font-size: 13px;
  color: #6b5a47;
  line-height: 1.55;
  margin: 0;
}

.step-action-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #fff5f5;
  border: 1.5px solid #fecaca;
  border-radius: 12px;
}

.action-card-icon {
  color: #dc2626;
  font-size: 16px;
  flex-shrink: 0;
}

.step-action-card strong {
  display: block;
  font-size: 11px;
  color: #991b1b;
}

.step-action-card span {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: #dc2626;
}

.step-dots-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dots-label {
  font-size: 11px;
  font-weight: 750;
  color: #8c785f;
}

.step-dots-row {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.dot-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f5efe2;
  border: 1px solid #ebdcc5;
  font-family: inherit;
  font-size: 11px;
  font-weight: 800;
  color: #7d6b56;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.16s ease;
}

.dot-btn.active {
  background: #f8c533;
  color: #302006;
  border-color: #e5b320;
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(248, 197, 51, 0.35);
}

.dot-btn.passed {
  background: #e2f2db;
  color: #2b7a18;
  border-color: #bbf7d0;
}

.guide-actions-row {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 6px;
}

.ios-button.primary {
  min-height: 44px;
  padding: 10px 18px;
  border-radius: 12px;
  background: #f8c533;
  color: #302006;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 850;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 3px 12px rgba(248, 197, 51, 0.3);
  transition: all 0.16s ease;
}

.ios-button.primary:hover {
  background: #fab918;
}

.ios-button.secondary {
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #f5efe2;
  border: 1px solid #ebdcc5;
  color: #4a3e2e;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ios-button.secondary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.flex-1 {
  flex: 1;
}

@media (max-width: 640px) {
  .guide-content-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .guide-image-wrapper {
    height: 320px;
    max-width: 180px;
  }
  .guide-header h3 {
    font-size: 13.5px;
  }
}

/* Dark Mode Luxury Obsidian Theme */
:global(html.dark) .install-guide-modal {
  color: #e6ded3;
}

:global(html.dark) .guide-header {
  border-bottom-color: #2e2518;
}

:global(html.dark) .guide-icon {
  background: #2b2214;
  color: #f59e0b;
  border: 1px solid #45351b;
}

:global(html.dark) .guide-title-row h3 {
  color: #fdfaf3 !important;
}

:global(html.dark) .guide-title-row p {
  color: #a89479 !important;
}

:global(html.dark) .step-indicator-badge {
  background: #2b2214 !important;
  color: #fcd34d !important;
  border: 1px solid #4a3818 !important;
}

:global(html.dark) .close-guide-btn {
  background: #2b2214 !important;
  color: #cbb9a3 !important;
  border-color: #3d3120 !important;
}

:global(html.dark) .close-guide-btn:hover {
  background: #382c1b !important;
  color: #ffffff !important;
}

:global(html.dark) .guide-image-wrapper {
  border-color: #3d3120;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  background: #000000;
}

:global(html.dark) .step-screenshot {
  background: #000000;
}

:global(html.dark) .step-tag-num {
  background: #3a290d !important;
  color: #fbbf24 !important;
  border: 1px solid #573e13 !important;
}

:global(html.dark) .step-tag-phase {
  color: #a89479 !important;
}

:global(html.dark) .step-main-title {
  color: #fef3c7 !important;
}

:global(html.dark) .step-main-desc {
  color: #cbb9a3 !important;
}

:global(html.dark) .step-action-card {
  background: rgba(220, 38, 38, 0.12) !important;
  border-color: rgba(239, 68, 68, 0.35) !important;
}

:global(html.dark) .action-card-icon {
  color: #ef4444 !important;
}

:global(html.dark) .step-action-card strong {
  color: #fca5a5 !important;
}

:global(html.dark) .step-action-card span {
  color: #f87171 !important;
}

:global(html.dark) .dots-label {
  color: #a89479 !important;
}

:global(html.dark) .dot-btn {
  background: #251f16 !important;
  border-color: #382d1c !important;
  color: #cbb9a3 !important;
}

:global(html.dark) .dot-btn.active {
  background: #f59e0b !important;
  color: #1a150c !important;
  border-color: #fbbf24 !important;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.45) !important;
}

:global(html.dark) .dot-btn.passed {
  background: #142a18 !important;
  border-color: #166534 !important;
  color: #4ade80 !important;
}

:global(html.dark) .ios-button.secondary {
  background: #251f16 !important;
  border-color: #382d1c !important;
  color: #e2d7c5 !important;
}

:global(html.dark) .ios-button.secondary:hover {
  background: #2e261b !important;
  color: #ffffff !important;
}

:global(html.dark) .ios-button.primary {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: #1a150c !important;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35) !important;
}
</style>
