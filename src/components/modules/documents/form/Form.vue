<template>
    <div class="jg-form jg-form_m mbottom-l">
        <JG-SelectInput 
            :label="$t('modules.documents.add.documentCategory')"
            :options="categories"
            @update:value="form.category.value = $event, validationCategory()"
            :imported-data="form.category.value"
            :valid="form.category.valid"
            :validationMessage="form.category.validationMessage"
            :loading="categoriesLoading"
        />
        <JG-TextInput 
            :label="$t('modules.documents.add.documentName')"
            @update:value="form.customName.value = $event"
            :imported-data="form.customName.value"
        />
        <file-input 
            @update:files="form.file.value = $event, validationFile()"
            :valid="form.file.valid"
            :validationMessage="form.file.validationMessage"
            :loading="fileLoading"
        >
            <Default 
                :loadedFiles="form.file.value" 
                @update:files="form.file.value = $event"
                :is-edit="mode === 'edit'"
            />
        </file-input>
    </div>

    <div class="jg-form jg-form_m">
        <JG-Notification :notification-data="notificationComputed"/>
    </div>
    
    <div class="jg-form jg-form_m jg-form__actions">
        <JG-Button 
            :name="mode === 'edit' ? $t('controls.saveChanges') : $t('controls.save')"
            class="jg-button jg-button_hl jg-button_style-1 jg-button_wm jg-button_accent"
            :icon="mode === 'edit' ? 'icon-floppy-disk' : 'icon-checkmark1'"
            @click="mode === 'edit' ? editFile() : uploadFile()"
            :loading="loading"
        />
        <JG-Button 
            :name="$t('controls.cansel')"
            class="jg-button jg-button_hl jg-button_style-1 jg-button_wm jg-button_monohrome"
            @click="$router.push('/admin/modules/documents/list')"
        />
    </div>
</template>

<script>
import FileInput from '@/components/ui/forms/file-input/FileInputTemplate'
import Default from '@/components/ui/forms/file-input/Default'
import getModule from '@/mixins/http-requests/module-and-settings/get-module'
import getSettings from '@/mixins/http-requests/module-and-settings/get-settings'
import {isEmpty, formValidationUtil, validationResult} from '@/mixins/validation/validation'
import postFile from '@/mixins/http-requests/files/post-file'
import getFile from '@/mixins/http-requests/files/get-file-by-id'

