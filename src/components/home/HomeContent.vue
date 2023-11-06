<template>
  <div class="home__wrapper" :class="{ freeze: !permissionStatus || addRecordPopupStatus }">
    <TunnelCard :tunnels="tunnel" :currentLocation="currentLocation" @add-record="addRecordPopupMessage($event)" />
  
    <div v-if="settingStore.setting.showGPSStatus" class="home__wrapper--permissionStatus" :class="[ permissionStatus ? 'status-dot-green' : 'status-dot-red' ]">
    </div>
  
    <Popup v-if="errorPopupControl" :title="errorTitle" :content="errorContent">
      <Button v-if="errorPopupControl" @click="errorPopupControl = !errorPopupControl">Close</Button>
    </Popup>
  
    <Popup v-if="!permissionStatus && !errorPopupControl" title="載入中..." content="正在取得你的當前位置..." />

    <Popup v-if="addRecordPopupStatus" title="已添加至紀錄!" :content="currentClickedTunnel.name" />
  </div>
  <SpeedMeter v-if="settingStore.setting.showSpeedMeter" :currentLocation="currentLocation" />
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import tunnel from "@/pageData/tunnel";
import Popup from "../common/Popup.vue";
import Button from "../common/Button.vue";
import TunnelCard from "./TunnelCard.vue";
import SpeedMeter from "../common/SpeedMeter.vue";
import { useSettingStore } from "@/stores/setting";

const permissionStatus = ref(false);
const errorPopupControl = ref(false);
const errorTitle = ref("");
const errorContent = ref("");
const currentLocation = reactive({
  speed: null,
  timestamp: null,
  latitude: null,
  longitude: null,
});
const addRecordPopupStatus = ref(false);
const currentClickedTunnel = ref(null);

const settingStore = useSettingStore();

onMounted(() => {
  handleWatchPosition();
});

function handleWatchPosition() {
  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
  });
}

function success(position) {
  permissionStatus.value = true;
  errorPopupControl.value = false;

  const speed = position.coords.speed;
  const timestamp = position.timestamp;
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  currentLocation.speed = Math.round(speed * 3.6);
  currentLocation.timestamp = timestamp;
  currentLocation.latitude = latitude;
  currentLocation.longitude = longitude;
}

function error(err) {
  permissionStatus.value = false;
  errorPopupControl.value = true;

  errorTitle.value = "錯誤碼：" + err.code;
  errorContent.value = err.message;
}

function playSound() {
  const audio = new Audio('./music/added.mp3');
  audio.play();
}

function addRecordPopupMessage(tunnel) {
  currentClickedTunnel.value = tunnel;
  addRecordPopupStatus.value = true;

  if (settingStore.setting.playSoundWhenAddToRecord) {
    playSound();
  }

  setTimeout(() => {
    addRecordPopupStatus.value = false;
  }, 1000);
}
</script>
