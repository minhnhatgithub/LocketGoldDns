<script setup lang="ts">
const emit = defineEmits<{
  (e: 'navigate', id: string): void;
}>();

const features = [
  {
    icon: 'fa-solid fa-video',
    badge: 'SIÊU DÀI',
    badgeColor: 'gold',
    title: 'Quay Video Dài 60s - 300s',
    desc: 'Không còn giới hạn 3 giây ngắn ngủi. Quay và đăng video dài sắc nét, lưu giữ trọn vẹn từng khoảnh khắc đáng nhớ.',
    highlight: 'Dài gấp 60 lần bản thường'
  },
  {
    icon: 'fa-solid fa-eye',
    badge: 'ĐỘC QUYỀN',
    badgeColor: 'purple',
    title: 'Xem Ai Đã Xem Ảnh Của Bạn',
    desc: 'Mở khóa tính năng Locket Views bí mật: Biết ngay ai đã lướt xem ảnh/video của bạn trên màn hình chính Widget.',
    highlight: 'Xem chi tiết số lượt & danh sách'
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: 'AI MAGIC',
    badgeColor: 'cyan',
    title: 'Diện Mạo Mới & Filter AI',
    desc: 'Bộ sưu tập diện mạo Looks, Face Swap nghệ thuật và hàng chục bộ lọc màu điện ảnh độc quyền chỉ có trên Gold.',
    highlight: 'Hơn 30+ bộ lọc & hiệu ứng khuôn mặt'
  },
  {
    icon: 'fa-solid fa-images',
    badge: 'TIỆN LỢI',
    badgeColor: 'green',
    title: 'Đăng Từ Thư Viện Camera Roll',
    desc: 'Đăng bất kỳ ảnh hoặc video có sẵn trong cuộn camera điện thoại lên Widget của bạn bè mà không cần chụp ngay tại chỗ.',
    highlight: 'Tự do chọn ảnh có sẵn trong máy'
  },
  {
    icon: 'fa-solid fa-gem',
    badge: 'ULTRA HD',
    badgeColor: 'gold',
    title: 'Chất Lượng Gốc 4K Không Nén',
    desc: 'Bỏ qua thuật toán nén ảnh mờ của bản thường. Ảnh và video gửi đi giữ nguyên độ phân giải cao và màu sắc rực rỡ.',
    highlight: 'Chuẩn 100% chất lượng gốc sắc nét'
  },
  {
    icon: 'fa-solid fa-crop-simple',
    badge: '3D FRAMES',
    badgeColor: 'pink',
    title: 'Khung Widget & Photobooth 3D',
    desc: 'Hơn 20+ khung viền kim loại vàng, viền lấp lánh và tính năng chụp dải ảnh Photobooth 3D phong cách Hàn Quốc.',
    highlight: 'Biến Widget thành tác phẩm nghệ thuật'
  },
  {
    icon: 'fa-solid fa-crown',
    badge: 'ĐẲNG CẤP',
    badgeColor: 'gold',
    title: 'Huy Hiệu Gold & Đổi App Icon',
    desc: 'Tỏa sáng với huy hiệu Locket Gold trên trang cá nhân + tùy biến biểu tượng ứng dụng ngoài màn hình (Gold, Retro, Neon).',
    highlight: 'Biểu tượng VIP nổi bật trên trang cá nhân'
  },
  {
    icon: 'fa-solid fa-music',
    badge: 'ÂM NHẠC',
    badgeColor: 'purple',
    title: 'Gắn Nhạc & Caption Dài 500 Ký Tự',
    desc: 'Thoải mái viết tâm sự dài, chèn liên kết và chia sẻ giai điệu bài hát yêu thích từ Spotify / Apple Music vào ảnh.',
    highlight: 'Gắn bài hát kèm ảnh widget'
  },
  {
    icon: 'fa-solid fa-fire-flame-curved',
    badge: 'STREAK',
    badgeColor: 'orange',
    title: 'Giữ & Khôi Phục Lửa Streak',
    desc: 'Bảo vệ chuỗi ngày gửi ảnh không bị đứt đoạn. Tự động kích hoạt khiên bảo vệ và khôi phục chuỗi lửa với bạn thân.',
    highlight: 'Không lo mất lửa khi bận rộn'
  }
];

