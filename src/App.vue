<template>
  <div id="app">
    <component :is="layout()">
      <router-view/>
    </component>
    <Modal />
  </div>
</template>

<script>
import Modal from '@/components/ui/modals/Modal'

export default {
  name: 'App',

  components: {
    Modal
  },
  methods: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="sass">
  @import './assets/sass/styles'
</style>
