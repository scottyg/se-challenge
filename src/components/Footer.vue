<script setup>
import { usePageStore } from '../stores/page'
const pageStore = usePageStore()
</script>

<template>
  <footer class="mt-auto bg-black border-t-8 border-switch-red pt-2 sm:pt-0" role="navigation" aria-label="Footer">
    <div class="container mx-auto px-4 h-24 flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center ">
      <div class="text-white text-base">
        Copyright © {{ new Date().getFullYear() }} Switch. All Rights Reserved.
      </div>
      <ul class="flex mb-4 sm:mb-0">
        <li v-for="item in navItems" :key="item"
          class="px-4 w-24 text-base hover:text-switch-red hover:text-md transition-all duration-500 flex justify-center items-center"
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