<script setup lang="ts">
defineProps<{
  show: boolean;
  message: string;
  type?: 'success' | 'info' | 'warning';
}>();
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="opacity-100 translate-y-0 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:translate-x-0"
      leave-to-class="opacity-0 -translate-y-4 sm:translate-y-0 sm:translate-x-4"
    >
      <div
        v-if="show"
        class="fixed top-5 right-5 z-50 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border flex items-center gap-3 transition-all"
        :class="{
          'border-amber-200 text-stone-900': type === 'success',
          'border-blue-200 text-blue-900': type === 'info',
          'border-orange-200 text-orange-900': type === 'warning',
        }"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm"
          :class="{
            'bg-amber-500': type === 'success',
            'bg-blue-500': type === 'info',
            'bg-orange-500': type === 'warning',
          }"
        >
          <span v-if="type === 'success'">✓</span>
          <span v-else-if="type === 'info'">i</span>
          <span v-else>!</span>
        </div>
        <div class="text-sm font-medium leading-snug flex-1">
          {{ message }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
