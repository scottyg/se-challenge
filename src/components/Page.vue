<script setup>
import { usePageStore } from '../stores/page'
import { useAcknowledgeStore } from '../stores/acknowledge'
import Loading from './Loading.vue'
import axios from 'axios';
// Load state from store
const pageStore = usePageStore()
const acknowledgeStore = useAcknowledgeStore()
</script>

<template>
  <main class="container mx-auto" role="main">
    <div
      v-if="(pageStore.getPage == 'Benefits' && benefits == null) || (pageStore.getPage == 'Safety' && safety == null) || (pageStore.getPage == 'Policies' && policies == null)"
      class="p-4 flex flex-col items-center gap-4">
      <Loading />
    </div>
    <div v-if="pageStore.getPage == 'Benefits' && benefits !== null">
      <draggable v-model="benefits" group="benefits" @start="drag = true" @end="drag = false" item-key="id"
        class="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <template #item="{ element }">
          <div class="border border-switch-gray-dark bg-white dark:bg-switch-gray-darker cursor-move">
            <div class="bg-switch-red px-4 py-2 text-base text-white font-bold benefit-title">{{ element.title }}</div>
            <div class="text-base p-4 font-light dark:text-white">{{ element.description }}</div>
          </div>
        </template>
      </draggable>
      <div class="mb-4 flex justify-center items-center flex-col sm:flex-row" v-if="!acknowledgeStore.status">
        <div class="flex justify-center items-center mb-2 sm:mb-0">
          <input
            class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none border-[0.125rem] border-solid border-switch-red outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-switch-red checked:bg-switch-red checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-switch-red dark:checked:bg-switch-red"
            type="checkbox" value="true" :checked="checkedAcknowledge" v-model="checkedAcknowledge"
            id="checkboxDefault" />
          <label
            class="inline-block pl-[0.15rem] hover:cursor-pointer text-base font-light dark:text-white w-3/4 sm:w-auto"
            for="checkboxDefault">
            I have read and understand the benefits of Switch Dock.
          </label>
        </div>
        <button class="text-base p-2 bg-switch-red sm:ml-4 text-white font-bold" @click="onClickAcknowledge">Acknowledge
          Benefits</button>
      </div>
      <div v-if="acknowledgeStore.status" class="text-center text-base font-light dark:text-white mb-4">
        Benefits of Switch Dock have been acknowledged. <button class="text-switch-red underline"
          @click="onClickReset">Reset Response</button>
      </div>
    </div>
    <div v-if="pageStore.getPage == 'Safety' && safety !== null" class="p-4 text-base dark:text-white">
      {{ pageStore.getPage }} {{ safety }}
    </div>
    <div v-if="pageStore.getPage == 'Policies' && policies !== null" class="p-4 text-base dark:text-white">
      {{ pageStore.getPage }} {{ policies }}
    </div>
  </main>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      benefits: null,
      drag: false,
      checkedAcknowledge: false,
      safety: null,
      policies: null,
    }
  },
  methods: {
    onClickAcknowledge(event) {
      // Update page state
      const acknowledgeStore = useAcknowledgeStore()
      acknowledgeStore.status = this.checkedAcknowledge
      localStorage.setItem('acknowledge', this.checkedAcknowledge)
    },
    onClickReset(event) {
      // Update page state
      const acknowledgeStore = useAcknowledgeStore()
      acknowledgeStore.status = this.checkedAcknowledge = false
      localStorage.setItem('acknowledge', this.checkedAcknowledge)
    },
  },
  created() {
    const acknowledgeStore = useAcknowledgeStore()
    // Fetch API example - used for benefits content
    fetch('/benefits.json')
      .then(response => response.json())
      .then(data => this.benefits = data.benefits)
    // Axios example - used for safety and policies message
    axios.get('/unavailable.json')
      .then(response => this.policies = this.safety = response.data.message)
    // Check and load localstorage for acknowledge status
    if (localStorage.getItem('acknowledge') == null) {
      acknowledgeStore.status = false
      localStorage.setItem('acknowledge', false)
    } else {
      this.checkedAcknowledge = JSON.parse(localStorage.getItem('acknowledge'))
      acknowledgeStore.status = this.checkedAcknowledge
    }
  }
}
</script>