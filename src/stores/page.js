// Current Page Store/State
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state: () => ({ current: 'Benefits' }),
  getters: {
    getPage: (state) => state.current,
  },
})