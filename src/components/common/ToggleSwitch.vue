<template>
  <label class="toggleSwitch">
    <input type="checkbox" :checked="status" @input="$emit('toggleSwitch')" />
    <span class="toggleSwitch--slider toggleSwitch--slider--round"></span>
  </label>
</template>

<script setup>
defineEmits(["toggleSwitch"]);
const props = defineProps({
  status: {
    type: Boolean,
    required: true,
  },
});
</script>
