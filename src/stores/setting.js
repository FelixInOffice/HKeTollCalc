import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", () => {
  const showSpeedMeter = ref(true);
  const showGPSStatus = ref(true);
  const localShowSpeedMeter = localStorage.getItem("showSpeedMeter");
  const localShowGPSStatus = localStorage.getItem("showGPSStatus");

  if (localShowSpeedMeter) {
    showSpeedMeter.value = JSON.parse(localShowSpeedMeter);
  } else {
    localStorage.setItem("showSpeedMeter", showSpeedMeter.value);
  }

  if (localShowGPSStatus) {
    showGPSStatus.value = JSON.parse(localShowGPSStatus);
  } else {
    localStorage.setItem("showGPSStatus", showGPSStatus.value);
  }

  return { showSpeedMeter, showGPSStatus };
});
