<template>
  <div class="setting__wrapper">
    <div
      v-for="settingItem in settingData.content"
      class="setting__wrapper--item"
    >
      <div class="item--name">{{ settingItem.name }}</div>
      <ToggleSwitch
        :status="settingStore.setting[settingItem.key]"
        @toggleSwitch="toggleSetting(settingItem)"
      />
    </div>
  </div>
</template>

<script setup>
import ToggleSwitch from "../common/ToggleSwitch.vue";
import { useSettingStore } from "@/stores/setting";
import settingData from "@/pageData/settingData";

const settingStore = useSettingStore();

function toggleSetting(settingItem) {
  if (settingStore.setting[settingItem.key]) {
    localStorage.setItem(settingItem.key, false);
    settingStore.setting[settingItem.key] = false;
  } else {
    localStorage.setItem(settingItem.key, true);
    settingStore.setting[settingItem.key] = true;
  }
}
</script>
