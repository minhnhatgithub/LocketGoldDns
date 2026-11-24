<script setup lang="ts">
defineProps<{
  activeNav: string;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  isDark?: boolean;
  platform?: 'ios' | 'android';
}>();

const emit = defineEmits<{
  (e: 'navigate', id: string): void;
  (e: 'toggle-collapse'): void;
  (e: 'close-mobile'): void;
  (e: 'toggle-theme'): void;
  (e: 'update:platform', val: 'ios' | 'android'): void;
}>();

function handleItemClick(id: string) {
  emit('navigate', id);
  emit('close-mobile');
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'mobile-open': isMobileOpen, 'is-collapsed': isCollapsed }"
    aria-label="Điều hướng chính"
  >
    <!-- Brand Header Row -->
    <div class="brand-row">
      <a href="#" @click.prevent="handleItemClick('claim-box')" class="brand">
        <span class="brand-icon">
          <img src="/assets/locket-widget.svg" class="locket-logo" width="36" height="36" alt="" aria-hidden="true">
        </span>
        <div class="brand-text">
          <span class="brand-title">Locket Gold</span>
          <span class="brand-caption">YOUR GOLDEN MOMENTS</span>
        </div>
      </a>

      <!-- Desktop Collapse Button -->
      <button
        type="button"
        class="sidebar-control-btn desktop-only"
        @click="emit('toggle-collapse')"
        title="Thu gọn menu (Ẩn sidebar)"
      >
        <i class="fa-solid fa-angles-left" aria-hidden="true"></i>
      </button>

      <!-- Mobile Close Button -->
      <button
        type="button"
        class="sidebar-control-btn mobile-only"
        @click="emit('close-mobile')"
        title="Đóng menu"
      >
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>

    <!-- Platform Selector Segmented Control (Clean, Spacious, No Text Wrap) -->
    <div class="sidebar-platform-tabs" role="tablist" aria-label="Chọn hệ điều hành">
      <button
        type="button"
        class="platform-tab"
        :class="{ active: (platform ?? 'ios') === 'ios' }"
        @click="emit('update:platform', 'ios')"
        role="tab"
        :aria-selected="(platform ?? 'ios') === 'ios'"
      >
        <i class="fa-brands fa-apple" aria-hidden="true"></i>
        <span>iPhone</span>
      </button>
      <button
        type="button"
        class="platform-tab"
        :class="{ active: platform === 'android' }"
        @click="emit('update:platform', 'android')"
        role="tab"
        :aria-selected="platform === 'android'"
      >
        <i class="fa-brands fa-android" aria-hidden="true"></i>
        <span>Android</span>
      </button>
    </div>

    <p class="nav-caption">KHÔNG GIAN CỦA BẠN</p>

    <!-- Navigation List (Core Flow: 1. Claim -> 2. DNS or APK -> 3. Lookup -> 4. FAQ) -->
    <nav class="sidebar-nav">
      <a
        href="#claim-box"
        @click.prevent="handleItemClick('claim-box')"
        class="nav-item"
        :class="{ active: activeNav === 'claim-box' }"
        :aria-current="activeNav === 'claim-box' ? 'location' : undefined"
      >
        <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
        <span class="nav-label">1. Nhận Gold</span>
      </a>

      <!-- Step 2: Dynamically adapts to chosen platform -->
      <a
        :href="platform === 'android' ? '#apk-download' : '#dns-guide'"
        @click.prevent="handleItemClick(platform === 'android' ? 'apk-download' : 'dns-guide')"
        class="nav-item"
        :class="{ active: activeNav === (platform === 'android' ? 'apk-download' : 'dns-guide') }"
      >
        <i :class="platform === 'android' ? 'fa-brands fa-android nav-android-icon' : 'fa-solid fa-sliders'" aria-hidden="true"></i>
        <span class="nav-label">{{ platform === 'android' ? '2. Tải APK Android' : '2. Cài DNS trên iPhone' }}</span>
      </a>

      <a
        href="#gold-features"
        @click.prevent="handleItemClick('gold-features')"
        class="nav-item"
        :class="{ active: activeNav === 'gold-features' }"
      >
        <i class="fa-solid fa-crown" style="color: #f59e0b;" aria-hidden="true"></i>
        <span class="nav-label">Đặc quyền Gold VIP</span>
      </a>

      <a
        href="#lookup-box"
        @click.prevent="handleItemClick('lookup-box')"
        class="nav-item"
        :class="{ active: activeNav === 'lookup-box' }"
      >
        <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
        <span class="nav-label">3. Kiểm tra kích hoạt</span>
      </a>

      <a
        href="#faq"
        @click.prevent="handleItemClick('faq')"
        class="nav-item"
        :class="{ active: activeNav === 'faq' }"
      >
        <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
        <span class="nav-label">Câu hỏi thường gặp</span>
      </a>
    </nav>

    <!-- Bottom Controls & Theme Toggle -->
    <div class="sidebar-bottom">
      <!-- Dark / Light Mode Switch Button -->
      <button
        type="button"
        class="theme-toggle-pill"
        @click="emit('toggle-theme')"
        :title="isDark ? 'Chuyển sang Giao diện sáng' : 'Chuyển sang Giao diện tối'"
      >
        <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
        <span>{{ isDark ? 'Giao diện sáng' : 'Giao diện tối' }}</span>
      </button>

      <div class="sidebar-signoff">
        <span class="status-dot"></span>
        <span>Hệ thống trực tuyến</span>
        <span class="version-badge">v2.6 Gold</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: 255px;
  padding: 24px 16px 18px;
  background: #fffdf5;
  border-right: 1px solid #f0e3c8;
  display: flex;
  flex-direction: column;
  z-index: 35;
  font-family: 'Nunito', sans-serif;
  box-sizing: border-box;
  overflow-y: auto;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s ease;
}

.brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 8px;
}

.sidebar-platform-tabs {
  display: flex;
  background: #f7eedb;
  border: 1px solid #ebd7b2;
  border-radius: 999px;
  padding: 3px;
  margin-bottom: 6px;
}

.platform-tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #8c714a;
  font-size: 12px;
  font-weight: 850;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: all 0.18s ease;
}

.platform-tab:hover {
  color: #45341c;
}

.platform-tab.active {
  background: #ffffff;
  color: #45341c;
  box-shadow: 0 2px 6px rgba(180, 130, 40, 0.16);
}

.platform-tab.active i.fa-apple {
  color: #1c1915;
}

.platform-tab.active i.fa-android {
  color: #10b981;
}

.nav-item i.nav-android-icon {
  color: #10b981 !important;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 0;
  min-width: 0;
  flex: 1;
}

.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 11px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(248, 197, 51, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 17px;
  font-weight: 900;
  color: #2b2216;
  line-height: 1.2;
  white-space: nowrap;
}

.brand-caption {
  font-size: 8px;
  font-weight: 850;
  color: #a4917a;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
  white-space: nowrap;
}

.sidebar-control-btn {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: #fbf3df;
  border: 1px solid #ead6af;
  color: #795d36;
  display: grid;
  place-items: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
  flex-shrink: 0;
}

.sidebar-control-btn:hover {
  background: #f7e4be;
  color: #402b11;
  transform: scale(1.05);
}

.sidebar-control-btn:active {
  transform: scale(0.95);
}

.nav-caption {
  font-size: 10px;
  font-weight: 850;
  color: #a8957c;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 10px 8px;
}

.sidebar-nav {
  display: grid;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 13px;
  border-radius: 13px;
  font-size: 13px;
  font-weight: 750;
  color: #4a3e2e;
  text-decoration: none;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.nav-item i {
  font-size: 14.5px;
  width: 18px;
  text-align: center;
  color: #8c785f;
  flex-shrink: 0;
  transition: color 0.16s ease;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.nav-item:hover {
  background: #fdf3de;
  color: #2b2216;
}

.nav-item:hover i {
  color: #f59e0b;
}

.nav-item.active {
  background: #faebd0;
  color: #784a00;
  font-weight: 850;
  box-shadow: 0 2px 6px rgba(120, 74, 0, 0.06);
}

.nav-item.active i {
  color: #b45309;
}

.sidebar-bottom {
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.theme-toggle-pill {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #ebdcc5;
  color: #684f2c;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
  font-family: inherit;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.theme-toggle-pill:hover {
  background: #fffcf5;
  border-color: #d97706;
  color: #b45309;
  transform: translateY(-1px);
}

.theme-toggle-pill:active {
  transform: translateY(1px);
}

.theme-toggle-pill i {
  font-size: 13px;
  color: #f59e0b;
}

.sidebar-signoff {
  border-top: 1px solid #f0e3c8;
  padding: 10px 4px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8d785e;
  font-size: 10.5px;
  font-weight: 750;
}

.version-badge {
  margin-left: auto;
  font-size: 9.5px;
  color: #a4917a;
  background: #faebd0;
  padding: 1px 6px;
  border-radius: 5px;
  font-weight: 800;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

/* Responsive control visibility */
@media (min-width: 901px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 900px) {
  .desktop-only {
    display: none !important;
  }
  .sidebar {
    display: flex !important;
    width: 280px;
    z-index: 100;
    transform: translateX(-100%);
    box-shadow: none;
  }
  .sidebar.mobile-open {
    transform: translateX(0) !important;
    box-shadow: 12px 0 32px rgba(45, 30, 10, 0.22) !important;
  }
}
</style>
