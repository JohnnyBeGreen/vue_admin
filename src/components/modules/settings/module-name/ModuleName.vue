<template>
    <section class="jg-container">
        <JG-TextInput 
            :label="$t('modules.modules.moduleNameLabel')" 
            :imported-data="moduleDataNameComputed"
            @update:value="moduleData.value.name = $event"
            :readonly="moduleExists ? true : false"
            :valid="moduleData.valid"
            :validationMessage="moduleData.validationMessage"
        />
        
        <JG-Notification :notification-data="notificationComputed"/>
        
        <JG-Button 
            v-if="!moduleExists"
            class="jg-button_hl jg-button_wm jg-button_accent jg-button_style-1"
            :name="$t('controls.save')"
            @click="addModule()"
        />
    </section>
</template>

<script>
import {isEmpty, formValidationUtil, validationResult} from '@/mixins/validation/validation'

export default {
    name: 'ModuleName',

    emits: ['update:data'],
    mixins: [isEmpty, formValidationUtil, validationResult],
    data() {
        return {
            moduleData: {
                label: this.$t("modules.modules.moduleNameLabel"),
                value: {},
                valid: true,
                validationMessage: ''
            },

            loading: false,
            notification: null,
            moduleExists: true,

            //Validation
            validationErrors: 0,
            validationFields: new Set()
        }
    },
    computed: {
        moduleDataNameComputed() {
            return this.moduleData.value.name
        },
        notificationComputed() {
            return this.notification
        },
        moduleExistsComputed() {
            return this.moduleExists
        }
    },
    mounted() {
        this.moduleSettingsInit()
    },
    methods: {        
        validateModuleName() {
            if (this.isEmpty(this.moduleData.value)) {
                this.formValidationUtil(this.moduleData, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.moduleData.label)
            } else {
                this.formValidationUtil(this.moduleData, true)
            }
        },
        validation() {
            this.validationErrors = 0
            this.validationFields.clear()

            this.validateModuleName()

            //Validation result
            return this.validationResult(this.validationErrors, this.validationFields)
        },

        moduleSettingsInit() {
            this.getModule(this.getModuleName())
        },
        getModuleName() {
            if (this.$route.meta.moduleName) return this.$route.meta.moduleName
            else return null
        },
        async getModule(name) {
            try {
                if (name) {
                    const result = await this.axios({
                        method: 'GET',
                        url: 'modules/name/' + name
                    })
                    
                    if (result.data.code === 404) {
                        this.notification = { 
                            response: {
                                error: {error_message: this.$t("modules.modules.errors.moduleNotFound")}
                            },
                            manualyClose: true
                        }
                        throw new Error('404')
                    }

                    this.moduleData.value = result.data.data
                    this.moduleExists = true
                } else {
                    throw new Error('Name not found')
                }
            } catch(e) {
                this.moduleExists = false

                if (e.message === '404') {
                    this.moduleData.value.name = name
                    console.log(e)
                } else if (e.message === 'Name not found') {
                    this.notification = {
                        response: {
                            error: {error_message: this.$t("modules.modules.errors.nameNotFound")}
                        },
                        manualyClose: true
                    }
                    console.log(e)
                }
            }
        },
        async addModule() {
            if (this.validation()) {
                try {
                    this.loading = true

                    const result = await this.axios({
                        method: 'POST',
                        url: 'modules',
                        data: {
                            name: this.moduleData.value.name
                        }
                    })

                    this.moduleData.value = result.data.data
                    this.moduleExists = true
                    this.notification = { response: result.data }
                } catch(e) {
                    console.log(e.message)
                } finally {
                    this.loading = false
                }
            }
        },
    },
    watch: {
        'moduleData.value': {
            handler(val) {
                if (val.id) this.$emit('update:data', val)
            },
            deep: true
        }
    }
}
</script>