<script setup>
import { usePageStore } from '../stores/page'
const pageStore = usePageStore()
</script>

<template>
  <footer class="mt-auto bg-black border-t-8 border-switch-red pt-2 sm:pt-0" role="navigation" aria-label="Footer">
    <div class="container mx-auto px-4 py-8 flex flex-col sm:flex-row sm:justify-between items-center ">
      <div class="text-white text-base">
        Copyright © {{ new Date().getFullYear() }} Switch. All Rights Reserved.
      </div>
      <ul class="flex">
        <li v-for="item in navItems" :key="item"
          class="px-4 text-base hover:text-switch-red transition-colors duration-500"
          :class="item == pageStore.getPage ? 'text-switch-red' : 'text-white'">
          <a :href="'#' + item.toLowerCase()" @click=onClickNav :aria-label=item>
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

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