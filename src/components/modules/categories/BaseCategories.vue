<template>
    <section class="jg-categories">
        <section class="jg-categories__root">
            <JG-TextInput  
                :label="$t('modules.categories.addRootCategoryLabel')"
                class="jg-input_l"
                @update:value="rootCategory.value = $event"
                :showValidation="true"
                :valid="rootCategory.valid"
                :validationMessage="rootCategory.validationMessage"
            />
            
            <JG-Notification />
            
            <JG-Button 
                class="jg-button jg-button_hl jg-button_style-1 jg-button_accent" 
                :name="$t('modules.categories.addRootCategoryButton')"
                @click="addRootCategory()"
            />
        </section>
        
        <section class="jg-categories__items">
            <template v-for="(item, index) in rootCategories" :key="index">
                <Category :category="item"/>
            </template>
        </section>
    </section>
</template>

<script>
import {isEmpty, formValidationUtil, validationResult} from '@/mixins/validation/validation'
import Category from './Category'

export default {
    name: 'BaseCategories',

    components: {
        Category
    },
    mixins: [isEmpty, formValidationUtil, validationResult],
    data() {
        return {
            rootCategory: {
                label: this.$t("modules.categories.addRootCategoryLabel"),
                value: '',
                valid: true,
                validationMessage: ''
            },
            rootCategories: [],

            //Validation
            validationErrors: 0,
            validationFields: new Set()
        }
    },
    mounted() {
        this.getRootCategories()
    },
    methods: {
        validation() {
            if (this.isEmpty(this.rootCategory.value)) {
                this.formValidationUtil(this.rootCategory, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.rootCategory.label)
            } else {
                this.formValidationUtil(this.rootCategory, true)
            }

            //Validation result
            return this.validationResult(this.validationErrors, this.validationFields)
        },

        async addRootCategory() {
            if (this.validation()) {
                try {
                    const {data} = await this.axios({
                        method: 'POST',
                        url: 'cat',
                        data: {
                            name: this.rootCategory.value,
                            author: this.$store.getters['auth/ID']
                        }
                    })
                    
                    if (data.code !== 200 && data.code !== 201 && data.code !== 202) {
                        this.$store.dispatch('notifications/notification', {code: data.code, data: data.error_message})
                    }
                    else {
                        this.$store.dispatch('notifications/notification', {code: data.code, message: this.$t("notifications.categories.categoryCreated")})
                    }

                    this.getRootCategories()
                } catch(e) {
                    console.error('Add root category error', e)
                }
            } else return
        },
        async getRootCategories() {
            try {
                const {data} = await this.axios({
                    method: 'GET',
                    url: 'cat/roots'
                })

                this.rootCategories = data.data
            } catch(e) {
                console.error('Get root categories error', e)
            }
        }
    }
}
</script>