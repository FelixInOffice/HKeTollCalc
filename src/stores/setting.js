import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", () => {
  const alwaysScreenOn = ref(false);

  return { alwaysScreenOn };
});
