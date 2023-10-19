<template>
  <div class="speedMeter__wrapper">
    <div class="speedMeter__wrapper--speed">
      {{ speedMeter }}
    </div>
    <div class="speedMeter__wrapper--unit">
      km/h
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  currentLocation: {
    type: Object,
    required: true
  },
});

const speedMeter = ref(props.currentLocation.speed);

if (speedMeter.value <= 0 || speedMeter.value === null) {
  speedMeter.value = 0;
}

watch(props.currentLocation, (newValue, oldValue) => {
  speedMeter.value = newValue.speed;

  if (speedMeter.value <= 0 || speedMeter.value === null) {
    speedMeter.value = 0;
  }
});
</script>