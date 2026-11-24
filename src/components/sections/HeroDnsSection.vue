<script setup lang="ts">
defineProps<{
  platform?: 'ios' | 'android';
}>();

const emit = defineEmits<{
  (e: 'navigate', id: string): void;
  (e: 'update:platform', val: 'ios' | 'android'): void;
}>();
</script>

<template>
  <div>
    <!-- Topbar: Breadcrumb & Platform Switcher -->
    <div class="page-topbar">
      <div>
        <span class="breadcrumb">Locket Gold</span>
        <span class="breadcrumb-divider">/</span>
        <span>{{ platform === 'android' ? 'Dành cho Android' : 'Bắt đầu sử dụng' }}</span>
      </div>

      <!-- Interactive Platform Switcher -->
      <div class="platform-switcher" role="tablist" aria-label="Chọn thiết bị">
        <button
          type="button"
          class="platform-tab-btn"
          :class="{ active: (platform ?? 'ios') === 'ios' }"
          @click="emit('update:platform', 'ios')"
          role="tab"
          :aria-selected="(platform ?? 'ios') === 'ios'"
        >
          <i class="fa-brands fa-apple" aria-hidden="true"></i>
          <span>iPhone &amp; iPad</span>
        </button>
        <button
          type="button"
          class="platform-tab-btn"
          :class="{ active: platform === 'android' }"
          @click="emit('update:platform', 'android')"
          role="tab"
          :aria-selected="platform === 'android'"
        >
          <i class="fa-brands fa-android" aria-hidden="true"></i>
          <span>Android (APK)</span>
        </button>
      </div>
    </div>

    <!-- Hero Content & Gold Pass Card -->
    <section class="hero dns-hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="status-sparkle">✦</span>
          {{ platform === 'android' ? 'HƯỚNG DẪN CÀI ĐẶT NHANH TRÊN ANDROID' : 'HƯỚNG DẪN TỪNG BƯỚC TRÊN IPHONE' }}
        </p>
        <h1 id="hero-title">
          {{ platform === 'android' ? 'Locket Gold Android,' : 'Locket Gold,' }}<br>
          <span class="hero-gold">{{ platform === 'android' ? 'cài cực nhanh.' : 'cài thật dễ.' }}</span>
        </h1>
        <p class="hero-description">
          {{ platform === 'android' 
            ? 'Chỉ cần tải file APK cài đặt trực tiếp và nhập username Locket là có ngay Gold 5 ngày.' 
            : 'Nhận 5 ngày miễn phí, cài cấu hình DNS một lần rồi mở Locket để kích hoạt.' }}
        </p>
        <a
          :href="platform === 'android' ? '#apk-download' : '#dns-guide'"
          @click.prevent="emit('navigate', platform === 'android' ? 'apk-download' : 'dns-guide')"
          class="text-link hero-dns-shortcut"
        >
          {{ platform === 'android' ? 'Đã có username? Đến bước tải APK' : 'Đã nhận Gold? Đến bước cài DNS' }}
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <!-- 3D Gold Pass Card -->
      <div class="gold-pass" :aria-label="platform === 'android' ? 'Gói Locket Gold Android miễn phí 5 ngày' : 'Gói Locket Gold miễn phí 5 ngày'">
        <div class="pass-top">
          <span>
            <img src="/assets/locket-widget.svg" class="locket-inline-logo" width="16" height="16" alt="" aria-hidden="true">
            locket <b>gold</b>
          </span>
          <span class="pass-chip">{{ platform === 'android' ? 'APK VIP' : 'FREE PASS' }}</span>
        </div>
        <div class="pass-orbit" aria-hidden="true">
          <img src="/assets/locket-widget.svg" class="locket-logo" width="44" height="44" alt="" aria-hidden="true">
        </div>
        <div class="pass-bottom">
          <div>
            <strong>5 ngày</strong>
            <span>{{ platform === 'android' ? 'Chỉ cần cài APK & nhập user.' : 'Bắt đầu từ những kết nối nhỏ.' }}</span>
          </div>
          <span class="pass-spark" aria-hidden="true">✦</span>
        </div>
      </div>
    </section>

    <!-- 3-Step Setup Flow Pills -->
    <ol class="setup-flow" aria-label="Ba việc cần làm để bắt đầu">
      <li>
        <a href="#claim-box" @click.prevent="emit('navigate', 'claim-box')">
          <span class="flow-number">1</span>
          <span>
            <strong>Nhận Gold</strong>
            <small>Nhập username</small>
          </span>
        </a>
      </li>
      <li>
        <a
          :href="platform === 'android' ? '#apk-download' : '#dns-guide'"
          @click.prevent="emit('navigate', platform === 'android' ? 'apk-download' : 'dns-guide')"
        >
          <span class="flow-number">2</span>
          <span>
            <strong>{{ platform === 'android' ? 'Tải APK' : 'Cài DNS' }}</strong>
            <small>{{ platform === 'android' ? 'Cài file trực tiếp' : 'Làm theo hướng dẫn' }}</small>
          </span>
        </a>
      </li>
      <li>
        <a href="#lookup-box" @click.prevent="emit('navigate', 'lookup-box')">
          <span class="flow-number">3</span>
          <span>
            <strong>Mở Locket</strong>
            <small>Kiểm tra kích hoạt</small>
          </span>
        </a>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.page-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 13px;
  color: #8c7d6b;
  font-weight: 600;
}

