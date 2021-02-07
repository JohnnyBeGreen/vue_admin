<template>
    <jg-view-template :loading="loading" nested>
        <template v-slot:above-content>
            <tool-panel>
                <template v-slot:left>
                    <JG-SelectInput 
                        :label="$t('filters.categoryFilter')"
                        :is-filter="true"
                        class="jg-input-select_filter"
                        :options="toolsPanel.categories"
                        @update:value="toolsPanel.selectedCategory = $event"
                        :imported-data="toolsPanel.selectedCategory"
                        :label-active="false"
                        :loading="categoriesLoading"
                    />
                </template>
                <template v-slot:right>
                    <JG-Button 
                        class="jg-button jg-button_hm jg-button_style-1 jg-button_wm jg-button_accent" 
                        :name="$t('modules.documents.list.addDocumentButton')"
                        @click="$router.push('/admin/modules/documents/add')"
                    />
                </template>
            </tool-panel>
        </template>
        <template v-slot:content>
            <section v-if="documentsListComputed && documentsListComputed.length" class="jg-list-container jg-news-list">
                <ListItem 
                    v-for="(item, index) in documentsListComputed"
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
            <section v-else class="jg-list-container jg-list-container__nodata"><span>{{$t('modules.documents.list.noDocumentsFound')}}</span></section>
        </template>
    </jg-view-template>
</template>

<script>
import ToolPanel from '@/components/ui/toolpanel/BaseToolPanel'
import ListItem from '@/components/modules/documents/list/BaseListItem'
import getModule from '@/mixins/http-requests/module-and-settings/get-module'
import getSettings from '@/mixins/http-requests/module-and-settings/get-settings'

export default {
    name: 'DocumentListView',
    
    components: {
        ToolPanel,
        ListItem
    },
    mixins: [getModule, getSettings],
    data() {
        return {
            documentsList: [],
            toolsPanel: {
                categories: [],
                selectedCategory: {}
            },

            loading: false,
            loadingLoadMore: false,
            showLoadMore: true,
            
            page: 1,
            limit: null,

            categoriesLoading: false
        }
    },
    computed: {
        documentsListComputed() {
            return this.documentsList
        }
    },
    mounted() {
        this.getDocumentsList()
        
        this.getModule()
            .then(result => {
                this.getSettings(result.data.data.id)
                    .then(async response => {
                        try {
                            this.categoriesLoading = true

                            const result = await this.axios({
                                method: 'GET',
                                url: 'cat/descendants',
                                params: {
                                    id: response.data.data.root_category
                                } 
                            })

                            this.toolsPanel.categories.push({
                                name: 'Все разделы',
                                value: 0
                            })
                            result.data.data.descendants.forEach(item => {
                                this.toolsPanel.categories.push({
                                    name: item.name,
                                    value: item._id
                                })
                            })
                        } catch(e) {
                            console.log(e)
                        } finally {
                            this.categoriesLoading = false
                        }
                    })
            })        
    },
    methods: {
        async getDocumentsList(loadMore = false) {
            try {
                if (!loadMore) this.loading = true

                const {data} = await this.axios({
                    method: 'GET',
                    url: 'files/by-type/DOCUMENT',
                    params: {
                        page: this.page,
                        limit: this.limit ? this.limit : null
                    }
                })
                
                if (data.data.length) {
                    data.data.forEach(item => {
                        this.documentsList.push(item)
                    })
                }
                
                if (data.total === this.documentsList.length) this.showLoadMore = false
                else this.showLoadMore = true
                
            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async findDocuments(settings, loadMore = false) {
            try {
                if (!loadMore) this.loading = true

                const {data} = await this.axios({
                    method: 'GET',
                    url: 'files/',
                    params: {
                        type: settings.type,
                        refer: settings.refer,
                        author: settings.author,
                        page: this.page,
                        limit: this.limit ? this.limit : null
                    }
                })

                if (data.data.length) {
                    data.data.forEach(item => {
                        this.documentsList.push(item)
                    })
                }

                if (data.total === this.documentsList.length) this.showLoadMore = false
                else this.showLoadMore = true

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

                if (!this.toolsPanel.selectedCategory.value) {
                    await this.getDocumentsList(loadMore)
                } else {
                    await this.findDocuments({refer: this.toolsPanel.selectedCategory.value}, loadMore)
                }
            
            } catch(e) {
                console.log(e)
            } finally {
                this.loadingLoadMore = false
            }
        }
    },
    watch: {
        'toolsPanel.selectedCategory': {
            handler(val) {
                this.documentsList = []
                this.page = 1
                
                if (val.value) this.findDocuments({ refer: val.value })
                else this.getDocumentsList()
            },
            deep: true
        }
    }
}
</script>