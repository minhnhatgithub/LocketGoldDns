<script setup lang="ts">
defineProps<{
  currentStep: number;
  verificationText: string;
  verificationState: string;
}>();

const emit = defineEmits<{
  (e: 'update:currentStep', step: number): void;
  (e: 'download'): void;
  (e: 'verify-click'): void;
  (e: 'copy-page-link'): void;
  (e: 'open-guide', stepIdx?: number): void;
}>();
</script>

<template>
  <section id="dns-guide" class="ios-card dns-setup-card" aria-labelledby="dns-title">
    <!-- Card Heading -->
    <div class="card-heading">
      <div class="heading-icon purple">
        <i class="fa-solid fa-sliders" aria-hidden="true"></i>
      </div>
      <div>
        <h2 id="dns-title">2. Cài DNS trên iPhone</h2>
        <p>Cài một lần. Chọn từng bước để xem cách làm.</p>
      </div>
      <button
        type="button"
        class="open-photo-guide-pill"
        @click="emit('open-guide', 0)"
        title="Xem 8 bước ảnh chụp thực tế đã khoanh đỏ"
      >
        <i class="fa-solid fa-camera" aria-hidden="true"></i>
        <span>Ảnh thực tế</span>
      </button>
    </div>

    <!-- Safari Device Hint -->
    <p id="dns-device-hint" class="dns-device-hint">
      <i class="fa-solid fa-compass" aria-hidden="true"></i>
      <span>Hãy mở trang này bằng Safari trên iPhone hoặc iPad để cài DNS. Có thể sao chép liên kết ở bên dưới.</span>
    </p>

    <!-- Stepper Tabs -->
    <div class="dns-step-tabs" role="tablist" aria-label="Các bước cài DNS">
      <button
        type="button"
        id="dns-tab-0"
        role="tab"
        :aria-selected="currentStep === 0"
        :class="{ active: currentStep === 0 }"
        @click="emit('update:currentStep', 0)"
      >
        <span>1</span> Tải hồ sơ
      </button>

      <button
        type="button"
        id="dns-tab-1"
        role="tab"
        :aria-selected="currentStep === 1"
        :class="{ active: currentStep === 1 }"
        @click="emit('update:currentStep', 1)"
      >
        <span>2</span> Cài hồ sơ
      </button>

      <button
        type="button"
        id="dns-tab-2"
        role="tab"
        :aria-selected="currentStep === 2"
        :class="{ active: currentStep === 2 }"
        @click="emit('update:currentStep', 2)"
      >
        <span>3</span> Hoàn tất
      </button>
    </div>

    <!-- Step Status Line -->
    <div id="dns-guide-step-status" class="dns-guide-step-status" aria-live="polite">
      Bước {{ currentStep + 1 }} / 3 · {{ currentStep === 0 ? 'Tải hồ sơ DNS' : currentStep === 1 ? 'Cài đặt hồ sơ' : 'Kích hoạt Gold' }}
    </div>

    <!-- Step 0: Tải hồ sơ -->
    <div v-show="currentStep === 0" class="step-panel">
      <div class="step-body">
        <h3 class="step-title">Tải hồ sơ về iPhone</h3>
        <p class="step-desc">Bấm nút bên dưới. Khi Safari hỏi tải hồ sơ cấu hình, chọn <strong>Cho phép</strong>.</p>

        <!-- Simulated Safari Prompt -->
        <figure class="dns-settings-preview" aria-label="Minh họa thông báo tải hồ sơ trên iPhone" @click="emit('open-guide', 0)">
          <div class="preview-app">
            <i class="fa-brands fa-safari" aria-hidden="true"></i> Safari
            <span>Minh họa</span>
          </div>
          <div class="profile-prompt">
            <strong>Tải hồ sơ cấu hình?</strong>
            <p>Trang web muốn tải về một hồ sơ cấu hình.</p>
            <div>
              <span>Bỏ qua</span>
              <span class="prompt-allow">Cho phép <i class="fa-solid fa-check" aria-hidden="true"></i></span>
            </div>
          </div>
        </figure>
      </div>

      <div class="step-actions">
        <button type="button" @click="emit('download')" class="ios-button primary full-width">
          <i class="fa-solid fa-download" aria-hidden="true"></i>
          <span>Tải hồ sơ DNS cho iPhone</span>
        </button>

        <p class="dns-small-note">Xem thông tin DNS và chứng chỉ iPhone hiển thị trước khi xác nhận cài.</p>

        <button type="button" @click="emit('update:currentStep', 1)" class="dns-continue">
          <span>Đã tải xong · Sang bước cài hồ sơ</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>

        <p class="dns-small-note">Nếu chưa thấy thông báo, hãy mở liên kết bằng Safari.</p>
      </div>
    </div>

    <!-- Step 1: Cài hồ sơ trong Cài đặt -->
    <div v-show="currentStep === 1" class="step-panel">
      <div class="step-body">
        <h3 class="step-title">Mở Cài đặt để cài hồ sơ</h3>
        <p class="step-desc">Rời Safari, mở ứng dụng <strong>Cài đặt</strong> trên iPhone rồi làm như sau:</p>

        <!-- Settings Visual Path with thumbnails -->
        <div class="settings-guide-card">
          <div class="guide-item highlighted" @click="emit('open-guide', 1)">
            <img src="/assets/steps/step2.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>1. Mở Quản lý VPN & thiết bị</strong>
              <span>Vào Cài đặt chung → Quản lý VPN & thiết bị</span>
            </div>
            <span class="badge-red-circle">Khoanh đỏ</span>
          </div>

          <div class="guide-item" @click="emit('open-guide', 2)">
            <img src="/assets/steps/step3.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>2. Chọn MinhNhat Locket Gold</strong>
              <span>Hồ sơ đã tải về ở đầu trang</span>
            </div>
            <span class="badge-red-circle">Khoanh đỏ</span>
          </div>

          <div class="guide-item" @click="emit('open-guide', 3)">
            <img src="/assets/steps/step4.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>3. Bấm "Cài đặt" ở góc trên cùng</strong>
              <span>Xác nhận mật khẩu máy nếu có</span>
            </div>
            <span class="apple-blue-tag">Cài đặt</span>
          </div>

          <div class="guide-item" @click="emit('open-guide', 4)">
            <img src="/assets/steps/step5.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>4. Xác nhận Cài đặt lần cuối</strong>
              <span>Bấm "Cài đặt" ở góc trên khi hiện Cảnh báo</span>
            </div>
            <i class="fa-solid fa-circle-check check-success-icon" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div class="step-actions step-nav-actions">
        <button type="button" @click="emit('update:currentStep', 0)" class="ios-button secondary">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Quay lại
        </button>
        <button type="button" @click="emit('update:currentStep', 2)" class="ios-button primary flex-1">
          <span>Tiếp tục: Bước 3</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <!-- Step 2: Hoàn tất & Tin cậy CA -->
    <div v-show="currentStep === 2" class="step-panel">
      <div class="step-body">
        <h3 class="step-title">Mở Locket, rồi kiểm tra Gold</h3>
        <p class="step-desc">Đóng rồi mở lại ứng dụng <strong>Locket</strong>. Sau đó quay lại trang này và bấm <strong>Kiểm tra kích hoạt</strong>.</p>

        <!-- CA Trust Steps with thumbnails -->
        <div class="settings-guide-card">
          <div class="guide-item" @click="emit('open-guide', 5)">
            <img src="/assets/steps/step6.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>Vào Cài đặt chung → Giới thiệu</strong>
              <span>Chọn dòng Giới thiệu ở đầu</span>
            </div>
            <span class="badge-red-circle">Khoanh đỏ</span>
          </div>

          <div class="guide-item" @click="emit('open-guide', 6)">
            <img src="/assets/steps/step7.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>Cài đặt tin cậy chứng nhận</strong>
              <span>Cuộn xuống dưới cùng của trang Giới thiệu</span>
            </div>
            <span class="badge-red-circle">Khoanh đỏ</span>
          </div>

          <div class="guide-item highlighted" @click="emit('open-guide', 7)">
            <img src="/assets/steps/step8.jpg" class="mini-step-thumb" alt="" />
            <div class="item-text">
              <strong>Bật MinhNhat Root CA</strong>
              <span>Gạt công tắc sang màu xanh lá</span>
            </div>
            <span class="switch-green-badge">Bật xanh</span>
          </div>
        </div>

        <div class="locket-app-prompt">
          <div class="locket-app-icon">
            <img src="/assets/locket-widget.svg" class="locket-logo" width="40" height="40" alt="" aria-hidden="true">
          </div>
          <div class="locket-app-meta">
            <strong>Sau cùng: Mở lại app Locket</strong>
            <span>Đóng đa nhiệm rồi mở lại Locket để nhận Gold.</span>
          </div>
        </div>
      </div>

      <div class="step-actions">
        <button type="button" @click="emit('verify-click')" class="ios-button primary full-width">
          <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
          <span>Kiểm tra trạng thái kích hoạt</span>
        </button>

        <button type="button" @click="emit('update:currentStep', 1)" class="dns-continue">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
          <span>Quay lại bước cài hồ sơ</span>
        </button>
      </div>
    </div>

    <!-- Verification status indicator -->
    <p id="dns-verification-status" class="dns-verification-status" role="status" aria-live="polite">
      <i class="fa-regular fa-clock" aria-hidden="true"></i>
      <span>{{ verificationText || 'Chưa kiểm tra trạng thái kích hoạt.' }}</span>
    </p>

    <!-- Collapsible Help Accordions -->
    <details class="dns-other-device">
      <summary>Đang mở trang trên máy tính hoặc trình duyệt khác?</summary>
      <p>Sao chép liên kết này và mở bằng <strong>Safari trên iPhone</strong>.</p>
      <div class="dns-copy-row">
        <label class="sr-only" for="dns-page-link">Liên kết hướng dẫn cài DNS</label>
        <input id="dns-page-link" readonly value="https://locketgold.space/#dns-guide" type="text">
        <button type="button" class="ios-button secondary" @click="emit('copy-page-link')">
          <i class="fa-regular fa-copy" aria-hidden="true"></i> Sao chép
        </button>
      </div>
    </details>

    <details id="dns-help" class="dns-other-device">
      <summary>Cài rồi nhưng chưa có Gold?</summary>
      <p>Kiểm tra hồ sơ còn trong <strong>Cài đặt → Cài đặt chung → Quản lý VPN & Thiết bị</strong>. Nếu hồ sơ yêu cầu chứng chỉ, xem mục bật tin cậy ở bước 3. Đóng rồi mở lại Locket, sau đó kiểm tra trạng thái.</p>
      <p>Đổi sang iPhone khác? Vào <a href="#lookup-box">Kiểm tra tài khoản</a> để đặt lại DNS cho thiết bị mới.</p>
    </details>
  </section>
