<template>
  <div class="home__wrapper" :class="{ freeze: !permissionStatus }">
    <TunnelCard :tunnels="tunnel" :currentLocation="currentLocation" />
  
    <div class="home__wrapper--permissionStatus" :class="[ permissionStatus ? 'status-dot-green' : 'status-dot-red' ]">
    </div>
  
    <Popup v-if="errorPopupControl" :title="errorTitle" :content="errorContent">
      <Button v-if="errorPopupControl" @click="errorPopupControl = !errorPopupControl">Close</Button>
    </Popup>
  
    <Popup v-if="!permissionStatus && !errorPopupControl" title="Getting your location.." content="loading..." />
  </div>
  <SpeedMeter :currentLocation="currentLocation" />
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import tunnel from "@/pageData/tunnel";
import Popup from "../common/Popup.vue";
import Button from "../common/Button.vue";
import TunnelCard from "./TunnelCard.vue";
import SpeedMeter from "../common/SpeedMeter.vue";

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

  errorTitle.value = "Error: " + err.code;
  errorContent.value = err.message;
}
</script>
