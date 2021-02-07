<template>
  <div class="gz-regular-page-modal" :class="data.class">
    <div class="gz-regular-page-modal__header">
      <span :class="data.icon" class="gz-regular-page-modal__icon"></span>
      <span>{{ data.title }}</span>
    </div>

    <section v-if="data.content" class="gz-regular-page-modal__content">
      <div class="gz-regular-page-modal__text" v-html="data.content"></div>
    </section>

    <component v-if="data.component" :is="data.component" :data="data.data"/>

    <div v-if="data.action" class="gz-regular-page-modal__actions">
      <div v-if="data.actionsNote">
        <span>{{ data.actionsNote }}</span>
      </div>
      
      <section>
        <JG-Button
            v-if="showConfirmButton"
            :name="data.confirmBtnText ? data.confirmBtnText : $t('modals.actions.yes')"
            class="gz-button jg-button_hm jg-button_wm jg-button_style-1 jg-button_accent"
            @click="makeAnAction()"
        />
        <JG-Button
            v-if="showCancelButton"
            :name="data.cancelBtnText ? data.cancelBtnText : $t('modals.actions.no')"
            class="gz-button jg-button_hm jg-button_wm jg-button_style-1 jg-button_monohrome"
            @click="$store.dispatch('modal/close')"
        />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegularModalTemplate',

  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showConfirmButton: this.data.showConfirmButton === false ? false : true,
      showCancelButton: this.data.showCancelButton === false ? false : true
    }
  },
  methods: {
    makeAnAction() {
      this.data.action()
      this.$store.dispatch('modal/close')
    }
  }
}
</script>