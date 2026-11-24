<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLocketHub } from './composables/useLocketHub';
import { useAppConfig } from './composables/useAppConfig';

// Layout
import TheSidebar from './components/layout/TheSidebar.vue';
import TheMobileHeader from './components/layout/TheMobileHeader.vue';
import TheMobileTabbar from './components/layout/TheMobileTabbar.vue';
import TheFooter from './components/layout/TheFooter.vue';

// Sections
import HeroDnsSection from './components/sections/HeroDnsSection.vue';
import ClaimCard from './components/sections/ClaimCard.vue';
import DnsSetupCard from './components/sections/DnsSetupCard.vue';
import AndroidApkCard from './components/sections/AndroidApkCard.vue';
import LookupSection from './components/sections/LookupSection.vue';
import FaqSection from './components/sections/FaqSection.vue';

// Modals
import ClaimResultModal from './components/modals/ClaimResultModal.vue';
import InstallGuideModal from './components/modals/InstallGuideModal.vue';
import ToastMessage from './components/common/ToastMessage.vue';

const {
  activeNav,
  dnsStep,
  dnsVerificationText,
  dnsVerificationState,
  claimUsername,
  claimRef,
  isClaimSubmitting,
  claimModalOpen,
  claimedData,
  lookupUsername,
  isLookingUp,
  lookupResult,
  submitClaim,
  submitLookup,
  copyText,
} = useLocketHub();

const { appConfig } = useAppConfig();

const toast = ref<{ show: boolean; message: string; type: 'success' | 'info' | 'warning' }>({
  show: false,
  message: '',
  type: 'success',
});

const guideModalOpen = ref(false);
const guideModalStep = ref(0);
const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);
const isDark = ref(false);
const currentPlatform = ref<'ios' | 'android'>('ios');

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else if (saved === 'light') {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
}

function toggleTheme() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

function handleDownloadApk() {
  const url = appConfig.value.android.apkUrl;
  const fileName = appConfig.value.android.fileName || 'Locket_Gold_v2.6.0.apk';
  const size = appConfig.value.android.fileSize || '48.5 MB';
  showToast(`Đang tải file ${fileName} (${size})...`, 'success');

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.remove();
    showToast('Đã bắt đầu tải file APK! Mở thư mục Tệp đã tải xuống để cài.', 'info');
  }, 1200);
}

function handleDownloadBackupApk() {
  const backupUrl = appConfig.value.android.backupApkUrl;
  if (backupUrl) {
    showToast('Đang chuyển hướng đến link tải APK dự phòng...', 'info');
    window.open(backupUrl, '_blank');
  } else {
    handleDownloadApk();
  }
}

onMounted(() => {
  initTheme();
  if (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)) {
    currentPlatform.value = 'android';
  }
});

function handleOpenGuide(stepIdx: number = 0) {
  guideModalStep.value = stepIdx;
  guideModalOpen.value = true;
}

function showToast(message: string, type: 'success' | 'info' | 'warning' = 'success') {
  toast.value.message = message;
  toast.value.type = type;
  toast.value.show = true;
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}