</template>

<style scoped>
.dns-setup-card {
  background: #ffffff;
  border: 1px solid #e8e8ed;
  border-radius: 20px;
  padding: 24px 26px;
  box-shadow: 0 3px 7px #00000002;
  font-family: 'Nunito', sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-heading {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-bottom: 12px;
  position: relative;
}

.heading-icon {
  width: 37px;
  height: 37px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 15px;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 #ffffff99, 0 3px 8px #00000004;
}

.heading-icon.purple {
  background: linear-gradient(145deg, #eee0ff, #ddc8f4);
  color: #9164bf;
}

.card-heading h2 {
  font-size: 17px;
  font-weight: 850;
  color: #2b2216;
  margin: 0 0 3px;
  line-height: 1.25;
}

.card-heading p {
  font-size: 11px;
  color: #a78d69;
  font-weight: 650;
  margin: 0;
}

.open-photo-guide-pill {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 850;
  color: #8a5a14;
  background: #fff4d8;
  border: 1px solid #ebd4a2;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.16s ease;
}

.open-photo-guide-pill:hover {
  background: #fde8b8;
  transform: translateY(-1px);
}

.dns-device-hint {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #fff2d2;
  border: 1px solid #efdbab;
  color: #8b6b37;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 11.5px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.dns-device-hint > i {
  margin-top: 2px;
  font-size: 14px;
}

/* Stepper Tabs - Authentic luna4k Segmented Control */
.dns-step-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  background: #f6ecd7;
  border: 1px solid #ecdfc4;
  border-radius: 12px;
  padding: 3px;
  margin-bottom: 8px;
}

.dns-step-tabs button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #9b845f;
  background: transparent;
  border: 0;
  border-radius: 9px;
  min-height: 33px;
  padding: 5px 3px;
  font-size: 11px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
}

