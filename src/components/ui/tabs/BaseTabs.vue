<template>
    <section class="jg-tabs jg-tabs__container">
        <div class="jg-tabs__items">
            <template                     
                v-for="(item, index) in linksComputed"
                :key="index"
            >
                <router-link
                    class="jg-tabs__item"
                    :to="item.link"
                >{{item.name}}</router-link>
            </template>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Tabs',

    props: {
        links: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        linksComputed() {
            return this.links
        }
    }
}
</script>