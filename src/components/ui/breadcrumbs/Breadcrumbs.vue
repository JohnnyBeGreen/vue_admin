<template>
    <div class="jg-breadcrumbs">
        <div 
            v-for="(item, index) in breadcrumbsComputed"
            :key="index"
            class="jg-breadcrumbs__item"
        >
            <div>
                <router-link 
                    v-if="breadcrumbsComputed.length > 0 && index !== breadcrumbsComputed.length - 1" 
                    class="jg-breadcrumbs__item_active" 
                    :to="item.to">
                    {{ item.name }}
                </router-link>
                <span v-if="index !== breadcrumbsComputed.length - 1">&nbsp;/&nbsp;</span>
            </div>
                        
            <span v-if="index === breadcrumbsComputed.length - 1">{{ item.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs',

    data() {
        return {
            breadcrumbs: null
        }
    },
    computed: {
        breadcrumbsComputed() {
            return this.breadcrumbs
        }
    },
    mounted() {
        this.breadcrumbs = this.$route.meta.breadcrumbs()
    }
}
</script>