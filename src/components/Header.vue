<script setup>
import { usePageStore } from '../stores/page'
// Load state from store
const pageStore = usePageStore()
</script>

<template>
  <nav class="bg-black pt-2 sm:pt-0" role="navigation" aria-label="Main">
    <div class="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center ">
      <h1>
        <a href="/">
          <img src="/logo_white.png" alt="Switch Dock" width="354" height="25" class="md:ml-4" />
        </a>
      </h1>
      <ul class="flex">
        <li v-for="item in navItems" :key="item"
          class="text-white text-base border-b-2 bg-black hover:border-switch-red transition-colors duration-500"
          :class="item == pageStore.getPage ? 'border-switch-red' : 'border-black'">
          <a :href="'#' + item.toLowerCase()" @click=onClickNav :aria-label=item class="px-8 py-4 block">
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template >

<script>
export default {
  props: {
    navItems: Array,
    currentPage: String,
  },
  methods: {
    onClickNav(event) {
      // Update page state
      const pageStore = usePageStore()
      pageStore.current = event.target.innerText
    }
  }
}
</script>