const comparisons = [
  { feature: 'Thời lượng quay video', free: 'Tối đa 3 giây', gold: 'Lên tới 5 phút (300s)' },
  { feature: 'Xem ai đã xem ảnh (Locket Views)', free: 'Không hỗ trợ', gold: 'Xem danh sách chi tiết' },
  { feature: 'Đăng ảnh/video từ album', free: 'Bị giới hạn', gold: 'Mở khóa 100% tự do' },
  { feature: 'Bộ lọc diện mạo & AI Looks', free: 'Chỉ có cơ bản', gold: 'Full bộ VIP & Face Filters' },
  { feature: 'Chất lượng ảnh tải lên', free: 'Bị nén mờ', gold: 'Chất lượng 4K sắc nét' },
  { feature: 'Khung Widget & Photobooth 3D', free: 'Không có', gold: '20+ khung viền độc quyền' },
  { feature: 'Huy hiệu Gold cá nhân', free: 'Không có', gold: 'Huy hiệu Gold VIP sáng chói' },
  { feature: 'Gắn nhạc & caption dài', free: 'Giới hạn ngắn', gold: '500 ký tự & phát nhạc' },
  { feature: 'Bảo vệ chuỗi lửa Streak', free: 'Mất khi quên gửi', gold: 'Tự động bảo vệ & cứu chuỗi' }
];
</script>

