<script setup lang="ts">
defineProps<{
  activeNav: string;
  platform?: 'ios' | 'android';
}>();

const emit = defineEmits<{
  (e: 'navigate', id: string): void;
}>();
</script>

<template>
  <nav class="mobile-tabbar" aria-label="Lối tắt">
    <a
      href="#claim-box"
      @click="emit('navigate', 'claim-box')"
      :class="{ active: activeNav === 'claim-box' }"
      :aria-current="activeNav === 'claim-box' ? 'location' : undefined"
    >
      <img src="/assets/locket-widget.svg" class="locket-tab-logo" width="23" height="23" alt="" aria-hidden="true">
      <span>Nhận Gold</span>
    </a>

    <a
      :href="platform === 'android' ? '#apk-download' : '#dns-guide'"
      @click="emit('navigate', platform === 'android' ? 'apk-download' : 'dns-guide')"
      :class="{ active: activeNav === (platform === 'android' ? 'apk-download' : 'dns-guide') }"
    >
      <i :class="platform === 'android' ? 'fa-brands fa-android' : 'fa-solid fa-sliders'" aria-hidden="true"></i>
      <span>{{ platform === 'android' ? 'Tải APK' : 'Cài DNS' }}</span>
    </a>

    <a
      href="#lookup-box"
      @click="emit('navigate', 'lookup-box')"
      :class="{ active: activeNav === 'lookup-box' }"
    >
      <i class="fa-regular fa-circle-check" aria-hidden="true"></i>
      <span>Kiểm tra</span>
    </a>

    <a
      href="#faq"
      @click="emit('navigate', 'faq')"
      :class="{ active: activeNav === 'faq' }"
    >
      <i class="fa-regular fa-circle-question" aria-hidden="true"></i>
      <span>Hỏi đáp</span>
    </a>
  </nav>
</template>