.dns-step-tabs button > span {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #e9dbc2;
  display: grid;
  place-items: center;
  font-size: 9.5px;
  font-weight: 900;
  color: #6a573b;
}

.dns-step-tabs button.active {
  background: #ffffff;
  color: #5c3b00;
  box-shadow: 0 2px 6px rgba(120, 70, 0, 0.08);
}

.dns-step-tabs button.active > span {
  background: #f8c533;
  color: #302006;
}

.dns-guide-step-status {
  font-size: 10.5px;
  font-weight: 800;
  color: #a18c69;
  margin: 0 0 8px;
}

.step-title {
  font-size: 15.5px;
  font-weight: 900;
  color: #2b2216;
  margin: 0 0 2px;
}

.step-desc {
  font-size: 12px;
  color: #6b5a47;
  line-height: 1.5;
  margin: 0;
}

/* Simulated Safari Prompt */
.dns-settings-preview {
  margin: 8px 0 10px;
  border: 1px solid #e7dfce;
  border-radius: 13px;
  overflow: hidden;
  background: #f8f6f0;
  cursor: pointer;
  transition: all 0.16s ease;
}

.dns-settings-preview:hover {
  border-color: #f59e0b;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.preview-app {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  background: #fffdf9;
  border-bottom: 1px solid #ece4d5;
  font-size: 10.5px;
  color: #807359;
  font-weight: 850;
}

