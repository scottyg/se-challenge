<script setup>
import Header from './components/Header.vue'
import Page from './components/Page.vue'
import Footer from './components/Footer.vue'
import { usePageStore } from './stores/page'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-switch-gray-light dark:bg-switch-gray-darkest font-sans">
    <Header :navItems="navItems" />
    <Page />
    <Footer :navItems="navItems" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: ['Benefits', 'Safety', 'Policies'],
    }
  },
  created() {
    // Get current page from hash or show benefits page
    const pageStore = usePageStore()
    if(location.hash == ""){
      pageStore.current = 'Benefits'
    } else{
      pageStore.current = location.hash.slice(1).charAt(0).toUpperCase() + location.hash.slice(2)
    }
  }
}
</script>