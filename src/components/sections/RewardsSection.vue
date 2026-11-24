<script setup lang="ts">
defineProps<{
  streakCount: number;
  username: string;
  isSubmitting: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: 'update:username', val: string): void;
  (e: 'submit-checkin'): void;
  (e: 'copy-invite'): void;
}>();
</script>

<template>
  <div class="rewards-wrapper">
    <div class="extras-heading">
      <h2>Đã cài xong? Nhận thêm ngày Gold.</h2>
      <p>Điểm danh mỗi ngày hoặc mời bạn bè sau khi hoàn tất cài DNS.</p>
    </div>

    <div class="rewards-grid">
      <!-- Checkin Box -->
      <section id="checkin-box" class="ios-card checkin-card" aria-labelledby="checkin-title">
        <div class="card-heading">
          <div class="heading-icon orange">
            <i class="fa-regular fa-calendar-check" aria-hidden="true"></i>
          </div>
          <div>
            <h2 id="checkin-title">Điểm danh giữ chuỗi</h2>
            <p>Giữ chuỗi càng lâu, nhận từ +1 đến tối đa +3 ngày Gold.</p>
          </div>
          <span class="section-number">02</span>
        </div>

        <div class="streak-heading">
          <span><i class="fa-solid fa-fire fire-icon" aria-hidden="true"></i> Chuỗi hiện tại</span>
          <strong id="checkin-streak-display" aria-live="polite">{{ streakCount }} ngày</strong>
        </div>

        <div id="checkin-days-grid" class="days-grid">
          <div class="checkin-day-card" :class="{ 'is-active': streakCount >= 1 }" data-day="1">
            <span class="day-label">N1</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
            <span class="day-bonus">+1</span>
          </div>
          <div class="checkin-day-card" :class="{ 'is-active': streakCount >= 2 }" data-day="2">
            <span class="day-label">N2</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
            <span class="day-bonus">+1</span>
          </div>
          <div class="checkin-day-card" :class="{ 'is-active': streakCount >= 3 }" data-day="3">
            <span class="day-label">N3</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-fire" aria-hidden="true"></i></span>
            <span class="day-bonus">+2</span>
          </div>
          <div class="checkin-day-card" :class="{ 'is-active': streakCount >= 4 }" data-day="4">
            <span class="day-label">N4</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-fire" aria-hidden="true"></i></span>
            <span class="day-bonus">+2</span>
          </div>
          <div class="checkin-day-card" :class="{ 'is-active': streakCount >= 5 }" data-day="5">
            <span class="day-label">N5</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-fire" aria-hidden="true"></i></span>
            <span class="day-bonus">+2</span>
          </div>
          <div class="checkin-day-card" :class="{ 'is-active': streakCount >= 6 }" data-day="6">
            <span class="day-label">N6</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-fire" aria-hidden="true"></i></span>
            <span class="day-bonus">+2</span>
          </div>
          <div class="checkin-day-card special" :class="{ 'is-active': streakCount >= 7 }" data-day="7">
            <span class="day-label">N7</span>
            <span class="checkin-icon-box"><i class="fa-solid fa-crown" aria-hidden="true"></i></span>
            <span class="day-bonus">+3</span>
          </div>
        </div>

        <div class="checkin-tip">
          <span class="tip-icon"><i class="fa-solid fa-fire" aria-hidden="true"></i></span>
          <p>
            Mốc thưởng chuỗi: <strong>N1–2 (+1đ) · N3–6 (+2đ) · Từ N7+ (+3đ/ngày)</strong>.<br>
            <span>Bỏ lỡ 1 ngày chuỗi sẽ quay về mốc đầu.</span>
          </p>
        </div>

        <form id="checkin-form" class="ios-form" @submit.prevent="emit('submit-checkin')">
          <div class="field">
            <label for="checkin-username">Username của bạn</label>
            <div class="input-wrap">
              <span aria-hidden="true" class="prefix-at">@</span>
              <input
                type="text"
                id="checkin-username"
                name="username"
                required
                autocomplete="off"
                autocapitalize="none"
                spellcheck="false"
                maxlength="16384"
                placeholder="Nhập username Locket"
                :value="username"
                @input="emit('update:username', ($event.target as HTMLInputElement).value)"
              >
            </div>
          </div>
          <button type="submit" id="btn-checkin-submit" class="ios-button secondary full-width" :disabled="isSubmitting">
            <i class="fa-regular fa-calendar-check" aria-hidden="true"></i>
            <span>{{ isSubmitting ? 'Đang xử lý...' : 'Điểm danh giữ chuỗi (+1 ~ +3 ngày)' }}</span>
          </button>
        </form>

        <div v-if="message" class="checkin-alert">
          {{ message }}
        </div>

        <p class="form-footnote">Dành cho tài khoản đã nhận gói Gold ban đầu.</p>
      </section>

      <!-- Referral Banner -->
      <section class="referral-banner" aria-label="Mời bạn nhận thêm Gold">
        <div class="referral-banner-icon">
          <i class="fa-solid fa-user-group" aria-hidden="true"></i>
        </div>
        <div class="referral-copy">
          <h2>Niềm vui sẽ nhiều hơn khi có bạn.</h2>
          <p>
            Mời bạn bè cài DNS và mở Locket để nhận thêm <strong>+25 ngày Gold</strong> mỗi lượt hợp lệ.
          </p>
        </div>
        <a href="#lookup-box" @click.prevent="emit('copy-invite')" class="text-link referral-link">
          Lấy mã mời <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.rewards-wrapper {
  margin: 32px 0;
  font-family: 'Nunito', sans-serif;
}

