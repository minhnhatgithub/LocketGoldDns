<script setup lang="ts">
defineProps<{
  username: string;
  isLookingUp: boolean;
  result: {
    username: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    daysLeft: number;
    dnsConnected: boolean;
    expiresAt: string;
    refCode: string;
  } | null;
}>();

const emit = defineEmits<{
  (e: 'update:username', val: string): void;
  (e: 'submit'): void;
  (e: 'copy-ref', code: string): void;
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
        <span>Chỉ hiển thị đã kích hoạt khi máy chủ xác nhận DNS đang hoạt động.</span>
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
          <p>Nhập username để kiểm tra DNS, thời hạn Gold và mã mời.</p>
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
              placeholder="Nhập username hoặc liên kết Locket"
              :value="username"
              @input="emit('update:username', ($event.target as HTMLInputElement).value)"
            >
          </div>
        </div>

        <button type="submit" id="btn-lookup-submit" class="ios-button primary" :disabled="isLookingUp">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <span>{{ isLookingUp ? 'Đang kiểm tra...' : 'Kiểm tra' }}</span>
        </button>
      </form>

      <!-- Verified Result Display -->
      <div v-if="result" id="lookup-result-container" class="lookup-result-box" aria-live="polite">
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
            <strong class="item-val">@{{ result.username }}</strong>
          </div>
          <div class="result-item">
            <span class="item-label">Thời hạn</span>
            <strong class="item-val gold-val">+{{ result.daysLeft }} ngày Gold</strong>
          </div>
          <div class="result-item">
            <span class="item-label">DNS Trạng thái</span>
            <strong class="item-val success-val">● Đã kết nối</strong>
          </div>
          <div class="result-item">
            <span class="item-label">Hạn dùng</span>
            <strong class="item-val">{{ result.expiresAt }}</strong>
          </div>
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
  font-size: 11px;
  margin-top: 4px;
  line-height: 1.7;
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
  font-size: 11px;
  color: #a78d69;
  font-weight: 650;
  margin-top: 4px;
  margin-bottom: 0;
}

.section-number {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 9px;
  background: #eee2fa;
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

.ios-button.primary:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #d79b1f;
}

.lookup-result-box {
  margin-top: 18px;
  padding: 18px 20px;
  border-radius: 16px;
  background: #fdfbf5;
  border: 1px solid #ebd8b6;
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
  font-size: 13px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.result-item {
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid #ebdcc5;
  border-radius: 12px;
}

.item-label {
  display: block;
  font-size: 10px;
  font-weight: 800;
  color: #9c8a74;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.item-val {
  display: block;
  font-size: 13px;
  font-weight: 850;
  color: #2b2216;
}

.gold-val {
  color: #b45309;
}

.success-val {
  color: #16a34a;
}

@media (max-width: 768px) {
  .lookup-intro {
    align-items: flex-start;
  }
  .lookup-form {
    flex-direction: column;
  }
  .ios-button.primary {
    width: 100%;
    justify-content: center;
  }
  .result-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
