<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  verificationText?: string;
  verificationState?: string;
  config?: {
    apkUrl: string;
    backupApkUrl: string;
    fileName: string;
    versionName: string;
    fileSize: string;
    features: string[];
  };
}>();

const emit = defineEmits<{
  (e: 'download-apk', url?: string): void;
  (e: 'download-backup', url?: string): void;
  (e: 'switch-platform', platform: 'ios'): void;
  (e: 'verify-click'): void;
  (e: 'navigate', id: string): void;
}>();

const currentStep = ref<number>(0);
const downloadStarted = ref<boolean>(false);

function handleDownload() {
  downloadStarted.value = true;
  emit('download-apk', props.config?.apkUrl);
}

function handleBackupDownload() {
  emit('download-backup', props.config?.backupApkUrl);
}
</script>

<template>
  <section id="apk-download" class="ios-card apk-setup-card" aria-labelledby="apk-title">
    <!-- Card Heading -->
    <div class="card-heading">
      <div class="heading-icon android-green">
        <i class="fa-brands fa-android" aria-hidden="true"></i>
      </div>
      <div>
        <h2 id="apk-title">2. Tải APK trên Android</h2>
        <p>Cài 1 lần bằng file APK. Không cần cài DNS.</p>
      </div>
      <span class="apk-badge">
        <i class="fa-solid fa-sparkles" aria-hidden="true"></i> Mod Gold
      </span>
    </div>

    <!-- Android Device Hint -->
    <p class="apk-device-hint">
      <i class="fa-brands fa-android" aria-hidden="true"></i>
      <span>Dành cho máy Android (Samsung, Xiaomi, Oppo,...). Hãy gỡ Locket gốc trước khi cài bản Gold.</span>
    </p>

    <!-- Stepper Tabs -->
    <div class="apk-step-tabs" role="tablist" aria-label="Các bước cài đặt APK">
      <button
        type="button"
        id="apk-tab-0"
        role="tab"
        :aria-selected="currentStep === 0"
        :class="{ active: currentStep === 0 }"
        @click="currentStep = 0"
      >
        <span>1</span> Tải APK
      </button>

      <button
        type="button"
        id="apk-tab-1"
        role="tab"
        :aria-selected="currentStep === 1"
        :class="{ active: currentStep === 1 }"
        @click="currentStep = 1"
      >
        <span>2</span> Cài đặt
      </button>

      <button
        type="button"
        id="apk-tab-2"
        role="tab"
        :aria-selected="currentStep === 2"
        :class="{ active: currentStep === 2 }"
        @click="currentStep = 2"
      >
        <span>3</span> Đăng nhập
      </button>
    </div>

    <!-- Step Status Line -->
    <div class="apk-step-status" aria-live="polite">
      Bước {{ currentStep + 1 }} / 3 · {{ currentStep === 0 ? 'Tải tệp cài đặt APK' : currentStep === 1 ? 'Cài đặt vào điện thoại' : 'Đăng nhập & Nhận Gold' }}
    </div>

    <!-- Step 0: Tải APK -->
    <div v-show="currentStep === 0" class="step-panel">
      <div class="step-body">
        <h3 class="step-title">Tải file Locket Gold APK</h3>
        <p class="step-desc">
          Bấm nút bên dưới để tải file APK về máy. Khi trình duyệt hỏi, chọn <strong>Vẫn tải xuống</strong>.
        </p>

        <!-- APK File Preview Box -->
        <div class="apk-file-preview">
          <div class="apk-preview-header">
            <div class="apk-app-icon">
              <img src="/assets/locket-widget.svg" width="34" height="34" alt="Locket Gold" aria-hidden="true">
            </div>
            <div class="apk-app-meta">
              <strong>{{ config?.fileName || 'Locket_Gold_v2.6.0.apk' }}</strong>
              <span>Dung lượng: {{ config?.fileSize || '48.5 MB' }} · {{ config?.versionName || 'Phiên bản mới nhất' }}</span>
            </div>
            <span class="apk-status-pill">
              <i class="fa-solid fa-shield-check" aria-hidden="true"></i> An toàn
            </span>
          </div>

          <div class="apk-features-list">
            <template v-if="config?.features && config.features.length">
              <div v-for="(feat, idx) in config.features" :key="idx" class="apk-feature-item">
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                <span>{{ feat }}</span>
              </div>
            </template>
            <template v-else>
              <div class="apk-feature-item">
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                <span>Mở khóa video 30 giây &amp; huy hiệu Gold</span>
              </div>
              <div class="apk-feature-item">
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                <span>Tải ảnh &amp; video khoảnh khắc sắc nét 4K</span>
              </div>
              <div class="apk-feature-item">
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                <span>Đồng bộ tài khoản Locket chính chủ 100%</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="step-actions">
        <!-- Main Download Button: native link with fallback handler -->
        <a
          :href="config?.apkUrl || '#'"
          :download="config?.fileName || 'locket.apk'"
          target="_blank"
          rel="noopener noreferrer"
          @click="handleDownload"
          class="ios-button primary full-width"
          style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;"
          aria-label="Tải file APK Locket Gold cho Android"
        >
          <i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i>
          <span>Tải {{ config?.fileName || 'file APK Locket Gold' }} ({{ config?.fileSize || '48.5 MB' }}) →</span>
        </a>

        <p class="apk-download-subtext">
          <i class="fa-solid fa-bolt" aria-hidden="true"></i>
          Tải tốc độ cao từ máy chủ CDN. Nếu bị chặn, hãy thử
          <a :href="config?.backupApkUrl || '#'" @click.prevent="handleBackupDownload" class="sublink" target="_blank" rel="noopener noreferrer">Link dự phòng</a>.
        </p>

        <button
          type="button"
          class="apk-advance-btn"
          @click="currentStep = 1"
        >
          <span>Đã tải xong · Sang bước cài đặt</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <!-- Step 1: Cài đặt APK -->
    <div v-show="currentStep === 1" class="step-panel">
      <div class="step-body">
        <h3 class="step-title">Cài đặt APK vào máy</h3>
        <p class="step-desc">
          Mở file vừa tải về trong thanh thông báo hoặc thư mục <strong>Tệp đã tải xuống (Downloads)</strong>.
        </p>

        <div class="apk-guide-list">
          <div class="apk-guide-card">
            <span class="guide-num">1</span>
            <div class="guide-text">
              <strong>Chọn Cài đặt</strong>
              <p>Chạm vào file <code>Locket_Gold_v2.6.0.apk</code> vừa tải về.</p>
            </div>
          </div>

          <div class="apk-guide-card highlighted">
            <span class="guide-num">2</span>
            <div class="guide-text">
              <strong>Cho phép từ nguồn này (nếu được hỏi)</strong>
              <p>Vào Cài đặt khi có thông báo &gt; Bật công tắc <em>Cho phép cài đặt ứng dụng từ nguồn này</em>.</p>
            </div>
          </div>

          <div class="apk-guide-card">
            <span class="guide-num">3</span>
            <div class="guide-text">
              <strong>Bấm Cài đặt &amp; Mở app</strong>
              <p>Chờ vài giây để hệ thống cài đặt hoàn tất, sau đó chọn Mở.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="step-actions">
        <button
          type="button"
          class="ios-button primary full-width"
          @click="currentStep = 2"
        >
          <span>Đã cài đặt xong · Sang bước đăng nhập →</span>
        </button>

        <button
          type="button"
          class="apk-back-btn"
          @click="currentStep = 0"
        >
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          <span>Quay lại bước tải APK</span>
        </button>
      </div>
    </div>

    <!-- Step 2: Đăng nhập & Hoàn tất -->
    <div v-show="currentStep === 2" class="step-panel">
      <div class="step-body">
        <h3 class="step-title">Đăng nhập &amp; Kích hoạt Gold</h3>
        <p class="step-desc">
          Mở ứng dụng Locket Gold và đăng nhập số điện thoại của bạn như bình thường.
        </p>

        <div class="apk-complete-box">
          <div class="complete-icon">
            <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
          </div>
          <h4>Sẵn sàng tận hưởng Locket Gold!</h4>
          <p>
            Nhớ hoàn tất <strong>Bước 1 (Nhập username)</strong> ở card bên cạnh để hệ thống đồng bộ gói Gold vào tài khoản của bạn.
          </p>

          <div class="complete-tip">
            <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>Trên Android không cần cài cấu hình DNS hay chứng chỉ CA như iPhone.</span>
          </div>
        </div>
      </div>

      <div class="step-actions">
        <button
          type="button"
          class="ios-button primary full-width"
          @click="emit('verify-click')"
        >
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <span>Kiểm tra trạng thái kích hoạt →</span>
        </button>

        <button
          type="button"
          class="apk-back-btn"
          @click="currentStep = 1"
        >
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          <span>Quay lại bước cài đặt</span>
        </button>
      </div>
    </div>

    <!-- Switch to iOS Pill shortcut -->
    <div class="apk-switch-ios-row">
      <button
        type="button"
        class="switch-platform-pill"
        @click="emit('switch-platform', 'ios')"
        title="Chuyển sang hướng dẫn Cài DNS cho iPhone"
      >
        <i class="fa-brands fa-apple" aria-hidden="true"></i>
        <span>Đang dùng iPhone / iPad? Xem hướng dẫn Cài DNS iOS →</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.apk-setup-card {
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #ebd7b2;
  border-radius: 20px;
  box-shadow: 0 4px 18px rgba(180, 130, 40, 0.05);
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
  position: relative;
}