function handleNavigate(id: string) {
  activeNav.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleDownloadDns() {
  dnsVerificationText.value = 'Đã bấm tải hồ sơ. Chọn Cho phép trong Safari, rồi xem bước cài hồ sơ.';
  showToast('Đang tải hồ sơ cấu hình DNS Locket Gold...', 'info');
  const url = appConfig.value.dns.profileUrl || 'https://freelocket.lunakey.net/dns.mobileconfig';
  // Trigger download / open config profile in Safari
  window.location.href = url;
  // Auto advance to step 1 after 1.5s
  setTimeout(() => {
    dnsStep.value = 1;
  }, 1500);
}

function handleVerifyDnsShortcut() {
  lookupUsername.value = claimUsername.value || 'locket_user';
  handleNavigate('lookup-box');
  submitLookup();
}

function handleModalGoDns() {
  claimModalOpen.value = false;
  dnsStep.value = 0;
  handleNavigate('dns-guide');
}

function handleCopy(text: string) {
  copyText(text);
  showToast('Đã sao chép liên kết vào bộ nhớ tạm!', 'success');
}
</script>

<template>
  <div class="ios-app" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <!-- Desktop & Mobile Drawer Sidebar -->
    <TheSidebar
      :activeNav="activeNav"
      :isCollapsed="isSidebarCollapsed"
      :isMobileOpen="isMobileSidebarOpen"
      :isDark="isDark"
      :platform="currentPlatform"
      @navigate="handleNavigate"
      @toggle-collapse="isSidebarCollapsed = !isSidebarCollapsed"
      @close-mobile="isMobileSidebarOpen = false"
      @toggle-theme="toggleTheme"
      @update:platform="p => currentPlatform = p"
    />

    <!-- Floating Actions for Desktop when Collapsed -->
    <div v-if="isSidebarCollapsed" class="floating-desktop-bar">
      <button
        type="button"
        class="floating-action-btn"
        @click="isSidebarCollapsed = false"
        title="Mở menu điều hướng"
      >
        <i class="fa-solid fa-bars" aria-hidden="true"></i>
        <span>Menu</span>
      </button>

      <button
        type="button"
        class="floating-action-btn theme-toggle"
        @click="toggleTheme"
        :title="isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'"
      >
        <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
        <span>{{ isDark ? 'Sáng' : 'Tối' }}</span>
      </button>
    </div>

    <!-- Mobile Drawer Backdrop Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      class="mobile-sidebar-backdrop"
      @click="isMobileSidebarOpen = false"
      aria-hidden="true"
    ></div>

    <!-- Mobile Header -->
    <TheMobileHeader
      :isDark="isDark"
      @open-faq="handleNavigate('faq')"
      @toggle-sidebar="isMobileSidebarOpen = !isMobileSidebarOpen"
      @toggle-theme="toggleTheme"
    />

    <!-- Main Content Area -->
    <main id="main-content" class="main-content">
      <!-- Dashboard DNS Main Page -->
      <div class="dashboard dns-page">
        <!-- Hero & Topbar & 3-Step Navigation Flow -->
        <HeroDnsSection
          :platform="currentPlatform"
          @update:platform="p => currentPlatform = p"
          @navigate="handleNavigate"
        />

        <!-- Activation Grid: Step 1 (Claim) + Step 2 (DNS Setup for iOS or APK Download for Android) -->
        <div class="workspace-grid activation-grid">
          <ClaimCard
            v-model:username="claimUsername"
            v-model:refCode="claimRef"
            :isSubmitting="isClaimSubmitting"
            :platform="currentPlatform"
            @submit="submitClaim"
          />

          <!-- Step 2 for iOS: DNS Installation Guide -->
          <DnsSetupCard
            v-if="currentPlatform === 'ios'"
            v-model:currentStep="dnsStep"
            :verificationText="dnsVerificationText"
            :verificationState="dnsVerificationState"
            @download="handleDownloadDns"
            @verify-click="handleVerifyDnsShortcut"
            @copy-page-link="handleCopy('https://locketgold.space/#dns-guide')"
            @open-guide="handleOpenGuide"
          />

          <!-- Step 2 for Android: APK Download & Setup -->
          <AndroidApkCard
            v-else
            :config="appConfig.android"
            :verificationText="dnsVerificationText"
            :verificationState="dnsVerificationState"
            @download-apk="handleDownloadApk"
            @download-backup="handleDownloadBackupApk"
            @switch-platform="p => currentPlatform = p"
            @verify-click="handleVerifyDnsShortcut"
            @navigate="handleNavigate"
          />
        </div>

        <!-- Step 3: Lookup Intro & Activation Verification -->
        <LookupSection
          v-model:username="lookupUsername"
          :isLookingUp="isLookingUp"
          :result="lookupResult"
          @submit="submitLookup"
          @copy-ref="handleCopy"
        />

        <!-- FAQs Section -->
        <FaqSection />

        <!-- App Footer Card inside Dashboard (Aligned with all cards) -->
        <TheFooter
          @navigate="handleNavigate"
          @open-guide="handleOpenGuide(0)"
          @select-platform="p => currentPlatform = p"
        />
      </div>
    </main>

    <!-- Mobile Bottom Tabbar Navigation -->
    <TheMobileTabbar
      :activeNav="activeNav"
      :platform="currentPlatform"
      @navigate="handleNavigate"
    />

    <!-- Claim Success Result Modal Sheet -->
    <ClaimResultModal
      :show="claimModalOpen"
      :data="claimedData"
      :dnsUrl="appConfig.dns.profileUrl"
      @close="claimModalOpen = false"
      @go-to-dns="handleModalGoDns"
      @copy-link="handleCopy(`https://locketgold.space/?ref=${claimedData.refCode}`)"
    />

    <!-- Step By Step Photo Installation Guide Modal (Red Circled) -->
    <InstallGuideModal
      :show="guideModalOpen"
      :initialStep="guideModalStep"
      @close="guideModalOpen = false"
    />

    <!-- Toast Notification -->
    <ToastMessage
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<style scoped>
.main-content {
  margin-left: 255px;
  transition: margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.ios-app.sidebar-collapsed .main-content {
  margin-left: 0 !important;
}

.ios-app.sidebar-collapsed :deep(.sidebar) {
  transform: translateX(-100%) !important;
}

@media (max-width: 900px) {
  .main-content {
    margin-left: 0 !important;
  }
  .dashboard {
    padding-left: 16px !important;
    padding-right: 16px !important;
    padding-top: 14px !important;
    padding-bottom: calc(90px + env(safe-area-inset-bottom)) !important;
    max-width: 100% !important;
  }
}

.floating-desktop-bar {
  position: fixed;
  top: 18px;
  left: 20px;
  z-index: 34;
  display: flex;
  align-items: center;
  gap: 8px;
}

.floating-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #ebd7b2;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 850;
  color: #684f2c;
  cursor: pointer;
  box-shadow: 0 4px 0 #d9c095, 0 6px 16px rgba(0, 0, 0, 0.08);
  font-family: 'Nunito', sans-serif;
  transition: all 0.18s ease;
}

.floating-action-btn:hover {
  background: #fffbf0;
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #d9c095, 0 8px 18px rgba(0, 0, 0, 0.1);
}

.floating-action-btn:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #d9c095;
}

.floating-action-btn.theme-toggle {
  background: #fdf6e7;
  color: #b45309;
}

.floating-action-btn.theme-toggle:hover {
  background: #fef08a;
}

.mobile-sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(35, 25, 12, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 95;
  animation: backdropFadeIn 0.22s ease forwards;
}

@keyframes backdropFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 900px) {
  .floating-desktop-bar {
    display: none !important;
  }
}
</style>
