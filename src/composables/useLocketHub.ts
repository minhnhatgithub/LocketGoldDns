import { ref, reactive } from 'vue';
import confetti from 'canvas-confetti';

export function useLocketHub() {
  const activeNav = ref<string>('claim-box');
  const dnsStep = ref<number>(0);
  const dnsVerificationText = ref<string>('Chưa kiểm tra trạng thái kích hoạt.');
  const dnsVerificationState = ref<'unknown' | 'verified' | 'attention'>('unknown');

  // Claim form state
  const claimUsername = ref<string>('');
  const claimRef = ref<string>('');
  const isClaimSubmitting = ref<boolean>(false);
  const claimModalOpen = ref<boolean>(false);
  const claimedData = ref({
    username: '',
    days: 5,
    status: 'ACTIVE',
    uid: '',
    refCode: '',
  });

  // Lookup form state
  const lookupUsername = ref<string>('');
  const isLookingUp = ref<boolean>(false);
  const lookupResult = ref<{
    username: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    daysLeft: number;
    dnsConnected: boolean;
    expiresAt: string;
    refCode: string;
  } | null>(null);

  // Checkin state
  const checkinUsername = ref<string>('');
  const streakCount = ref<number>(0);
  const isCheckinSubmitting = ref<boolean>(false);
  const checkinMessage = ref<string>('');

  // Modals
  const modals = reactive({
    reseller: false,
    studio: false,
    safariPrompt: false,
  });

  function fireConfetti() {
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#f8c533', '#e9aa23', '#ffc84d', '#ffedb1', '#ffffff']
    });
  }

  function submitClaim() {
    const raw = claimUsername.value.trim();
    if (!raw) return;

    isClaimSubmitting.value = true;
    setTimeout(() => {
      isClaimSubmitting.value = false;
      const clean = raw.replace('@', '').replace('https://locket.cam/', '');
      claimedData.value = {
        username: clean,
        days: 5,
        status: 'Chờ kích hoạt DNS',
        uid: Math.floor(10000000 + Math.random() * 90000000).toString(),
        refCode: `GOLD-${clean.toUpperCase().slice(0, 4) || 'VIP'}88`,
      };
      claimModalOpen.value = true;
      dnsVerificationText.value = `Đã có thông tin @${clean}. Làm theo hướng dẫn rồi kiểm tra kích hoạt.`;
      fireConfetti();
    }, 600);
  }

  function submitLookup() {
    const raw = lookupUsername.value.trim();
    if (!raw) return;

    isLookingUp.value = true;
    setTimeout(() => {
      isLookingUp.value = false;
      const clean = raw.replace('@', '').replace('https://locket.cam/', '');
      lookupResult.value = {
        username: clean,
        status: 'ACTIVE',
        daysLeft: 5,
        dnsConnected: true,
        expiresAt: '28/11/2026',
        refCode: `GOLD-${clean.toUpperCase().slice(0, 4) || 'VIP'}88`,
      };
      dnsVerificationText.value = `Máy chủ đã xác nhận DNS hoạt động cho @${clean}. Bạn có thể sử dụng Gold.`;
      dnsVerificationState.value = 'verified';
      fireConfetti();
    }, 700);
  }

  function submitCheckin() {
    const raw = checkinUsername.value.trim();
    if (!raw) return;

    isCheckinSubmitting.value = true;
    setTimeout(() => {
      isCheckinSubmitting.value = false;
      streakCount.value += 1;
      checkinMessage.value = `Điểm danh thành công! Đã tăng chuỗi lên ${streakCount.value} ngày.`;
      fireConfetti();
    }, 500);
  }

  function copyText(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  }

  return {
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
    checkinUsername,
    streakCount,
    isCheckinSubmitting,
    checkinMessage,
    modals,
    fireConfetti,
    submitClaim,
    submitLookup,
    submitCheckin,
    copyText,
  };
}
