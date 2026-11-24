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
    profileUrl: 'https://freelocket.lunakey.net/dns.mobileconfig',
    backupUrl: 'https://dev.duckdns.org/dns/locket-gold.mobileconfig',
    fileName: 'Locket_Gold_DNS.mobileconfig',
  },
  android: {
    apkUrl: 'https://github.com/locketgold/releases/download/v2.6.0/Locket_Gold_v2.6.0.apk',
    backupApkUrl: 'https://drive.google.com/file/d/locket-gold-v26-backup/view',
    fileName: 'Locket_Gold_v2.6.0.apk',
    versionName: 'v2.6.0 Premium Unlocked',
    fileSize: '48.5 MB',
    features: [
      'Mở khóa video 30 giây & huy hiệu Gold',
      'Tải ảnh & video khoảnh khắc sắc nét 4K',
      'Đồng bộ tài khoản Locket chính chủ 100%',
    ],
  },
  system: {
    brandTitle: 'Locket Gold',
    version: 'v2.6 Gold',
    supportTelegram: 'https://t.me/locketgold_support',
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
    const res = await fetch(`${cleanBase}app-config.json?v=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      appConfig.value = {
        dns: { ...DEFAULT_CONFIG.dns, ...(data.dns || {}) },
        android: { ...DEFAULT_CONFIG.android, ...(data.android || {}) },
        system: { ...DEFAULT_CONFIG.system, ...(data.system || {}) },
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