.preview-app > span {
  margin-left: auto;
  font-size: 8.5px;
  color: #b4a78e;
  font-weight: 600;
}

.profile-prompt {
  max-width: 245px;
  margin: 8px auto;
  background: #fffefa;
  border: 1px solid #e5dfd4;
  border-radius: 11px;
  text-align: center;
  box-shadow: 0 3px 8px #60533108;
}

.profile-prompt > strong {
  display: block;
  margin: 8px 8px 3px;
  font-size: 11.5px;
  color: #5d5648;
  font-weight: 850;
}

.profile-prompt > p {
  margin: 0 8px 8px;
  font-size: 10px;
  color: #8e8471;
  line-height: 1.45;
}

.profile-prompt > div {
  display: flex;
  border-top: 1px solid #ede7dc;
  font-size: 10.5px;
}

.profile-prompt > div > span {
  flex: 1;
  padding: 6px 4px;
  color: #8c826e;
}

.profile-prompt > div > span + span {
  border-left: 1px solid #ede7dc;
}

.prompt-allow {
  font-weight: 850;
  color: #1a7fe8 !important;
}

/* Action Buttons */
.step-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
}

.dns-small-note {
  font-size: 10px;
  text-align: center;
  color: #a18c69;
  margin: 3px 0 1px;
}

