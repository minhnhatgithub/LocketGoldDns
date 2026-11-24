<script setup lang="ts">
defineProps<{
  show: boolean;
  dnsUrl?: string;
  data: {
    username: string;
    name?: string;
    avatar?: string | null;
    days: number;
    status: string;
    uid: string;
    refCode: string;
    expiresAt?: string;
    isExisting?: boolean;
  };
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'go-to-dns'): void;
  (e: 'copy-link'): void;
}>();
</script>

<template>
  <div
    v-if="show"
    id="claim-result-modal"
    class="claim-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-congrat-title"
  >
    <div class="modal-sheet">
      <div class="sheet-handle" aria-hidden="true"></div>
      <button type="button" @click="emit('close')" class="modal-close" aria-label="Đóng kết quả">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>

      <div class="modal-success-icon">
        <i class="fa-solid fa-check" aria-hidden="true"></i>
      </div>

      <h2 id="modal-congrat-title">
        {{ data.isExisting ? 'Tài khoản đã có Gold VIP' : 'Đã kích hoạt 3 ngày Gold VIP' }}
      </h2>
      <p class="modal-subtitle">
        {{ data.isExisting ? 'Tài khoản của bạn đã có quyền truy cập trên máy chủ DNS.' : 'Đã kết nối thành công với tài khoản Locket chính chủ.' }}
      </p>

      <dl class="result-summary">
        <div>
          <dt>Tài khoản</dt>
          <dd id="res-username">@{{ data.username }}</dd>
        </div>
        <div v-if="data.name && data.name !== data.username">
          <dt>Tên hiển thị</dt>
          <dd id="res-name">{{ data.name }}</dd>
        </div>
        <div>
          <dt>Thời hạn được cấp</dt>
          <dd id="res-days">+{{ data.days }} ngày {{ data.expiresAt ? `(Hạn: ${data.expiresAt})` : '' }}</dd>
        </div>
        <div>
          <dt>Trạng thái</dt>
          <dd id="res-status" style="color: #10b981; font-weight: 800;">● {{ data.status }}</dd>
        </div>
        <div>
          <dt>UID Locket</dt>
          <dd id="res-uid" style="font-family: monospace; font-size: 13px;">{{ data.uid }}</dd>
        </div>
      </dl>

      <div id="claim-dns-next" class="modal-dns-next">
        <div class="dns-next-label">
          <i class="fa-solid fa-sliders" aria-hidden="true"></i> BƯỚC TIẾP THEO
        </div>
        <h3 id="claim-dns-next-title">Cài DNS để kích hoạt Gold</h3>
        <p id="claim-dns-next-description">
          Mở trang bằng Safari trên iPhone, tải hồ sơ rồi làm theo hướng dẫn cài đặt.
        </p>

        <a
          id="claim-dns-download"
          :href="dnsUrl || 'https://freelocket.lunakey.net/dns.mobileconfig'"
          class="ios-button primary full-width"
        >
          <i class="fa-solid fa-download" aria-hidden="true"></i> 1. Tải hồ sơ DNS
        </a>

        <a
          id="claim-dns-guide-link"
          href="#dns-guide"
          @click="emit('go-to-dns')"
          class="text-link dns-next-guide"
        >
          Xem từng bước cài trên iPhone <span aria-hidden="true">→</span>
        </a>
      </div>

      <details class="modal-referral-details">
        <summary>
          Mã mời & chia sẻ với bạn bè <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </summary>
        <div class="modal-referral">
          <div class="modal-referral-heading">
            <strong>Mã mời của bạn</strong>
            <span id="res-ref-code">{{ data.refCode }}</span>
          </div>
          <p>Mời bạn cài DNS và mở Locket để nhận +25 ngày Gold.</p>
          <div class="share-input-row">
            <input type="text" id="res-ref-link" readonly :value="`https://locketgold.space/?ref=${data.refCode}`">
            <button type="button" @click="emit('copy-link')" class="ios-button primary" aria-label="Sao chép liên kết mời">
              <i class="fa-regular fa-copy" aria-hidden="true"></i> Sao chép
            </button>
          </div>
        </div>
      </details>

      <a
        id="claim-result-next-action"
        href="#dns-guide"
        @click="emit('go-to-dns')"
        class="ios-button primary full-width"
      >
        <i class="fa-brands fa-apple" aria-hidden="true"></i> Xem hướng dẫn cài DNS <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</template>
