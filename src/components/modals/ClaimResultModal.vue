<script setup lang="ts">
defineProps<{
  show: boolean;
  dnsUrl?: string;
  data: {
    username: string;
    days: number;
    status: string;
    uid: string;
    refCode: string;
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

      <h2 id="modal-congrat-title">Đã nhận 3 ngày Gold</h2>
      <p class="modal-subtitle">Thêm thời gian cho những khoảnh khắc của bạn.</p>

      <dl class="result-summary">
        <div>
          <dt>Tài khoản</dt>
          <dd id="res-username">@{{ data.username }}</dd>
        </div>
        <div>
          <dt>Thời hạn được cấp</dt>
          <dd id="res-days">+{{ data.days }} ngày</dd>
        </div>
        <div>
          <dt>Trạng thái</dt>
          <dd id="res-status">{{ data.status }}</dd>
        </div>
        <div>
          <dt>UID</dt>
          <dd id="res-uid">{{ data.uid }}</dd>
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
