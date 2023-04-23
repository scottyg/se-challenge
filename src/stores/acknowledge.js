// Current Page Store/State
import { defineStore } from 'pinia'

export const useAcknowledgeStore = defineStore('acknowledge', {
  state: () => ({ status: false }),
  getters: {
    getStatus: (state) => state.status,
  },
})