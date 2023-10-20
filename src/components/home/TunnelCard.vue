<template>
  <div class="tunnelBlock__wrapper">
    <div v-for="tunnel in sortedTunnels" class="tunnelBlock__wrapper--item" @click="addToRecord(tunnel)">
      <div class="tunnelBlock__wrapper--item--name">
        {{ tunnel.name }}
      </div>
      <div class="tunnelBlock__wrapper--item--fee">
        {{ formatFee(tunnel.fee) }}
      </div>
      <div class="tunnelBlock__wrapper--item--distance">
        {{ formatDistance(tunnel.distance) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tunnels: {
    type: Object,
    required: true,
  },
  currentLocation: {
    type: Object,
    required: true,
  },
});

const sortedTunnels = computed(() => {
  return props.tunnels.content.map((tunnel) => {
    const distance = getDistanceFromLatLonInKm(
      props.currentLocation.latitude,
      props.currentLocation.longitude,
      tunnel.location.lat,
      tunnel.location.lng
    );
    return { ...tunnel, distance };
  }).sort((a, b) => a.distance - b.distance);
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function formatDistance(distance) {
  if (distance < 1) {
    return Math.round(distance * 1000) + " 米";
  } else {
    return distance.toFixed(2) + " 公里";
  }
}

function formatFee(fee) {
  return "HKD " + fee;
}

function addToRecord(tunnel) {
  console.log("add to record:", tunnel);
}
</script>
