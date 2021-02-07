<template>
    <transition name="fade" appear>
        <!-- Фон-затемнение -->
        <div
            v-if="isOpen"
            class="gz-modal__bcg"
            @click.self="modalClose()"
        >
            <span @click="modalClose" class="icon-cross gz-modal__close-icon"></span>
            <!-- Контейнер модального окна -->
                <div v-if="isOpen" class="gz-modal__container">
                    <div class="gz-modal__body">
                        <component 
                            :is="component ? component.component : false" 
                            :data="component ? component.data : false" 
                        />
                    </div>
                </div>
            <!-- End Контейнер модального окна -->
        </div>
        <!-- End Фон-затемнение -->
    </transition>
</template>

<script>
export default {
    computed: {
        isOpen() {
            return this.$store.getters['modal/open']
        },
        component() {
           return this.$store.getters['modal/component']
        }
    },
    methods: {
        modalClose() {
            this.$store.dispatch('modal/close')
        }
    }
}
</script>

<style lang="sass" scoped>
.gz-modal__bcg
    position: fixed
    top: 0
    left: 0
    
    width: 100%
    height: 100%
    
    padding: 10px 
    box-sizing: border-box
    
    background: rgba(#000, .6)

    display: inline-flex
    flex-direction: row
    justify-content: center
    align-items: center
    
    z-index: 300000

.gz-modal__close-icon
    position: absolute
    right: 20px
    top: 20px

    cursor: pointer

    color: #fff

    transition: all .25s ease
    &:hover
        transform: rotate(180deg)

    @media screen and ( max-width: 480px )
        font-size: .6em
        top: 10px
        right: 10px

.gz-modal__container
    position: relative
    
    box-sizing: border-box
    margin: auto
    border-radius: 0.3rem

    box-shadow: 0px 0px 8px 3px rgba(#000, .1)
    box-sizing: border-box

    width: 600px
    @media screen and ( max-width: 768px )
        width: 100%
</style>