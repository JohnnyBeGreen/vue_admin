<template>
    <jg-view-template nested breadcrumbs>
        <template v-slot:content>
            <section class="jg-tabs-style1__container">
                <JG-Button 
                    :name="$t('tabs.addForm')" 
                    @click="component = 'form'" 
                    class="jg-tabs-style1__item" 
                    :class="{'jg-tabs-style1__item_active': component === 'form'}"
                />
                
                <JG-Button 
                    v-if="newsId"
                    :name="$t('tabs.gallery')" 
                    @click="component = 'gallery'" 
                    class="jg-tabs-style1__item"
                    :class="{'jg-tabs-style1__item_active': component === 'gallery'}"
                    :icon="$store.getters['gallery/FILES_COUNT'] ? 'icon-images' : ''"
                />
            </section>

            <keep-alive><NewsForm v-if="component === 'form'" /></keep-alive>
            
            <Gallery 
                v-if="component === 'gallery'" 
                :parent="newsId" 
                :types-to-exclude="[$store.getters['file_types/NEWS_COVER']]"/>
        </template>
    </jg-view-template>
</template>

<script>
import NewsForm from '@/components/modules/news/form/Form'
import Gallery from '@/components/modules/gallery/Gallery'

export default {
    name: 'AddNews',

    components: {
        NewsForm,
        Gallery
    },
    data() {
        return {
            component: 'form'
        }
    },
    beforeUnmount() {
        this.$store.dispatch('news/news_id', null)
    },
    computed: {
        newsId() {
            if (this.$route.params.id) return this.$route.params.id
            else return this.$store.getters['news/NEWS_ID']
        }
    }
}
</script>