.heading-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
}

.heading-icon.android-green {
  background: linear-gradient(145deg, #10b981, #059669);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.card-heading h2 {
  font-size: 19px;
  font-weight: 850;
  color: #2b2216;
  margin: 0;
  line-height: 1.25;
}

.card-heading p {
  font-size: 11.5px;
  color: #8c714a;
  margin: 2px 0 0;
  font-weight: 600;
}

.apk-badge {
  margin-left: auto;
  padding: 4px 10px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 850;
  color: #059669;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.apk-device-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  color: #166534;
  margin: 0 0 16px;
  line-height: 1.4;
}

.apk-step-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  background: #fdfaf3;
  padding: 5px;
  border: 1px solid #eedebf;
  border-radius: 14px;
  margin-bottom: 12px;
}

.apk-step-tabs button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 850;
  color: #8c714a;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.16s ease;
}

.apk-step-tabs button > span {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: #e8d7b7;
  color: #5c431b;
  font-size: 11px;
  display: grid;
  place-items: center;
  font-weight: 900;
}

.apk-step-tabs button.active {
  background: #ffffff;
  color: #166534;
  box-shadow: 0 2px 8px rgba(180, 130, 40, 0.12);
}

.apk-step-tabs button.active > span {
  background: #10b981;
  color: #ffffff;
}

