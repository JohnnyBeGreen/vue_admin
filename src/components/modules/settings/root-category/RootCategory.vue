<template>
    <section>
        <JG-SelectInput 
            :label="$t('modules.documents.settings.rootDirectoryLabel')"
            :options="rootCategories"
            @update:value="selectedCategory.value = $event"
            :imported-data="selectedCategory.value"
        />
        
        <JG-Notification :notification-data="notificationComputed"/>
        
        <JG-Button 
            class="jg-button_hl jg-button_wm jg-button_accent jg-button_style-1" 
            icon="icon-floppy-disk" 
            :name="$t('controls.save')"
            @click="saveSettings()"
            :loading="loading"
        />
    </section>
</template>

<script>
import getRootCategories from '@/mixins/http-requests/categories/get-root-categories'

export default {
    name: 'RootCategory',

    props: {
        settingsId: String,
        rootCategoryId: [String, Boolean]
    },
    mixins: [getRootCategories],
    data() {
        return {
            selectedCategory: {
                value: {},
                valid: true,
                validationMessage: ''
            },
            rootCategories: [], //List of root categories
            loading: false,
            notification: null
        }
    },
    computed: {
        rootCategoriesComputed() {
            return this.rootCategories()
        },
        notificationComputed() {
            return this.notification
        }
    },
    async mounted() {
        this.rootCategories = await this.getRootCategories()
    },
    methods: {
        async saveSettings() {
            try {
                this.loading = true
                
                const result = await this.axios({
                    method: 'PATCH',
                    url: 'settings/' + this.settingsId,
                    data: {
                        root_category: this.selectedCategory.value.value
                    }
                })

                if (result.data.error && result.data.code === 422) {
                    throw new Error(this.$t("modules.settings.errors.errorEditSettingsRootCategoryValidation"))    
                } else if (result.data.error) {
                    throw new Error(this.$t("errors.serverError"))    
                }

                this.notification = { response: result.data }

                this.selectedCategory.value = {
                    value: result.data.data.settings.root_category._id,
                    name: result.data.data.settings.root_category.name
                }                             
            } catch(e) {
                this.notification = {
                    response: {
                        error: {error_message: e.message}
                    },
                    manualyClose: true
                }
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async getCurrentCategory(id) {
            try {
                const result = await this.axios({
                    method: 'GET',
                    url: 'cat/category/' + id
                })
                
                if (result.data.code === 404) {
                    throw new Error(this.$t("modules.settings.errors.errorEditSettingsRootCategoryNotExists"))
                }
                this.selectedCategory.value = {
                    value: result.data.data._id,
                    name: result.data.data.name
                }

            } catch(e) {
                this.notification = {
                    response: {
                        error: {error_message: e.message}
                    },
                    manualyClose: true
                }
                console.log(e)
            }
        }
    },
    watch: {
        rootCategoryId: {
            handler(val) {
                if (val) this.getCurrentCategory(val)
            },
            immediate: true
        }
    }
}
</script> 