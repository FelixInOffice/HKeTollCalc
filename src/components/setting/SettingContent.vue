<template>
  <div class="setting__wrapper">
    <div class="setting__wrapper--item">
      <div class="item--name">顯示速度計</div>
      <ToggleSwitch :status="settingStore.showSpeedMeter" @toggleSwitch="toggleShowSpeedMeter()" />
    </div>

    <div class="setting__wrapper--item">
      <div class="item--name">顯示 GPS 狀態</div>
      <ToggleSwitch :status="settingStore.showGPSStatus" @toggleSwitch="toggleShowGPSStatus()" />
    </div>
  </div>
</template>

<script setup>
import ToggleSwitch from "../common/ToggleSwitch.vue";
import { useSettingStore } from "@/stores/setting";

const settingStore = useSettingStore();

function toggleShowSpeedMeter() {
  if (settingStore.showSpeedMeter) {
    localStorage.setItem("showSpeedMeter", false);
    settingStore.showSpeedMeter = false;
  } else {
    localStorage.setItem("showSpeedMeter", true);
    settingStore.showSpeedMeter = true;
  }
}

function toggleShowGPSStatus() {
  if (settingStore.showGPSStatus) {
    localStorage.setItem("showGPSStatus", false);
    settingStore.showGPSStatus = false;
  } else {
    localStorage.setItem("showGPSStatus", true);
    settingStore.showGPSStatus = true;
  }
}
</script>