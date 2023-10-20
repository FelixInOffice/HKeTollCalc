import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTunnelRecordStore = defineStore('counter', () => {
  const localTunnelRecord = JSON.parse(localStorage.getItem('tunnelRecordArray')) || [];

  function addRecord(tunnel) {
    console.log(tunnel);
    localTunnelRecord.push(tunnel);
    localStorage.setItem('tunnelRecordArray', JSON.stringify(localTunnelRecord));
  }

  return { addRecord }
})
