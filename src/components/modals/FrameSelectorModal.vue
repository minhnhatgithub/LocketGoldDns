<script setup lang="ts">
import { ref } from 'vue';
import BaseModal from '../common/BaseModal.vue';
import { LOCKET_FRAMES, LocketFrame } from '../../constants/locketData';

defineProps<{
  show: boolean;
  activeFrame: LocketFrame;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save-frame', frame: LocketFrame): void;
}>();

const sampleUser = ref('user_cute');
const selected = ref<LocketFrame>(LOCKET_FRAMES[0]);

function chooseFrame(frame: LocketFrame) {
  selected.value = frame;
}
</script>

<template>
  <BaseModal :show="show" title="Chọn Khung Avatar Cho Locket" maxWidth="max-w-lg" @close="emit('close')">
    <div class="space-y-6">
      <!-- Live Avatar Preview with Chosen Frame -->
      <div class="flex flex-col items-center justify-center py-4 bg-[#fbf8f1] rounded-3xl border border-[#eedfc4]">
        <div
          class="w-28 h-28 rounded-full p-1.5 transition-all duration-300 shadow-xl relative"
          :style="{ background: `linear-gradient(135deg, ${selected.borderColor}, #f59e0b)` }"
        >
          <!-- Frame Icon Badge -->
          <div class="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm border border-stone-100">
            {{ selected.icon }}
          </div>

          <!-- Avatar Image/Graphic -->
          <div class="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-white font-extrabold text-2xl overflow-hidden">
            <span class="text-3xl">😎</span>
          </div>
        </div>

        <div class="mt-3 text-center">
          <span class="text-xs font-bold text-stone-800">@{{ sampleUser || 'username' }}</span>
          <span class="text-[11px] text-amber-700 block font-semibold mt-0.5">Khung: {{ selected.name }}</span>
        </div>
      </div>

      <!-- Frames Grid -->
      <div class="space-y-2">
        <label class="text-xs font-bold text-stone-700 block">
          Chọn khung yêu thích:
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            v-for="frame in LOCKET_FRAMES"
            :key="frame.id"
            @click="chooseFrame(frame)"
            class="p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-2.5 active:scale-95"
            :class="[
              selected.id === frame.id
                ? 'border-purple-400 bg-purple-50/70 ring-2 ring-purple-300'
                : 'border-stone-200 hover:border-stone-300 bg-white'
            ]"
          >
            <span class="text-xl">{{ frame.icon }}</span>
            <div class="truncate">
              <div class="text-xs font-bold text-stone-800 truncate">{{ frame.name }}</div>
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 font-semibold">{{ frame.tag }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        @click="emit('close')"
        class="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-200 transition-colors"
      >
        Hủy
      </button>
      <button
        @click="emit('save-frame', selected)"
        class="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-sm"
      >
        Lưu khung này ✓
      </button>
    </template>
  </BaseModal>
</template>