.extras-heading {
  margin-bottom: 20px;
}

.extras-heading h2 {
  font-size: 20px;
  font-weight: 850;
  color: #2b2216;
  margin: 0 0 4px;
}

.extras-heading p {
  font-size: 13px;
  color: #7d6b56;
  margin: 0;
  font-weight: 600;
}

.rewards-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 20px;
}

.checkin-card {
  background: linear-gradient(155deg, #fffcf8 40%, #fff0e7);
  border: 1px solid #f4ddc6;
  border-radius: 20px;
  padding: 24px 26px;
  box-shadow: 0 3px 7px #00000002;
  font-family: 'Nunito', sans-serif;
  box-sizing: border-box;
}

.card-heading {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.heading-icon.orange {
  width: 37px;
  height: 37px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 15px;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 #ffffff99, 0 3px 8px #00000004;
  background: linear-gradient(145deg, #ffe3cf, #ffc7a4);
  color: #cd763b;
}

.card-heading h2 {
  font-size: 17px;
  font-weight: 850;
  color: #2b2216;
  margin: 0 0 3px;
}

.card-heading p {
  font-size: 11px;
  color: #a78d69;
  margin: 0;
  font-weight: 650;
}

.section-number {
  margin-left: auto;
  font-size: 9px;
  font-weight: 900;
  color: #d39565;
  background: #ffe7d6;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  align-self: flex-start;
}

.streak-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #fdfaf3;
  border: 1px solid #ebdcc5;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  color: #523610;
  margin-bottom: 14px;
}

.fire-icon {
  color: #ea580c;
  margin-right: 4px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 14px;
}

.checkin-day-card {
  padding: 8px 4px;
  background: #fdfaf3;
  border: 1px solid #ebdcc5;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.16s ease;
}

.checkin-day-card.is-active {
  background: #fef5dd;
  border-color: #f59e0b;
}

.checkin-day-card.special {
  background: #fdf6e7;
  border-color: #f7ca6d;
}

.day-label {
  font-size: 10.5px;
  font-weight: 850;
  color: #7d6b56;
}

.checkin-icon-box {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ebdcc5;
  color: #6e5e4c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.checkin-day-card.is-active .checkin-icon-box {
  background: #f59e0b;
  color: #fff;
}

.day-bonus {
  font-size: 11px;
  font-weight: 900;
  color: #523610;
}

.checkin-tip {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  background: #fffdf5;
  border: 1px solid #f1e4c8;
  border-radius: 12px;
  font-size: 11px;
  color: #7d6b56;
  line-height: 1.5;
  margin-bottom: 16px;
}

.tip-icon {
  color: #ea580c;
  margin-top: 1px;
}

.ios-form .field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.ios-form label {
  font-size: 12.5px;
  font-weight: 800;
  color: #3b2b18;
}

/* SINGLE CLEAN INPUT-WRAP BORDER */
.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid #ebdcc5;
  background: #fffdfa;
  border-radius: 13px;
  padding: 0 14px;
  min-height: 48px;
  transition: all 0.18s ease;
  box-sizing: border-box;
  width: 100%;
}

.input-wrap:focus-within {
  border-color: #f59e0b;
  background: #ffffff;
  box-shadow: 0 0 0 3.5px rgba(245, 158, 11, 0.14);
}

.prefix-at {
  font-size: 14px;
  font-weight: 800;
  color: #b59f81;
  flex-shrink: 0;
  width: 16px;
  text-align: center;
}

.input-wrap input {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
  width: 100% !important;
  padding: 12px 0 !important;
  font-family: inherit !important;
  font-size: 14px !important;
  font-weight: 650 !important;
  color: #2b2216 !important;
  line-height: normal !important;
  margin: 0 !important;
}

.input-wrap input::placeholder {
  color: #aa9780;
  font-weight: 500;
}

.ios-button.secondary {
  min-height: 48px;
  padding: 12px 20px;
  border-radius: 999px;
  background: #ffead7;
  border: 1px solid #f0d1ab;
  box-shadow: 0 3px 0 #efd0ad;
  color: #ad7135;
  font-family: inherit;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  transition: all 0.16s ease;
}

.ios-button.secondary:hover {
  background: #ffe1c1;
}

.ios-button.secondary:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #efd0ad;
}

.checkin-alert {
  margin-top: 10px;
  padding: 10px 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  color: #15803d;
  text-align: center;
}

.form-footnote {
  font-size: 11px;
  color: #9c8a74;
  text-align: center;
  margin: 12px 0 0;
}

/* Referral banner */
.referral-banner {
  background: linear-gradient(110deg, #fff0cd, #ffece4 60%, #f4ebfa);
  border: 1px solid #f0dcc3;
  border-radius: 20px;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 3px 7px #00000002;
}

.referral-banner-icon {
  width: 37px;
  height: 37px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: #fff8e8;
  color: #c39848;
  border: 1px solid #f2dbb0;
  font-size: 16px;
  margin-bottom: 14px;
}

.referral-copy h2 {
  font-size: 17px;
  font-weight: 900;
  color: #8d6243;
  margin: 0 0 6px;
}

.referral-copy p {
  font-size: 12px;
  color: #9d7b5b;
  line-height: 1.6;
  margin: 0;
}

.referral-copy strong {
  color: #b45309;
}

.referral-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 850;
  color: #9c6830;
  text-decoration: none;
  margin-top: 18px;
  cursor: pointer;
}

.referral-link:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
