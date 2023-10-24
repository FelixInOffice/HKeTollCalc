import { defineStore } from 'pinia'

export const useTunnelRecordStore = defineStore('counter', () => {
  const localTunnelRecord = JSON.parse(localStorage.getItem('tunnelRecordArray')) || [];

  function addRecord(tunnel) {
    localTunnelRecord.push(tunnel);
    localStorage.setItem('tunnelRecordArray', JSON.stringify(localTunnelRecord));
  }

  return { addRecord }
})