.breadcrumb-divider {
  margin: 0 6px;
  color: #c4b5a3;
}

.platform-switcher {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  background: #fbf6ec;
  border: 1px solid #ebdcc5;
  border-radius: 999px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04);
}

.platform-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #8c714a;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.16s ease;
}

.platform-tab-btn:hover {
  color: #5c431b;
}

.platform-tab-btn.active {
  background: #ffffff;
  color: #45341c;
  box-shadow: 0 2px 6px rgba(180, 130, 40, 0.15);
}

.platform-tab-btn.active i.fa-apple {
  color: #1c1915;
}

.platform-tab-btn.active i.fa-android {
  color: #10b981;
}

@media (max-width: 768px) {
  .page-topbar {
    display: flex !important;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 14px;
    text-align: left;
  }
  .platform-switcher {
    width: 100%;
    max-width: 100%;
    display: flex;
    padding: 4px;
    border-radius: 999px;
  }
  .platform-tab-btn {
    flex: 1;
    justify-content: center;
    padding: 8px 12px;
    font-size: 12.5px;
    border-radius: 999px;
  }
}

.platform-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 99px;
  background: #f5efe2;
  border: 1px solid #ebdcc5;
  color: #4a3e2e;
  font-size: 12px;
  font-weight: 700;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 16px 0 24px;
}

.hero-copy {
  max-width: 520px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #b45309;
  margin: 0 0 10px;
}

.status-sparkle {
  color: #f59e0b;
  font-size: 12px;
}

#hero-title {
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  line-height: 1.12;
  letter-spacing: -0.04em;
  font-weight: 900;
  color: #2b2216;
  margin: 0 0 12px;
}

.hero-gold {
  color: #df9800 !important;
  background: linear-gradient(transparent 77%, #ffe18a 77%, #ffe18a 96%, transparent 96%) !important;
  padding: 0 3px;
  margin: 0 -3px;
  display: inline;
}

.hero-description {
  font-size: 14.5px;
  line-height: 1.7;
  color: #6e5e4c;
  font-weight: 600;
  margin: 0 0 14px;
}

.hero-dns-shortcut {
  font-size: 13px;
  font-weight: 800;
  color: #b45309;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.16s ease;
}

.hero-dns-shortcut:hover {
  text-decoration: underline;
  transform: translateX(2px);
}

/* 3D Gold Pass Card */
.gold-pass {
  flex: 0 0 250px;
  height: 155px;
  padding: 16px 18px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transform: rotate(-3deg);
  background: radial-gradient(ellipse at 90% 0%, #fff0a8, transparent 65%), linear-gradient(135deg, #ffdd6b, #ffc44b 56%, #f4ae31);
  box-shadow: 0 16px 35px -12px rgba(184, 138, 52, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  color: #75521e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s ease;
  user-select: none;
}

.gold-pass:hover {
  transform: rotate(0deg) scale(1.02);
}

.pass-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 800;
}

.pass-top span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pass-chip {
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.45);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.06em;
  color: #634310;
}

.pass-orbit {
  position: absolute;
  right: 18px;
  top: 48px;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(120, 80, 10, 0.18);
}

.pass-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.pass-bottom strong {
  display: block;
  font-size: 26px;
  font-weight: 950;
  line-height: 1.1;
  color: #523610;
}

.pass-bottom span {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: #7a5c28;
  margin-top: 2px;
}

.pass-spark {
  font-size: 16px;
  color: #fffae8;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
}

/* 3-Step Setup Flow Pills */
.setup-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}

.setup-flow li a {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 68px;
  padding: 13px 16px;
  background: #fffdf7;
  border: 1px solid #f0dfb6;
  border-radius: 16px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(150, 100, 0, 0.04);
  transition: all 0.16s ease;
}

.setup-flow li a:hover {
  background: #fff;
  border-color: #e5b95f;
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(150, 100, 0, 0.08);
}

.flow-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #faebd0;
  color: #784a00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
  flex-shrink: 0;
}

.setup-flow strong {
  display: block;
  font-size: 13px;
  color: #423018;
  font-weight: 850;
  line-height: 1.25;
}

.setup-flow small {
  display: block;
  margin-top: 3px;
  font-size: 11px;
  color: #8a7862;
  font-weight: 600;
}

@media (max-width: 900px) {
  .hero {
    display: block;
    padding: 8px 0 16px;
  }
  .hero-copy {
    max-width: 100%;
  }
  #hero-title {
    font-size: clamp(26px, 7vw, 36px) !important;
    line-height: 1.16 !important;
    letter-spacing: -0.03em !important;
    white-space: normal !important;
    margin: 8px 0 10px !important;
  }
  .hero-description {
    max-width: 100% !important;
    font-size: 13.5px !important;
    line-height: 1.6 !important;
    margin: 0 0 14px !important;
    min-height: 0 !important;
  }
  .gold-pass {
    display: none !important;
  }
  .setup-flow {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 0 0 20px;
  }
  .setup-flow li a {
    flex-direction: column;
    text-align: center;
    padding: 10px 4px;
    gap: 5px;
    min-height: 78px;
    justify-content: center;
    border-radius: 14px;
  }
  .flow-number {
    width: 26px;
    height: 26px;
    font-size: 11.5px;
  }
  .setup-flow strong {
    font-size: 11.5px;
    line-height: 1.25;
  }
  .setup-flow small {
    font-size: 9.5px;
    line-height: 1.35;
  }
}
</style>
