<template>
    <ModuleName @update:data="moduleId = $event.id"/>
    
    <JG-Button 
        v-if="addSettingsButton === 'show'" 
        class="jg-button_secondary" 
        :name="$t('controls.addSettings')" 
        :loading="loading" 
        @click="addSettings()"
    />
    
    <section v-if="settingsId" class="jg-container jg-container_style-1 jg-settings__block">
        <RootCategory :settings-id="settingsId" :root-category-id="settingsDataRootCategory"/>
    </section>
</template>

<script>
import ModuleName from '@/components/modules/settings/module-name/ModuleName'
import RootCategory from '@/components/modules/settings/root-category/RootCategory'

export default {
    name: 'Settings',

    components: {
        ModuleName,
        RootCategory
    },
    data() {
        return {
            moduleId: null,
            settingsId: null,
            settingsData: null, //Server response

            addSettingsButton: '',
            loading: false
        }
    },
    computed: {
        moduleDataComputed() {
            return this.moduleData
        },
        settingsDataRootCategory() {
            if (this.settingsData && this.settingsData.root_category) return this.settingsData.root_category
            else return false
        }
    },
    methods: {
        async addSettings() {
            try {
                this.loading = true

                const result = await this.axios({
                    method: 'POST',
                    url: 'settings',
                    data: {
                        module_id: this.moduleId
                    }
                })               

                if (result.data.code === 201) {
                    this.addSettingsButton = 'hide'
                    this.settingsId = result.data.data.id
                }
                else {
                    throw new Error(this.$t("modules.settings.errors.errorCreatingSettings"))
                }

            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async getSettings(id) {
            try {
                const result = await this.axios({
                    method: 'GET',
                    url: 'settings/module/' + id
                })

                if (result.data.code !== 404) {
                    this.settingsId = result.data.data._id
                    this.settingsData = result.data.data
                } else {
                    this.addSettingsButton = 'show'
                }

            } catch(e) {
                console.log(e)
            }   
        }
    },
    watch: {
        moduleId: {
            handler(val) {
                if (val) this.getSettings(val)
            }
        }
    }
}
</script>