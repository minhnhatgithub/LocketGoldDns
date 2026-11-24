<script setup lang="ts">
const emit = defineEmits<{
  (e: 'navigate', id: string): void;
  (e: 'open-guide'): void;
  (e: 'select-platform', platform: 'ios' | 'android'): void;
}>();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <footer class="app-footer-card" aria-label="Chân trang">
    <!-- Top Row: Brand Info -->
    <div class="footer-top-row">
      <div class="footer-brand">
        <span class="footer-logo-wrap">
          <img src="/assets/locket-widget.svg" class="footer-logo" width="36" height="36" alt="" aria-hidden="true">
        </span>
        <div class="brand-info">
          <strong class="footer-brand-title">Locket Gold Space</strong>
          <span class="footer-brand-caption">YOUR GOLDEN MOMENTS</span>
        </div>
      </div>
    </div>

    <!-- Quote / Mission -->
    <p class="footer-quote">
      Một chút Gold cho những kết nối mỗi ngày · Video dài 30 giây &amp; huy hiệu sang trọng trên iPhone của bạn.
    </p>

    <!-- Main Navigation Links Grid -->
    <div class="footer-nav-grid">
      <!-- Col 1: Core Flow -->
      <div class="footer-nav-col">
        <h4 class="nav-col-title">Tính năng chính</h4>
        <ul class="nav-col-links">
          <li>
            <a href="#claim-box" @click.prevent="emit('navigate', 'claim-box')">
              <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
              <span>1. Nhận 5 ngày Gold</span>
            </a>
          </li>
          <li>
            <a href="#dns-guide" @click.prevent="emit('select-platform', 'ios'); emit('navigate', 'dns-guide')">
              <i class="fa-brands fa-apple" aria-hidden="true"></i>
              <span>2. Cài DNS trên iPhone (iOS)</span>
            </a>
          </li>
          <li>
            <a href="#apk-download" @click.prevent="emit('select-platform', 'android'); emit('navigate', 'apk-download')">
              <i class="fa-brands fa-android" aria-hidden="true"></i>
              <span>2. Tải APK Locket Gold (Android)</span>
            </a>
          </li>
          <li>
            <a href="#lookup-box" @click.prevent="emit('navigate', 'lookup-box')">
              <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
              <span>3. Kiểm tra kích hoạt</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Col 2: Guides & Support -->
      <div class="footer-nav-col">
        <h4 class="nav-col-title">Hướng dẫn &amp; Hỗ trợ</h4>
        <ul class="nav-col-links">
          <li>
            <a href="#" @click.prevent="emit('open-guide')">
              <i class="fa-solid fa-camera" aria-hidden="true"></i>
              <span>Xem 8 bước ảnh chụp thực tế</span>
            </a>
          </li>
          <li>
            <a href="#faq" @click.prevent="emit('navigate', 'faq')">
              <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
              <span>Câu hỏi thường gặp</span>
            </a>
          </li>
          <li>
            <a href="#dns-guide" @click.prevent="emit('navigate', 'dns-guide')">
              <i class="fa-solid fa-rotate-right" aria-hidden="true"></i>
              <span>Cài lại hồ sơ DNS khi đổi máy</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Col 3: Trust & Assurance -->
      <div class="footer-nav-col">
        <h4 class="nav-col-title">Cam kết &amp; Bảo mật</h4>
        <ul class="nav-col-links">
          <li>
            <span class="safe-pill">
              <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <span>Không yêu cầu mật khẩu</span>
            </span>
          </li>
          <li>
            <span class="uptime-pill">
              <i class="fa-solid fa-bolt" aria-hidden="true"></i>
              <span>Kích hoạt tự động 100%</span>
            </span>
          </li>
          <li>
            <span class="free-pill">
              <i class="fa-solid fa-heart" aria-hidden="true"></i>
              <span>Trải nghiệm hoàn toàn miễn phí</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="footer-card-divider"></div>

    <!-- Bottom Row -->
    <div class="footer-bottom-row">
      <p class="copyright-info">
        © 2026 <strong>Locket Gold Space</strong> · Nền tảng chia sẻ phi lợi nhuận &amp; an toàn cho cộng đồng Locket.
      </p>

      <button type="button" class="back-to-top-pill" @click="scrollToTop" title="Cuộn lên đầu trang">
        <span>Lên đầu trang</span>
        <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
      </button>
    </div>
  </footer>
</template>

<style scoped>
.app-footer-card {
  margin: 36px 0 0;
  background: #ffffff;
  border: 1px solid #ebdcc5;
  border-radius: 20px;
  padding: 30px 34px;
  box-shadow: 0 4px 18px rgba(180, 130, 40, 0.04);
  font-family: 'Nunito', sans-serif;
  box-sizing: border-box;
}

.footer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-logo-wrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f8c533;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(180, 115, 0, 0.18);
  flex-shrink: 0;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.footer-brand-title {
  font-size: 18px;
  font-weight: 900;
  color: #2b2216;
  line-height: 1.2;
}

.footer-brand-caption {
  font-size: 8.5px;
  font-weight: 850;
  color: #9c8466;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
}

.footer-quote {
  font-size: 13px;
  line-height: 1.6;
  color: #554431;
  font-weight: 650;
  margin: 14px 0 24px;
  padding-bottom: 4px;
}

.footer-nav-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.nav-col-title {
  font-size: 13.5px;
  font-weight: 900;
  color: #2b2216;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}

.nav-col-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-col-links li a {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 750;
  color: #3b2c1b;
  text-decoration: none;
  transition: all 0.16s ease;
}

.nav-col-links li a:hover {
  color: #b45309;
  transform: translateX(2px);
}

.nav-col-links li a i {
  font-size: 12.5px;
  width: 15px;
  color: #d97706;
  text-align: center;
  flex-shrink: 0;
}

.safe-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ecfdf5;
  border: 1px solid #bbf7d0;
  color: #15803d;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  width: fit-content;
}

.safe-pill i {
  color: #16a34a;
  font-size: 11px;
}

.uptime-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fefce8;
  border: 1px solid #fef08a;
  color: #a16207;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  width: fit-content;
}

.uptime-pill i {
  color: #ca8a04;
  font-size: 11px;
}

.free-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fdf2f8;
  border: 1px solid #fbcfe8;
  color: #db2777;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  width: fit-content;
}

.free-pill i {
  color: #ec4899;
  font-size: 11px;
}

.footer-card-divider {
  height: 1px;
  background: #f0e6d6;
  margin: 22px 0 18px;
}

.footer-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.copyright-info {
  font-size: 12px;
  color: #6e5a44;
  font-weight: 600;
  margin: 0;
}

.copyright-info strong {
  color: #2b2216;
  font-weight: 850;
}

.back-to-top-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #fffdf9;
  border: 1px solid #ebdcc5;
  border-radius: 999px;
  padding: 7px 16px;
  font-size: 12px;
  font-weight: 850;
  color: #523b1e;
  cursor: pointer;
  box-shadow: 0 3px 0 #dfcca9, 0 3px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.15s ease;
  font-family: inherit;
}

.back-to-top-pill:hover {
  background: #ffffff;
  transform: translateY(-1px);
  color: #b45309;
}

.back-to-top-pill:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #dfcca9;
}

@media (max-width: 820px) {
  .app-footer-card {
    padding: 22px 20px;
    margin: 26px 0 calc(80px + env(safe-area-inset-bottom));
  }
  .footer-nav-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .footer-top-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .footer-bottom-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
