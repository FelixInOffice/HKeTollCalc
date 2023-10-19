<template>
  <div class="speedMeter">
    This is the speedMeter
    <pre>
      {{ currentLocation }}
    </pre>
  </div>
</template>

<script setup>
import { watch, reactive } from "vue";
const props = defineProps({
  currentLocation: {
    type: Object,
    required: true
  },
});

// watch(props.currentLocation, (newVal, oldVal) => {
//   console.log("newVal", newVal);
//   console.log("oldVal", oldVal);
// });
</script>