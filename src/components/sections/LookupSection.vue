<script setup lang="ts">
const props = defineProps<{
  username: string;
  isLookingUp: boolean;
  result: {
    username: string;
    name?: string;
    avatar?: string | null;
    uid?: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    daysLeft: number;
    dnsConnected: boolean;
    expiresAt: string;
    refCode: string;
  } | null;
  lookupState?: 'idle' | 'loading' | 'found' | 'not_found' | 'error';
  lookupMessage?: string;
  queriedUser?: string;
}>();

const emit = defineEmits<{
  (e: 'update:username', val: string): void;
  (e: 'submit'): void;
  (e: 'copy-ref', code: string): void;
  (e: 'go-claim', username: string): void;
  (e: 'go-dns'): void;
}>();
</script>

<template>
  <div class="lookup-wrapper">
    <!-- Lookup Intro Section -->
    <section class="lookup-intro" aria-label="Bước kiểm tra kích hoạt">
      <span class="heading-icon blue">
        <i class="fa-solid fa-check-double" aria-hidden="true"></i>
      </span>
      <p>
        <strong>3. Mở Locket xong, kiểm tra tại đây</strong>
        <span>Hệ thống truy vấn trực tiếp máy chủ DNS để xác nhận trạng thái kích hoạt của tài khoản.</span>
      </p>
    </section>

    <!-- Lookup Box Card -->
    <section id="lookup-box" class="ios-card lookup-card" aria-labelledby="lookup-title">
      <div class="card-heading">
        <div class="heading-icon purple">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        </div>
        <div>
          <h2 id="lookup-title">Kiểm tra Gold đã kích hoạt chưa?</h2>
          <p>Nhập username hoặc liên kết locket.cam để kiểm tra trạng thái trên máy chủ.</p>
        </div>
        <span class="section-number">03</span>
      </div>

      <form id="lookup-form" class="lookup-form" @submit.prevent="emit('submit')">
        <div class="field">
          <label for="lookup-username" class="sr-only">Username cần tra cứu</label>
          <div class="input-wrap">
            <span aria-hidden="true" class="prefix-at">@</span>
            <input
              type="text"
              id="lookup-username"
              name="username"
              required
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              maxlength="16384"
              placeholder="Nhập username hoặc link locket.cam/..."
              :value="username"
              @input="emit('update:username', ($event.target as HTMLInputElement).value)"
            >
          </div>
        </div>

        <button type="submit" id="btn-lookup-submit" class="ios-button primary" :disabled="isLookingUp">
          <i v-if="isLookingUp" class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
          <i v-else class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <span>{{ isLookingUp ? 'Đang kiểm tra...' : 'Kiểm tra' }}</span>
        </button>
      </form>

      <!-- 1. LOADING STATE -->
      <div v-if="isLookingUp || lookupState === 'loading'" class="lookup-status-box loading-box" aria-live="polite">
        <div class="status-spinner">
          <i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
        </div>
        <div class="status-content">
          <h4>Đang kết nối máy chủ DNS...</h4>
          <p>Đang kiểm tra quyền truy cập Gold cho <strong>@{{ queriedUser || username }}</strong>.</p>
        </div>
      </div>

      <!-- 2. FOUND & ACTIVE (SUCCESS STATE) -->
      <div v-else-if="lookupState === 'found' && result" id="lookup-result-container" class="lookup-result-box" aria-live="polite">
        <div class="result-header">
          <div class="status-badge-active">
            <i class="fa-solid fa-check" aria-hidden="true"></i>
            <span>Locket Gold: ĐÃ KÍCH HOẠT</span>
          </div>
          <span class="vip-chip">VIP MEMBER</span>
        </div>

        <div class="result-grid">
          <div class="result-item">
            <span class="item-label">Tài khoản</span>
            <strong class="item-val">
              @{{ result.username }}
              <span v-if="result.name && result.name !== result.username" class="user-subname">({{ result.name }})</span>
            </strong>
          </div>
          <div class="result-item">
            <span class="item-label">Thời hạn</span>
            <strong class="item-val gold-val">+{{ result.daysLeft }} ngày Gold</strong>
          </div>
          <div class="result-item">
            <span class="item-label">DNS Máy chủ</span>
            <strong class="item-val success-val">● Đã liên kết &amp; Hoạt động</strong>
          </div>
          <div class="result-item">
            <span class="item-label">Hạn dùng</span>
            <strong class="item-val">{{ result.expiresAt }}</strong>
          </div>
          <div v-if="result.uid" class="result-item full-width-item">
            <span class="item-label">UID Locket</span>
            <span class="uid-code">{{ result.uid }}</span>
          </div>
        </div>

        <div class="result-actions-row">
          <button
            type="button"
            class="action-pill-btn gold"
            @click="emit('copy-ref', result.refCode)"
            title="Sao chép mã giới thiệu"
          >
            <i class="fa-regular fa-copy" aria-hidden="true"></i>
            <span>Mã mời: <b>{{ result.refCode }}</b> (+25 ngày)</span>
          </button>
          <button
            type="button"
            class="action-pill-btn secondary"
            @click="emit('go-dns')"
          >
            <i class="fa-solid fa-sliders" aria-hidden="true"></i>
            <span>Cài đặt lại DNS</span>
          </button>
        </div>
      </div>

      <!-- 3. NOT FOUND (CHƯA KÍCH HOẠT) -->
      <div v-else-if="lookupState === 'not_found'" class="lookup-status-box not-found-box" aria-live="polite">
        <div class="status-icon-badge amber">
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
        </div>
        <div class="status-content">
          <h4>Chưa kích hoạt Gold cho @{{ queriedUser || username }}</h4>
          <p>
            Tài khoản này chưa có trong danh sách được cấp quyền trên máy chủ DNS. Bạn có thể bấm nút bên dưới để nhận 3 ngày dùng thử miễn phí ngay lập tức!
          </p>
          <div class="not-found-action">
            <button
              type="button"
              class="ios-button primary cta-claim-btn"
              @click="emit('go-claim', queriedUser || username)"
            >
              <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
              <span>Nhận 3 ngày dùng thử ngay</span>
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. ERROR STATE -->
      <div v-else-if="lookupState === 'error'" class="lookup-status-box error-box" aria-live="polite">
        <div class="status-icon-badge red">
          <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
        </div>
        <div class="status-content">
          <h4>Không thể hoàn tất kiểm tra</h4>
          <p>{{ lookupMessage || 'Vui lòng kiểm tra lại username hoặc kết nối mạng của bạn.' }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lookup-wrapper {
  margin: 29px 0 0;
  font-family: 'Nunito', sans-serif;
}

.lookup-intro {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 29px 2px 15px;
}

.lookup-intro > p {
  min-width: 0;
  margin: 0;
}

.lookup-intro strong {
  display: block;
  color: #7d5825;
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
}

.lookup-intro span:not(.heading-icon) {
  display: block;
  color: #9d835b;
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.6;
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

.heading-icon.blue {
  background: linear-gradient(145deg, #ffe9a1, #ffce5b);
  color: #a96b06;
}

.heading-icon.purple {
  background: linear-gradient(145deg, #eee0ff, #ddc8f4);
  color: #9164bf;
}

.lookup-card {
  background: linear-gradient(115deg, #fffdfb 45%, #f6f0ff);
  border: 1px solid #e9def2;
  border-radius: 20px;
  padding: 22px 25px;
  box-shadow: 0 3px 7px #00000002;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 16px;
}

.card-heading h2 {
  font-size: 17px;
  font-weight: 900;
  color: #2b2216;
  margin: 0;
}

.card-heading p {
  font-size: 11.5px;
  color: #8c785d;
  margin: 2px 0 0;
}

.section-number {
  color: #ad8acb;
  font-size: 9px;
  font-weight: 900;
  flex-shrink: 0;
  margin-left: auto;
  align-self: flex-start;
  border: none;
}

.lookup-form {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.lookup-form .field {
  flex: 1;
  margin: 0;
}

.input-wrap {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e8e4dc;
  border-radius: 13px;
  padding: 0 14px;
  min-height: 48px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.18s ease;
}

.input-wrap:focus-within {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.14);
}

.prefix-at {
  font-size: 14px;
  font-weight: 800;
  color: #b59f81;
  margin-right: 8px;
}

.input-wrap input {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
  width: 100% !important;
  padding: 12px 0 !important;
  font-family: inherit !important;
  font-size: 15px !important;
  font-weight: 650 !important;
  color: #2b2216 !important;
}

.input-wrap input::placeholder {
  color: #aa9780;
  font-weight: 500;
}

.ios-button.primary {
  min-height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffc638, #ffb400);
  border: 1px solid #f5bb29;
  color: #5c3b00;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 0 #d79b1f, 0 7px 14px rgba(233, 184, 53, 0.25);
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.16s ease;
}

.ios-button.primary:hover {
  background: linear-gradient(180deg, #ffd15b, #ffbd1e);
  transform: translateY(-1px);
  box-shadow: 0 5px 0 #d79b1f, 0 10px 17px rgba(233, 184, 53, 0.3);
}

/* Success Result Box */
.lookup-result-box {
  margin-top: 18px;
  padding: 20px 22px;
  border-radius: 16px;
  background: #fdfbf5;
  border: 1px solid #ebd8b6;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.02);
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.status-badge-active {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 850;
  color: #15803d;
}

.status-badge-active i {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #22c55e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.vip-chip {
  padding: 3px 8px;
  border-radius: 8px;
  background: #faecd1;
  color: #784a00;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.06em;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  background: #ffffff;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #f3ece0;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.full-width-item {
  grid-column: 1 / -1;
  padding-top: 8px;
  border-top: 1px dashed #ede5d8;
}

.item-label {
  font-size: 11px;
  color: #8c785d;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.item-val {
  font-size: 14px;
  color: #2b2216;
  font-weight: 800;
}

.user-subname {
  font-weight: 600;
  color: #8c785d;
  font-size: 13px;
}

.gold-val {
  color: #d97706;
}

.success-val {
  color: #16a34a;
}

.uid-code {
  font-family: monospace;
  font-size: 13px;
  color: #4b5563;
  word-break: break-all;
}

.result-actions-row {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.action-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.16s ease;
}

.action-pill-btn.gold {
  background: #fef3c7;
  border-color: #fde68a;
  color: #92400e;
}
.action-pill-btn.gold:hover {
  background: #fde68a;
}

.action-pill-btn.secondary {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}
.action-pill-btn.secondary:hover {
  background: #e2e8f0;
}

/* Common Status Box */
.lookup-status-box {
  margin-top: 18px;
  padding: 18px 20px;
  border-radius: 16px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.status-icon-badge {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.status-icon-badge.amber {
  background: #fef3c7;
  color: #d97706;
}

.status-icon-badge.red {
  background: #fee2e2;
  color: #dc2626;
}

.status-spinner {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.status-content {
  flex: 1;
  min-width: 0;
}

.status-content h4 {
  font-size: 15.5px;
  font-weight: 850;
  margin: 0 0 4px;
  line-height: 1.35;
}

.status-content p {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* Loading Box */
.loading-box {
  background: #fdfaf3;
  border: 1px solid #fae8c8;
}
.loading-box h4 {
  color: #92400e;
}

/* Not Found Box */
.not-found-box {
  background: #fffbeb;
  border: 1px solid #fde68a;
}
.not-found-box h4 {
  color: #b45309;
}

.not-found-action {
  margin-top: 12px;
}

.cta-claim-btn {
  padding: 8px 18px;
  min-height: 40px;
  font-size: 13px;
}

/* Error Box */
.error-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
}
.error-box h4 {
  color: #b91c1c;
}
.error-box p {
  color: #7f1d1d;
}

/* Responsive */
@media (max-width: 640px) {
  .lookup-form {
    flex-direction: column;
  }
  .result-grid {
    grid-template-columns: 1fr;
  }
  .lookup-status-box {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
