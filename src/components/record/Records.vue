<template>
  <div class="recordArray__wrapper">
    <div class="recordArray__wrapper--topBar">
      Total: {{ tunnelFeeTotal }}
    </div>
    <div
      class="recordArray__wrapper--record"
      v-for="(record, idx) in tunnelRecordArray"
      :key="idx"
    >
      <div class="recordArray__wrapper--record--info">
        <div>
          {{ record.name }}
          HKD {{ record.fee }}
        </div>
        <div>
          {{ record.time }}
        </div>
      </div>
      <button @click="deleteRecord(idx)">Delete</button>
    </div>
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