.apk-step-status {
  font-size: 11px;
  font-weight: 800;
  color: #9c8360;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 14px;
}

.step-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step-body {
  flex: 1;
}

.step-title {
  font-size: 15px;
  font-weight: 850;
  color: #2b2216;
  margin: 0 0 4px;
}

.step-desc {
  font-size: 12px;
  color: #7a6344;
  line-height: 1.5;
  margin: 0 0 14px;
}

/* APK File Preview */
.apk-file-preview {
  background: #faf6ed;
  border: 1px solid #ebd7b2;
  border-radius: 15px;
  padding: 16px;
  margin-bottom: 18px;
}

.apk-preview-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebd7b2;
}

.apk-app-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
}

.apk-app-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.apk-app-meta strong {
  font-size: 13.5px;
  font-weight: 850;
  color: #2b2216;
}

.apk-app-meta span {
  font-size: 11px;
  color: #8c714a;
  font-weight: 600;
}

.apk-status-pill {
  padding: 3px 8px;
  background: #dcfce7;
  border: 1px solid #86efac;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 850;
  color: #15803d;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.apk-features-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-top: 12px;
}

.apk-feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 700;
  color: #55442e;
}

.apk-feature-item i {
  color: #10b981;
  font-size: 12px;
}

.step-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ios-button.full-width {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 20px;
  font-size: 13.5px;
  font-weight: 850;
  border-radius: 999px;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.16s ease;
}

