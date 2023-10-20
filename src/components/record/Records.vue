<template>
  <div class="recordArray__wrapper">
    <div
      class="recordArray__wrapper--record"
      v-for="(record, idx) in tunnelRecordArray"
      :key="idx"
    >
      {{ record.name }}
      {{ record.fee }}
      <button @click="deleteRecord(idx)">Delete</button>
    </div>
    {{ tunnelFeeTotal }}
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const tunnelRecordArray = ref(getTunnelRecord());
const tunnelFeeTotal = ref(0);

onMounted(() => {
  tunnelFeeTotal.value = tunnelRecordArray.value.reduce((acc, curr) => {
    return acc + curr.fee;
  }, 0);
});

watch(
  tunnelRecordArray,
  (newVal) => {
    console.log(newVal);
    const total = newVal.reduce((acc, curr) => {
      return acc + curr.fee;
    }, 0);
    tunnelFeeTotal.value = total;
  },
  { deep: true }
);

function getTunnelRecord() {
  const localTunnelRecord = localStorage.getItem("tunnelRecordArray");
  return localTunnelRecord ? JSON.parse(localTunnelRecord) : [];
}

function deleteRecord(index) {
  const storedArray = JSON.parse(localStorage.getItem("tunnelRecordArray")) || [];
  storedArray.splice(index, 1);
  localStorage.setItem("tunnelRecordArray", JSON.stringify(storedArray));
  tunnelRecordArray.value = storedArray;
}
</script>
