import { ref, onMounted } from 'vue';

export interface AppConfig {
  dns: {
    profileUrl: string;
    backupUrl: string;
    fileName: string;
  };
  android: {
    apkUrl: string;
    backupApkUrl: string;
    fileName: string;
    versionName: string;
    fileSize: string;
    features: string[];
  };
  system: {
    brandTitle: string;
    version: string;
    supportTelegram: string;
  };
  api?: {
    activateUrl: string;
    userUrl: string;
    apiKey: string;
    defaultDuration: string;
  };
}

const DEFAULT_CONFIG: AppConfig = {
  dns: {
    profileUrl: 'https://minhnhatdev.duckdns.org/profile.mobileconfig',
    backupUrl: 'https://minhnhatdev.duckdns.org/profile.mobileconfig',
    fileName: 'Locket_Gold_DNS.mobileconfig',
  },
  android: {
    apkUrl: 'https://github.com/minhnhatgithub/LocketGoldDns/releases/download/v2.6/locket.apk',
    backupApkUrl: 'https://github.com/minhnhatgithub/LocketGoldDns/releases/download/v2.6/locket.apk',
    fileName: 'locket.apk',
    versionName: 'v2.6.0 Premium Unlocked',
    fileSize: '48.5 MB',
    features: [
      'Quay video dài tới 5 phút & huy hiệu Gold VIP',
      'Xem ai đã xem ảnh (Locket Views) & diện mạo AI',
      'Đăng ảnh/video từ album & giữ lửa Streak an toàn',
      'Chất lượng gốc 4K không nén & 20+ khung Widget 3D',
    ],
  },
  system: {
    brandTitle: 'Locket Gold Space',
    version: 'v2.6 Gold',
    supportTelegram: '',
  },
  api: {
    activateUrl: 'https://minhnhatdev.duckdns.org/api/v1/activate',
    userUrl: 'https://minhnhatdev.duckdns.org/api/v1/user',
    apiKey: 'lkt_live_96bcabe6ab6318e52c443e5cdc6b1c590f450d5e3fe26eb3',
    defaultDuration: '3d',
  },
};

const appConfig = ref<AppConfig>({ ...DEFAULT_CONFIG });
const isConfigLoaded = ref<boolean>(false);

async function fetchConfig() {
  try {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const res = await fetch(`${cleanBase}app-config.json?v=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    if (res.ok) {
      const data = await res.json();
      appConfig.value = {
        dns: { ...DEFAULT_CONFIG.dns, ...(data.dns || {}) },
        android: { ...DEFAULT_CONFIG.android, ...(data.android || {}) },
        system: { ...DEFAULT_CONFIG.system, ...(data.system || {}) },
        api: { ...DEFAULT_CONFIG.api, ...(data.api || {}) },
      };
      isConfigLoaded.value = true;
    }
  } catch (err) {
    console.warn('Cannot load remote app-config.json, using defaults:', err);
  }
}

export function useAppConfig() {
  onMounted(() => {
    if (!isConfigLoaded.value) {
      fetchConfig();
    }
  });

  return {
    appConfig,
    isConfigLoaded,
    fetchConfig,
  };
}