.apk-download-subtext {
  font-size: 11px;
  color: #8c714a;
  text-align: center;
  margin: 0;
  font-weight: 600;
}

.apk-download-subtext .sublink {
  color: #10b981;
  text-decoration: underline;
  font-weight: 800;
}

.apk-advance-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 850;
  color: #8c714a;
  cursor: pointer;
  padding: 6px;
  font-family: inherit;
  transition: color 0.16s ease;
}

.apk-advance-btn:hover {
  color: #2b2216;
}

.apk-back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 11.5px;
  font-weight: 800;
  color: #9c8360;
  cursor: pointer;
  padding: 4px;
  font-family: inherit;
}

.apk-back-btn:hover {
  color: #55442e;
}

/* Step 1 Guide List */
.apk-guide-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 18px;
}

.apk-guide-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: #faf6ed;
  border: 1px solid #ebd7b2;
  border-radius: 12px;
}

.apk-guide-card.highlighted {
  background: #ecfdf5;
  border-color: #a7f3d0;
}

.guide-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e8d7b7;
  color: #5c431b;
  font-size: 11px;
  font-weight: 900;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.apk-guide-card.highlighted .guide-num {
  background: #10b981;
  color: #ffffff;
}

.guide-text strong {
  display: block;
  font-size: 12.5px;
  font-weight: 850;
  color: #2b2216;
  margin-bottom: 2px;
}

.guide-text p {
  margin: 0;
  font-size: 11px;
  color: #7a6344;
  line-height: 1.4;
}

.guide-text code {
  background: rgba(0, 0, 0, 0.05);
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 10.5px;
}

/* Step 2 Complete Box */
.apk-complete-box {
  background: #faf6ed;
  border: 1px solid #ebd7b2;
  border-radius: 15px;
  padding: 22px 18px;
  text-align: center;
  margin-bottom: 18px;
}

.complete-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ecfdf5;
  color: #10b981;
  font-size: 24px;
  display: grid;
  place-items: center;
  margin: 0 auto 12px;
}

.apk-complete-box h4 {
  font-size: 15px;
  font-weight: 850;
  color: #2b2216;
  margin: 0 0 6px;
}

.apk-complete-box p {
  font-size: 12px;
  color: #7a6344;
  line-height: 1.5;
  margin: 0 0 14px;
}

.complete-tip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  color: #166534;
  text-align: left;
}

/* Switch iOS row */
.apk-switch-ios-row {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed #ebd7b2;
  text-align: center;
}

.switch-platform-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: transparent;
  border: none;
  font-size: 11.5px;
  font-weight: 800;
  color: #8c714a;
  cursor: pointer;
  padding: 4px 8px;
  font-family: inherit;
  transition: all 0.16s ease;
}

.switch-platform-pill:hover {
  color: #b45309;
}

@media (max-width: 760px) {
  .apk-setup-card {
    padding: 21px !important;
    border-radius: 21px !important;
  }
  .card-heading {
    flex-wrap: wrap;
    row-gap: 8px;
  }
  .card-heading h2 {
    font-size: 16px;
    line-height: 1.35;
  }
  .apk-badge {
    margin-left: 0;
    font-size: 10.5px;
  }
  .apk-file-preview {
    padding: 12px;
  }
  .apk-app-icon {
    width: 38px;
    height: 38px;
  }
  .apk-app-meta strong {
    font-size: 13px;
  }
  .apk-app-meta span {
    font-size: 10px;
  }
}
</style>