.dns-continue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  padding: 5px 3px 2px;
  min-height: 28px;
  font-size: 11.5px;
  color: #a47320;
  font-weight: 800;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.dns-continue:hover {
  text-decoration: underline;
}

/* Settings Visual Path */
.settings-guide-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0 14px;
}

.guide-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #fdfbf7;
  border: 1px solid #ebdcc5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.guide-item:hover {
  background: #fff8eb;
  border-color: #ea580c;
  transform: translateY(-1px);
}

.guide-item.highlighted {
  background: #fffdf5;
  border-color: #f59e0b;
}

.mini-step-thumb {
  width: 38px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ebdcc5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.item-text {
  flex: 1;
  min-width: 0;
}

.item-text strong {
  display: block;
  font-size: 12.5px;
  color: #2b2216;
}

.item-text span {
  display: block;
  font-size: 11px;
  color: #7d6b56;
}

.badge-red-circle {
  font-size: 10px;
  font-weight: 850;
  color: #dc2626;
  background: #fee2e2;
  padding: 2px 6px;
  border-radius: 5px;
}

.apple-blue-tag {
  font-size: 11px;
  font-weight: 850;
  color: #007aff;
  background: #f0f7ff;
  padding: 3px 8px;
  border-radius: 6px;
}

.switch-green-badge {
  font-size: 10.5px;
  font-weight: 850;
  color: #16a34a;
  background: #dcfce7;
  padding: 2px 7px;
  border-radius: 5px;
}

.check-success-icon {
  font-size: 14px;
  color: #16a34a;
}

.step-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.flex-1 {
  flex: 1;
}

/* Locket App Prompt */
.locket-app-prompt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: #fffdf5;
  border: 1px solid #ebdcc5;
  border-radius: 14px;
  margin: 12px 0 14px;
}

.locket-app-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f8c533;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.locket-app-meta {
  flex: 1;
}

.locket-app-meta strong {
  display: block;
  font-size: 13px;
  color: #2b2216;
}

.locket-app-meta span {
  display: block;
  font-size: 11px;
  color: #7d6b56;
  margin-top: 1px;
}

/* Verification status bar */
.dns-verification-status {
  margin-top: 8px;
  padding: 7px 11px;
  border-radius: 10px;
  background: #f6efdf;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 10.5px;
  line-height: 1.45;
  color: #9d8660;
}

.dns-verification-status i {
  margin-top: 2px;
}

/* Help Accordions */
.dns-other-device {
  margin-top: 6px;
  border: 1px solid #efdfc1;
  border-radius: 10px;
  background: #fffdf7;
}

.dns-other-device summary {
  padding: 7px 11px;
  font-size: 11px;
  color: #9c7940;
  font-weight: 800;
  cursor: pointer;
  line-height: 1.4;
}

.dns-other-device p {
  padding: 0 13px 10px;
  margin: 0;
  font-size: 11px;
  color: #8c7349;
  line-height: 1.65;
}

.dns-other-device a {
  color: #9c7940;
  font-weight: 700;
}

.dns-copy-row {
  display: flex;
  gap: 8px;
  padding: 0 13px 12px;
}

.dns-copy-row input {
  flex: 1;
  padding: 8px 10px;
  font-size: 11px;
  border: 1px solid #ebdcc5;
  border-radius: 8px;
  background: #ffffff;
  color: #7d6b56;
}

.dns-copy-row .ios-button {
  padding: 8px 12px;
  font-size: 11px;
}

@media (max-width: 600px) {
  .card-heading {
    flex-wrap: wrap;
    row-gap: 8px;
  }
  .card-heading h2 {
    font-size: 16px;
    line-height: 1.35;
  }
  .open-photo-guide-pill {
    margin-left: 0;
    margin-top: 2px;
    font-size: 10.5px;
    padding: 4px 10px;
  }
  .dns-step-tabs button {
    font-size: 11px;
    padding: 5px 2px;
  }
}
</style>
