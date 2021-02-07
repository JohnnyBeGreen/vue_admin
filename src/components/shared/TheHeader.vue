<template>
    <header class="jg-header">
        <section class="jg-header__left">
            <Logo/>
        </section>
        
        <section class="jg-header__right">
            <component :is="rightComponent"></component>
        </section>
    </header>
</template>

<script>
import RightHeader from './BaseRightHeader'
import RightHeaderAuth from './BaseRightHeaderAuth'
import Logo from '@/components/modules/logo/BaseLogo'

export default {
    name: 'TheHeader',

    components: {
        Logo
    },
    computed: {
        rightComponent() {
            return this.$route.meta.requiresAuth ? RightHeaderAuth : RightHeader
        }
    }
}
</script>