<template>
  <section id="gold-features" class="ios-card gold-features-card" aria-labelledby="features-title">
    <!-- Header Section -->
    <div class="features-header">
      <div class="features-eyebrow">
        <span class="sparkle-icon">✦</span>
        <span>ĐẶC QUYỀN HỘI VIÊN CAO CẤP</span>
      </div>
      <h2 id="features-title" class="features-title">
        Tính Năng Độc Quyền <span class="gold-gradient-text">Locket Gold</span>
      </h2>
      <p class="features-subtitle">
        Khám phá toàn bộ quyền lợi VIP được mở khóa tự động qua hệ thống DNS iOS &amp; APK Android của chúng tôi.
      </p>
    </div>

    <!-- 9-Grid Features List -->
    <div class="features-grid">
      <div
        v-for="(f, idx) in features"
        :key="idx"
        class="feature-box"
      >
        <div class="feature-box-top">
          <div class="feature-icon-wrapper" :class="f.badgeColor">
            <i :class="f.icon" aria-hidden="true"></i>
          </div>
          <span class="feature-tag" :class="f.badgeColor">{{ f.badge }}</span>
        </div>
        <h3 class="feature-name">{{ f.title }}</h3>
        <p class="feature-desc">{{ f.desc }}</p>
        <div class="feature-highlight">
          <i class="fa-solid fa-check" aria-hidden="true"></i>
          <span>{{ f.highlight }}</span>
        </div>
      </div>
    </div>

    <!-- Comparison Table -->
    <div class="comparison-container">
      <div class="comparison-header">
        <i class="fa-solid fa-scale-balanced" aria-hidden="true"></i>
        <h3>So Sánh Bản Thường vs Locket Gold VIP</h3>
      </div>
      <div class="table-responsive">
        <table class="comparison-table">
          <thead>
            <tr>
              <th class="col-feature">Tính năng</th>
              <th class="col-free">Bản thường (Free)</th>
              <th class="col-gold">
                <span class="gold-badge-table">
                  <i class="fa-solid fa-crown" aria-hidden="true"></i> Locket Gold
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, idx) in comparisons" :key="idx">
              <td class="col-feature">
                <strong>{{ c.feature }}</strong>
              </td>
              <td class="col-free">
                <i class="fa-solid fa-xmark text-danger" aria-hidden="true"></i>
                <span>{{ c.free }}</span>
              </td>
              <td class="col-gold">
                <i class="fa-solid fa-circle-check text-gold" aria-hidden="true"></i>
                <strong>{{ c.gold }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Call to Action Footer -->
    <div class="features-cta-box">
      <div class="cta-content">
        <div class="cta-badge">TRẢI NGHIỆM MIỄN PHÍ</div>
        <h3 class="cta-title">Sẵn sàng nâng cấp không gian Locket của bạn?</h3>
        <p class="cta-desc">Chỉ mất chưa tới 1 phút để cài đặt. Không cần mật khẩu, an toàn tuyệt đối 100%.</p>
      </div>
      <button
        type="button"
        @click="emit('navigate', 'claim-box')"
        class="ios-button primary cta-button"
      >
        <span>Nhận 3 ngày dùng thử ngay</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  </section>
</template>

<style scoped>
.gold-features-card {
  margin-top: 24px;
  padding: 32px 28px;
  border-radius: 24px;
  background: var(--bg-card, #ffffff);
  border: 1px solid var(--border-color, #f0e6d2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.features-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 32px;
}

.features-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  background: rgba(217, 119, 6, 0.1);
  color: #d97706;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  border: 1px solid rgba(217, 119, 6, 0.2);
}

.dark .features-eyebrow {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}

.features-title {
  font-size: 28px;
  font-weight: 900;
  color: #1c1917;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}

.gold-gradient-text {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #b45309 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-subtitle {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 36px;
}

.feature-box {
  background: var(--bg-item, #faf6ee);
  border: 1px solid var(--border-item, #f1e7d5);
  border-radius: 18px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.feature-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(217, 119, 6, 0.1);
  border-color: #f59e0b;
}

.dark .feature-box {
  background: #1e1913;
  border-color: #382d1c;
}

.dark .feature-box:hover {
  border-color: #f59e0b;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.feature-box-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.feature-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.feature-icon-wrapper.gold {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}
.dark .feature-icon-wrapper.gold {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.feature-icon-wrapper.purple {
  background: rgba(168, 85, 247, 0.15);
  color: #9333ea;
}
.dark .feature-icon-wrapper.purple {
  background: rgba(168, 85, 247, 0.2);
  color: #c084fc;
}

.feature-icon-wrapper.cyan {
  background: rgba(6, 182, 212, 0.15);
  color: #0891b2;
}
.dark .feature-icon-wrapper.cyan {
  background: rgba(6, 182, 212, 0.2);
  color: #22d3ee;
}

.feature-icon-wrapper.green {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}
.dark .feature-icon-wrapper.green {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.feature-icon-wrapper.pink {
  background: rgba(236, 72, 153, 0.15);
  color: #db2777;
}
.dark .feature-icon-wrapper.pink {
  background: rgba(236, 72, 153, 0.2);
  color: #f472b6;
}

.feature-icon-wrapper.orange {
  background: rgba(249, 115, 22, 0.15);
  color: #ea580c;
}
.dark .feature-icon-wrapper.orange {
  background: rgba(249, 115, 22, 0.2);
  color: #fb923c;
}

.feature-tag {
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.feature-tag.gold { background: #fef3c7; color: #92400e; }
.dark .feature-tag.gold { background: #451a03; color: #fde68a; }

.feature-tag.purple { background: #f3e8ff; color: #6b21a8; }
.dark .feature-tag.purple { background: #3b0764; color: #e9d5ff; }

.feature-tag.cyan { background: #cffafe; color: #155e75; }
.dark .feature-tag.cyan { background: #083344; color: #a5f3fc; }

.feature-tag.green { background: #dcfce7; color: #166534; }
.dark .feature-tag.green { background: #052e16; color: #bbf7d0; }

.feature-tag.pink { background: #fce7f3; color: #9d174d; }
.dark .feature-tag.pink { background: #500724; color: #fbcfe8; }

.feature-tag.orange { background: #ffedd5; color: #9a3412; }
.dark .feature-tag.orange { background: #431407; color: #fed7aa; }

.feature-name {
  font-size: 16px;
  font-weight: 800;
  color: #1c1917;
  margin: 0 0 8px;
  line-height: 1.35;
}

.feature-desc {
  font-size: 13.5px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 16px;
  flex: 1;
}

.feature-highlight {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #d97706;
  padding-top: 10px;
  border-top: 1px dashed rgba(217, 119, 6, 0.2);
}

.dark .feature-highlight {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.2);
}

/* Comparison Table */
.comparison-container {
  background: var(--bg-item, #faf6ee);
  border: 1px solid var(--border-item, #f1e7d5);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
}

.dark .comparison-container {
  background: #18140f;
  border-color: #382d1c;
}

.comparison-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  color: #d97706;
}

.dark .comparison-header {
  color: #fbbf24;
}

.comparison-header h3 {
  font-size: 18px;
  font-weight: 800;
  color: #1c1917;
  margin: 0;
}

.table-responsive {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

.comparison-table th {
  padding: 12px 16px;
  border-bottom: 2px solid rgba(217, 119, 6, 0.2);
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}

.comparison-table td {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #334155;
}

.col-feature {
  width: 40%;
}

.col-free {
  width: 30%;
  color: #64748b !important;
}

.col-free i {
  margin-right: 6px;
  color: #ef4444;
}

.col-gold {
  width: 30%;
  color: #d97706 !important;
}

.dark .col-gold {
  color: #fbbf24 !important;
}

.col-gold i {
  margin-right: 6px;
  color: #10b981;
}

.gold-badge-table {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
}

/* CTA Box */
.features-cta-box {
  background: linear-gradient(135deg, #241a0d 0%, #15110a 100%);
  border: 1px solid #785514;
  border-radius: 18px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cta-badge {
  display: inline-block;
  background: #f59e0b;
  color: #000000;
  font-size: 11px;
  font-weight: 850;
  padding: 2px 8px;
  border-radius: 6px;
  margin-bottom: 6px;
  letter-spacing: 0.05em;
}

.cta-title {
  font-size: 19px;
  font-weight: 900;
  color: #fef3c7;
  margin: 0 0 4px;
}

.cta-desc {
  font-size: 13.5px;
  color: #d1d5db;
  margin: 0;
}

.cta-button {
  flex-shrink: 0;
  white-space: nowrap;
  padding: 12px 22px;
}

/* Responsive */
@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .gold-features-card {
    padding: 22px 16px;
    margin-top: 18px;
    border-radius: 20px;
  }
  .features-title {
    font-size: 22px;
  }
  .features-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .features-cta-box {
    flex-direction: column;
    text-align: center;
    padding: 20px 16px;
  }
  .cta-button {
    width: 100%;
  }
  .comparison-table th, .comparison-table td {
    padding: 10px 8px;
    font-size: 12px;
  }
}
</style>