export default {
    name: 'AddDocumentView',

    mixins: [getModule, getSettings, postFile, getFile, isEmpty, formValidationUtil, validationResult],
    components: {
        FileInput,
        Default
    },
    data() {
        return {
            form: {
                file: {
                    label: '',
                    value: null,
                    valid: true,
                    validationMessage: ''
                },
                category: {
                    label: '',
                    value: {},
                    valid: true,
                    validationMessage: ''
                },
                customName: {
                    label: '',
                    value: '',
                    valid: true,
                    validationMessage: ''
                }
            },
            categories: [],

            mode: '',
            document_id: null,
            old_file_path: null,

            loading: false,
            notification: null,
            categoriesLoading: false,
            nameLoading: false,
            fileLoading: false,

            //Validation
            validationErrors: 0,
            validationFields: new Set()
        }
    },
    computed: {
        author() {
            return this.$store.getters['auth/ID']
        },
        notificationComputed() {
            return this.notification
        }
    },
    async mounted() {
        this.getModuleInit()
        
        if (this.$route.params.id) {
            this.document_id = this.$route.params.id
            this.mode = 'edit'
            this.getFileInit(this.document_id)
        } else {
            this.mode = 'add'
        }
    },
    methods: {
        validationCategory() {
            if (this.isEmpty(this.form.category.value)) {
                this.formValidationUtil(this.form.category, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.form.category.label)
            } else {
                this.formValidationUtil(this.form.category, true)
            }
        },
        validationFile() {
            if (this.isEmptyArray(this.form.file.value)) {
                this.formValidationUtil(this.form.file, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.form.file.label)
            } else {
                this.formValidationUtil(this.form.file, true)
            }
        },
        validation() {
            this.validationErrors = 0
            this.validationFields.clear()

            this.validationCategory()
            if (this.mode !== 'edit') this.validationFile()

            //Validation result
            return this.validationResult(this.validationErrors, this.validationFields)
        },

        async uploadFile() {
            if (this.validation()) {
                try {
                    this.loading = true

                    const formData = new FormData()
                    
                    formData.append('files', this.form.file.value[0])    
                    formData.append('author', this.author)
                    formData.append('type', 'DOCUMENT')
                    formData.append('refer', this.form.category.value.value)
                    formData.append('name', this.form.customName.value)
                    formData.append('original_name', this.form.file.value[0].name)
    
                    const result = await this.postFile(formData)
                                        
                    this.notification = { response: result.data }

                    this.$router.push('/admin/modules/documents/edit/' + result.data.data[0]._id)
                } catch(e) {
                    console.log(e)
                } finally {
                    this.loading = false
                }
            }
        },
        async editFile() {
            if (this.validation()) {
                try {
                    this.loading = true

                    const formData = new FormData()
                    
                    formData.append('id', this.document_id)
                    
                    if (this.form.file.value instanceof Blob) {
                        formData.append('file', this.form.file.value, this.form.file.value.original_name)
                        formData.append('original_name', this.form.file.value.original_name)
                    } else {
                        formData.append('file', this.form.file.value[0])
                        formData.append('original_name', this.form.file.value[0].name)
                    }
                    
                    formData.append('old_file_path', this.old_file_path)
                    formData.append('author', this.author)
                    formData.append('type', 'DOCUMENT')
                    formData.append('refer', this.form.category.value.value)
                    formData.append('name', this.form.customName.value)
                    
                    const result = await this.postFile(formData, 'PATCH')

                    this.notification = { response: result.data }

                    this.getFileInit(this.document_id)
                } catch(e) {
                    console.log(e)
                } finally {
                    this.loading = false
                }
            }
        },
        async getFileInit(id) {
            try {
                this.categoriesLoading = true
                this.fileLoading = true

                const response = await this.getFile(id)
                                
                this.old_file_path = response[0].path

                const blobResult = await this.axios({
                    method: 'GET',
                    baseURL: process.env.VUE_APP_BASE_URL + response[0].path,
                    responseType: 'blob'
                })
                                
                blobResult.data.name = response[0].name
                blobResult.data.original_name = response[0].original_name
                blobResult.data.path = response[0].path
                
                const result = await this.axios({
                    method: 'GET',
                    url: 'cat/category/' +  response[0].refer
                })
    
                this.form.category.value = {
                    name: result.data.data.name, 
                    value: result.data.data._id
                } 

                this.form.customName.value = response[0].name

                this.form.file.value = blobResult.data
            } catch(e) {
                console.log(e)
            } finally {
                this.categoriesLoading = false
                this.fileLoading = false
            }
        },
        async getModuleInit() {
            try {
                const moduleResult = await this.getModule()
                
                const settingsResult = await this.getSettings(moduleResult.data.data.id)
                
                const categoryResult = await this.axios({
                    method: 'GET',
                    url: 'cat/descendants',
                    params: {
                        id: settingsResult.data.data.root_category
                    } 
                })

                this.categories = []

                categoryResult.data.data.descendants.forEach(item => {
                    this.categories.push({
                        name: item.name,
                        value: item._id
                    })
                })
            } catch(e) {
                console.log(e)
            }
        }
    },
    watch: {
        $route: {
            handler(to) {
                if (to.params.id) {
                    this.mode = 'edit'
                    this.document_id = to.params.id
                    this.getModuleInit()
                    this.getFileInit(to.params.id)
                }
            }
        }
    }
}
</script>