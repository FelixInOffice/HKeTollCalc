<template>
  <div class="recordArray__wrapper">
    <div class="recordArray__wrapper--topBar">
      <div class="recordArray__wrapper--topBar--total">
        合計：HKD {{ tunnelFeeTotal }}
      </div>
      <div class="recordArray__wrapper--topBar--deleteAll">
        <button
          :disabled="tunnelRecordArray.length === 0"
          @click="confirmDeleteAllPopupControl = !confirmDeleteAllPopupControl"
        >
          刪除全部
        </button>
      </div>
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
      <button @click="deleteRecord(idx)">刪除</button>
    </div>

    <Popup
      v-if="confirmDeleteAllPopupControl"
      title="確定刪除全部？"
      content="此動作將會刪除所有紀錄，並無法復原。"
    >
      <button @click="deleteAllRecord()">確定</button>
      <button
        @click="confirmDeleteAllPopupControl = !confirmDeleteAllPopupControl"
      >
        取消
      </button>
    </Popup>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Popup from "../common/Popup.vue";

const tunnelRecordArray = ref(getTunnelRecord());
const tunnelFeeTotal = ref(0);
const confirmDeleteAllPopupControl = ref(false);

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
  const storedArray =
    JSON.parse(localStorage.getItem("tunnelRecordArray")) || [];
  storedArray.splice(index, 1);
  localStorage.setItem("tunnelRecordArray", JSON.stringify(storedArray));
  tunnelRecordArray.value = storedArray;
}

function deleteAllRecord() {
  confirmDeleteAllPopupControl.value = !confirmDeleteAllPopupControl.value;
  localStorage.removeItem("tunnelRecordArray");
  tunnelRecordArray.value = [];
}
</script>
