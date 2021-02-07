<template>
    <section class="jg-layout jg-layout__body">
        <section name="top" class="jg-layout__top"><Header /></section>
        
        <section name="middle" class="jg-layout__middle">
            <section name="view" class="jg-layout__view"><router-view /></section>
        </section>
        
        <section name="bottom" class="jg-layout__bottom"><Footer /></section>
    </section>
</template>

<script>
import Header from '@/components/shared/TheHeader'
import Footer from '@/components/shared/TheFooter'

export default {
    name: 'PublicLayout',

    components: {
        Header,
        Footer
    }
}
</script>