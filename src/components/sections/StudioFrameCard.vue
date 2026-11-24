<script setup lang="ts">
const emit = defineEmits<{
  (e: 'open-studio'): void;
}>();
</script>

<template>
  <section class="studio-entry-card" aria-labelledby="studio-entry-title">
    <div class="heading-icon purple">
      <i class="fa-regular fa-image" aria-hidden="true"></i>
    </div>
    <div>
      <h2 id="studio-entry-title">Thêm khung cho Locket của bạn</h2>
      <p>Nhập username Locket, chọn khung yêu thích rồi xem thử và lưu.</p>
    </div>
    <button type="button" @click="emit('open-studio')" class="ios-button secondary studio-btn">
      Chọn khung <span aria-hidden="true">→</span>
    </button>
  </section>
</template>

<style scoped>
.studio-entry-card {
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid #e6d9f1;
  background: linear-gradient(110deg, #fffaf2, #f5edff);
  border-radius: 20px;
  padding: 20px;
  margin-top: 25px;
  box-sizing: border-box;
}

.studio-entry-card > div:nth-child(2) {
  min-width: 0;
  flex: 1;
}

.heading-icon.purple {
  width: 37px;
  height: 37px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 15px;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 #ffffff99, 0 3px 8px #00000004;
  background: linear-gradient(145deg, #eee0ff, #ddc8f4);
  color: #9164bf;
}

.studio-entry-card h2 {
  font-size: 15px;
  font-weight: 900;
  color: #865c83;
  line-height: 1.5;
  margin: 0;
}

.studio-entry-card p {
  font-size: 11px;
  color: #967c92;
  line-height: 1.8;
  margin-top: 5px;
  margin-bottom: 0;
}

.studio-btn {
  font-size: 12px;
  font-weight: 850;
  flex-shrink: 0;
  background: #eee0f8;
  color: #9565b1;
  border: 1px solid #e0c8ef;
  box-shadow: 0 3px 0 #e0c8ef;
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
}

.studio-btn:hover {
  background: #e5d2f3;
  transform: translateY(-1px);
  box-shadow: 0 4px 0 #e0c8ef;
}

.studio-btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #e0c8ef;
}

@media (max-width: 760px) {
  .studio-entry-card {
    padding: 18px 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .studio-entry-card > div:nth-child(2) {
    flex-basis: calc(100% - 60px);
  }
  .studio-btn {
    width: 100%;
    margin-top: 2px;
    justify-content: center;
  }
}
</style>
