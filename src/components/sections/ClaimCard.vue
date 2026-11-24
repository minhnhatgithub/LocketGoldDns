<script setup lang="ts">
defineProps<{
  username: string;
  refCode: string;
  isSubmitting: boolean;
  platform?: 'ios' | 'android';
}>();

const emit = defineEmits<{
  (e: 'update:username', val: string): void;
  (e: 'update:refCode', val: string): void;
  (e: 'submit'): void;
}>();
</script>

<template>
  <section id="claim-box" class="ios-card claim-card" aria-labelledby="claim-title">
    <div class="card-heading">
      <div class="heading-icon blue">
        <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
      </div>
      <div>
        <h2 id="claim-title">1. Nhập username để nhận Gold</h2>
        <p>{{ platform === 'android' ? 'Nhận gói ban đầu, sau đó tải APK ở bước tiếp theo.' : 'Nhận gói ban đầu, sau đó cài DNS ở bước tiếp theo.' }}</p>
      </div>
      <span class="section-number">01</span>
    </div>

    <form id="claim-form" class="ios-form" @submit.prevent="emit('submit')">
      <div class="form-body">
        <!-- Username field -->
        <div class="field">
          <label for="locket-username">
            Username hoặc link Locket <span class="required-mark">*</span>
          </label>
          <div class="input-wrap">
            <span class="input-icon-prefix" aria-hidden="true">@</span>
            <input
              type="text"
              id="locket-username"
              name="username"
              required
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              maxlength="16384"
              placeholder="Username hoặc liên kết Locket"
              aria-describedby="username-help"
              :value="username"
              @input="emit('update:username', ($event.target as HTMLInputElement).value)"
            >
          </div>
          <p id="username-help" class="field-help">
            Ví dụ: @username, locket.cam/@username hoặc link mời. Link mời chỉ cho biết UID; hãy chắc chắn là link của chính bạn, không chắc thì nhập @username.
          </p>
        </div>

        <!-- Ref code field -->
        <div class="field">
          <div class="label-row">
            <label for="ref-input">Mã mời bạn bè</label>
            <span class="optional-tag">Tùy chọn</span>
          </div>
          <div class="input-wrap">
            <i class="fa-solid fa-ticket input-icon-prefix" aria-hidden="true"></i>
            <input
              type="text"
              id="ref-input"
              name="ref"
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              maxlength="16384"
              placeholder="Nhập mã của người giới thiệu"
              :value="refCode"
              @input="emit('update:refCode', ($event.target as HTMLInputElement).value)"
            >
          </div>
        </div>

        <!-- Package summary banner -->
        <div class="package-summary">
          <div class="package-icon">
            <img src="/assets/locket-widget.svg" class="locket-logo" width="38" height="38" alt="" aria-hidden="true">
          </div>
          <div class="package-info">
            <strong>Locket Gold · 5 ngày</strong>
            <span>Gold &amp; video 30 giây</span>
          </div>
          <div class="package-price">
            <small>Miễn phí</small>
            <span>0đ</span>
          </div>
        </div>

        <!-- Gold Benefits Checklist to balance height perfectly -->
        <div class="gold-benefits">
          <div class="benefit-item">
            <i class="fa-solid fa-circle-check benefit-check" aria-hidden="true"></i>
            <span>Kích hoạt tự động, trải nghiệm trọn vẹn 5 ngày Gold</span>
          </div>
          <div class="benefit-item">
            <i class="fa-solid fa-circle-check benefit-check" aria-hidden="true"></i>
            <span>Đăng video Locket dài tới 30 giây &amp; biểu tượng Gold</span>
          </div>
          <div class="benefit-item">
            <i class="fa-solid fa-circle-check benefit-check" aria-hidden="true"></i>
            <span>Không yêu cầu mật khẩu Locket, an toàn tuyệt đối</span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <!-- Submit button -->
        <button type="submit" id="btn-claim-submit" class="ios-button primary full-width" :disabled="isSubmitting">
          <span>Nhận 5 ngày Gold</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>

        <p class="form-footnote">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
          <span>{{ platform === 'android' ? 'Không cần mật khẩu. Nhận xong, tiếp tục tải APK bên cạnh.' : 'Không cần mật khẩu. Nhận xong, tiếp tục cài DNS bên dưới.' }}</span>
        </p>
      </div>
    </form>
  </section>
</template>

<style scoped>
.claim-card {
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
  margin-bottom: 18px;
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

.heading-icon.blue {
  background: linear-gradient(145deg, #ffe9a1, #ffce5b);
  color: #a96b06;
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

.section-number {
  margin-left: auto;
  font-size: 9px;
  font-weight: 900;
  color: #c49a48;
  background: #fff1cf;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  align-self: flex-start;
}

.ios-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 14px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 12.5px;
  font-weight: 800;
  color: #423220;
}

.required-mark {
  color: #e02424;
  font-weight: bold;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.optional-tag {
  font-size: 10.5px;
  font-weight: 700;
  color: #9c8a74;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ebdcc5;
  background: #ffffff;
  border-radius: 13px;
  padding: 0 14px;
  min-height: 48px;
  transition: all 0.18s ease;
  box-sizing: border-box;
  width: 100%;
}

.input-wrap:focus-within {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.14);
}

.input-icon-prefix {
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
  font-size: 14.5px !important;
  font-weight: 650 !important;
  color: #2b2216 !important;
  line-height: normal !important;
  margin: 0 !important;
}

.input-wrap input::placeholder {
  color: #aa9780;
  font-weight: 500;
}

.field-help {
  font-size: 10.5px;
  line-height: 1.5;
  color: #8c7964;
  margin: 1px 0 0;
}

.package-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 15px;
  background: #fefbf2;
  border: 1px solid #f5ebd3;
  border-radius: 14px;
}

.package-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}

.package-info strong {
  display: block;
  font-size: 12.5px;
  font-weight: 850;
  color: #3b2b18;
}

.package-info span {
  display: block;
  font-size: 10.5px;
  color: #826c54;
  margin-top: 1px;
}

.package-price {
  margin-left: auto;
  text-align: right;
}

.package-price small {
  display: block;
  font-size: 9.5px;
  color: #8a7862;
  font-weight: 600;
}

.package-price span {
  display: block;
  font-size: 16px;
  font-weight: 950;
  color: #b45309;
  line-height: 1;
  margin-top: 2px;
}

/* Gold Benefits Checklist */
.gold-benefits {
  background: #fffdf8;
  border: 1px solid #f4e8d2;
  border-radius: 14px;
  padding: 11px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #6a573b;
  font-weight: 700;
  line-height: 1.35;
}

.benefit-check {
  color: #f59e0b;
  font-size: 12.5px;
  flex-shrink: 0;
}

.form-footnote {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  color: #85725c;
  margin: 0;
  text-align: center;
}

.form-footnote i {
  color: #a8947d;
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
  .section-number {
    display: none !important;
  }
}
</style>
