<template>
  <button class="button" :class="[{disabled: disabled}, buttonClass]" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  buttonClass: {
    type: String,
    default: '',
  },
});
</script>