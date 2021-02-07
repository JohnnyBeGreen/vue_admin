<template>
    <jg-view-template :loading="loading" nested>
        <template v-slot:above-content>
            <tool-panel>
                <template v-slot:right>
                    <JG-Button 
                        class="jg-button jg-button_hm jg-button_style-1 jg-button_wm jg-button_accent" 
                        :name="$t('modules.news.list.addNewsButton')"
                        @click="$router.push('/admin/modules/news/add')"
                    />
                </template>
            </tool-panel>
        </template>
        <template v-if="newsListComputed" v-slot:content>
            <section class="jg-list-container jg-news-list">
                <ListItem 
                    v-for="(item, index) in newsListComputed"
                    :key="index"
                    :item="item"
                />

                <JG-Button 
                    v-if="showLoadMore"
                    @click="!loadingLoadMore ? loadMore(true) : false" 
                    class="jg-button jg-button_monohrome mauto mtop-xl" 
                    name="загрузить еще"
                    :loading="loadingLoadMore"
                />
            </section>
        </template>
    </jg-view-template>
</template>

<script>
import ListItem from '@/components/modules/news/list/BaseListItem'
import ToolPanel from '@/components/ui/toolpanel/BaseToolPanel'

export default {
    name: 'NewsList',

    components: {
        ListItem,
        ToolPanel
    },
    data() {
        return {
            newsList: [],
            loading: false,
            loadingLoadMore: false,
            showLoadMore: true,
            
            page: 1,
            limit: null
        }
    },
    computed: {
        newsListComputed() {
            return this.newsList
        }
    },
    mounted() {
        this.getNewsList()
    },
    methods: {
        async getNewsList(loadMore = false) {
            try {
                if (!loadMore) this.loading = true

                const {data} = await this.axios({
                    method: 'GET',
                    url: 'news',
                    params: {
                        page: this.page,
                        limit: this.limit ? this.limit : null
                    }
                })

                if (data.data.length) {
                    data.data.forEach(item => {
                        this.newsList.push(item) 
                    })
                } 
                
                if (data.total === this.newsList.length) this.showLoadMore = false

            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

        async loadMore(loadMore) {
            this.page++
            try {
                this.loadingLoadMore = true

                await this.getNewsList(loadMore)
            
            } catch(e) {
                console.log(e)
            } finally {
                this.loadingLoadMore = false
            }
        }
    }
}
</script>