<template>    
    <div class="jg-form jg-form_m mbottom-l">
        <JG-Date 
            @update:result-date="form.date.value = $event"
            :importedData="form.date.savedValue"
            :valid="form.date.valid"
            :validationMessage="form.date.validationMessage"
        />
        <JG-TextInput 
            @update:value="form.title.value = $event" 
            :label="form.title.label"
            :importedData="form.title.value"
            :valid="form.title.valid"
            :validationMessage="form.title.validationMessage"
        />
        <JG-TextEditor 
            @update:text="form.text = $event" 
            class="mbottom-l"
            :importedData="form.text"
        />

        <file-input @update:files="form.main_image = $event">
            <Image :loaded-files="form.main_image" @update:files="form.main_image = $event" />
        </file-input>
    </div>  
    
    <div class="jg-form jg-form_m">
        <JG-Notification :notification-data="notificationComputed"/>
    </div>
    
    <div class="jg-form jg-form_m jg-form__actions">
        <JG-Button 
            :name="mode === 'edit' ? $t('controls.saveChanges') : $t('controls.publish')"
            class="jg-button jg-button_hl jg-button_style-1 jg-button_wm jg-button_accent"
            :icon="mode === 'edit' ? 'icon-floppy-disk' : 'icon-checkmark1'"
            @click="mode === 'edit' ? editNews() : postNews()"
            :loading="loading"
        />
        <JG-Button 
            :name="$t('controls.cansel')"
            class="jg-button jg-button_hl jg-button_style-1 jg-button_wm jg-button_monohrome"
            @click="$router.push('/admin/modules/news/list')"
        />
    </div>
</template>

<script>
import FileInput from '@/components/ui/forms/file-input/FileInputTemplate'
import Image from '@/components/ui/forms/file-input/Image'

import postFile from '@/mixins/http-requests/files/post-file'
import getFile from '@/mixins/http-requests/files/get-file-by-id'
import fileDownload from '@/mixins/http-requests/files/get-file-by-url'
import deleteFile from '@/mixins/http-requests/files/delete-file-by-id'
import {isEmpty, formValidationUtil, validationResult} from '@/mixins/validation/validation'
import moment from 'moment'

export default {
    name: 'NewsForm',

    mixins: [postFile, getFile, fileDownload, deleteFile, isEmpty, formValidationUtil, validationResult],
    components: {
        FileInput,
        Image
    },
    data() {
        return {
            form: {
                date: {
                    label: this.$t('modules.news.add.date'),
                    value: null,
                    savedValue: null,
                    valid: true,
                    validationMessage: ''
                },
                title: {
                    label: this.$t('modules.news.add.title'),
                    value: '',
                    valid: true,
                    validationMessage: ''
                },
                description: {
                    label: '',
                    value: '',
                    valid: true,
                    validationMessage: ''
                },
                text: '',
                main_image: [],
                main_image_name: {
                    label: '',
                    value: '',
                    valid: true,
                    validationMessage: ''
                },
                main_image_id: null, //Delete file helper in edit mode
                main_image_path: null, //Delete file helper in edit mode
                gallery: null
            },
            
            tmp_file: null,

            mode: '',
            news_id: '',

            //loaders
            loading: false,
            notification: null,

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
    activated() {
        if (this.$route.params.id) {
            const id = this.$route.params.id
            this.mode = 'edit'
            this.news_id = id
            this.getNewsById(id)
            this.$store.dispatch('gallery/files_count', id)
        } else {
            this.mode = 'add'
        }
    },
    methods: {
        validationDate() {
            if (this.isEmpty(this.form.date.value)) {
                this.formValidationUtil(this.form.date, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.form.date.label)
            } else {
                this.formValidationUtil(this.form.date, true)
            }
        },
        validationTitle() {
            if (this.isEmpty(this.form.title.value)) {
                this.formValidationUtil(this.form.title, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.form.title.label)
            } else {
                this.formValidationUtil(this.form.title, true)
            }
        },
        validation() {
            this.validationErrors = 0
            this.validationFields.clear()

            this.validationDate()
            this.validationTitle()

            //Validation result
            return this.validationResult(this.validationErrors, this.validationFields)
        },

        async postNews() {
            if (this.validation()) {
                try {
                    this.loading = true 

                    let uploaded_file_id = null
                    
                    if (this.form.main_image && this.form.main_image.length) {
                        const formData = new FormData()

                        formData.append('files', this.form.main_image[0])
                        formData.append('author', this.author)
                        formData.append('original_name', this.form.main_image[0].name)

                        const filePostResult = await this.postFile(formData)
                        
                        uploaded_file_id = filePostResult.data.data[0]._id

                        this.$store.dispatch('gallery/files_count_local', 1)
                    }
                                                                            
                    const {data} = await this.axios({
                        method: 'POST',
                        url: 'news',
                        data: {
                            date: moment(new Date(this.form.date.value.year, this.form.date.value.month, this.form.date.value.day)).format('YYYY-MM-DD[T00:00:00.000Z]'),
                            author: this.author,
                            title: this.form.title.value,
                            text: this.form.text,
                            main_image: uploaded_file_id,
                            main_image_name: this.form.main_image_name.value,
                            description: this.form.description.value,
                        }
                    })
                    
                    this.notification = { response: data }

                    this.$store.dispatch('news/news_id', data.data.news_item._id)

                    this.$router.push('/admin/modules/news/edit/' + data.data.news_item._id)
                } catch(e) {
                    console.log(e)
                } finally {
                    this.form.main_image = []
                    this.loading = false
                }
            }
        },
        async editNews() {
            if (this.validation()) {
                try {
                    this.loading = true 

                    let uploaded_file_id = null
                    let uploaded_file_path = null
                    
                    if (this.form.main_image && this.form.main_image.length) {
                        const formData = new FormData()

                        formData.append('author', this.author)
                        if (this.form.main_image_id) formData.append('id', this.form.main_image_id)
                        if (this.form.main_image_path) formData.append('old_file_path', this.form.main_image_path)

                        let filePostResult = null
                            
                        if (!this.form.main_image[0].lastModified) {
                            formData.append('file', this.form.main_image[0], this.form.main_image[0].name) //third param adds original name to blob object     
                            formData.append('original_name', this.form.main_image[0].name)
                            filePostResult = await this.postFile(formData, 'PATCH')
                            uploaded_file_id = filePostResult.data.data._id
                            uploaded_file_path = filePostResult.data.data.path

                        } else {
                            formData.append('original_name', this.form.main_image[0].name)
                            
                            if (this.form.main_image_id) {
                                formData.append('file', this.form.main_image[0])     
                                filePostResult = await this.postFile(formData, 'PATCH')
                                uploaded_file_id = filePostResult.data.data._id
                                uploaded_file_path = filePostResult.data.data.path
                            }
                            else {
                                formData.append('files', this.form.main_image[0])     
                                filePostResult = await this.postFile(formData)
                                uploaded_file_id = filePostResult.data.data[0]._id
                                uploaded_file_path = filePostResult.data.data[0].path
                            }
                            
                        }

                        this.$store.dispatch('gallery/files_count_local', 1)
                        
                    } else if (this.form.main_image_id) {
                        const deleteFileResult = await this.deleteFile(this.form.main_image_id)
                        
                        this.form.main_image_id = null
                        this.form.main_image_path = null

                        this.$store.dispatch('gallery/files_count', this.news_id)
                        
                        console.log(deleteFileResult)

                    }
                    
                    const {data} = await this.axios({
                        method: 'PATCH',
                        url: 'news/' + this.news_id,
                        data: {
                            date: moment(new Date(this.form.date.value.year, this.form.date.value.month, this.form.date.value.day)).format('YYYY-MM-DD[T00:00:00.000Z]'),
                            title: this.form.title.value,
                            text: this.form.text,
                            main_image: uploaded_file_id ? {id: uploaded_file_id, path: uploaded_file_path} : null,
                            main_image_name: this.form.main_image_name.value,
                            description: this.form.description.value,
                            author: this.author
                        }
                    })

                    this.notification = { response: data }

                    this.getNewsById(this.news_id)

                } catch(e) {
                    console.log(e)
                } finally {
                    this.form.main_image = []
                    this.loading = false
                }
            }
        },
        async getNewsById(id) {
            try {
                const {data} = await this.axios({
                    method: 'GET',
                    url: 'news/' + id
                })
                
                this.form.author = data.data.news.author
                this.form.date.savedValue = data.data.news.date
                this.form.title.value = data.data.news.title
                this.form.description.value = data.data.news.description
                this.form.text = data.data.news.text

                if (data.data.news.main_image) {
                    let downloadFileResult = await this.fileDownload(data.data.news.main_image.path)
                   
                    if (!downloadFileResult) {
                        this.form.main_image = []
                        
                        await this.axios({
                            method: 'PATCH',
                            url: 'news/' + this.news_id,
                            data: {
                                date: moment(new Date(this.form.date.value.year, this.form.date.value.month, this.form.date.value.day)).format('YYYY-MM-DD[T00:00:00.000Z]'),
                                title: this.form.title.value,
                                text: this.form.text,
                                main_image: null,
                                main_image_name: null,
                                description: this.form.description.value,
                                author: this.author
                            }
                        })

                        return
                    }
                    
                    const getFileResult = await this.getFile(data.data.news.main_image.id)

                    
                    downloadFileResult.data.name = getFileResult[0].original_name

                    this.form.main_image = []
                    this.form.main_image.push(downloadFileResult.data)
                    this.form.main_image_id = data.data.news.main_image.id //Helps to delete file in edit mode
                    this.form.main_image_path = data.data.news.main_image.path //Helps to delete file in edit mode

                }
                
            } catch(e) {
                console.log(e)
            }
        }        
    },
    watch:{
        '$route' (to){
            if (to.params.id) {
                this.mode = 'edit'
                this.news_id = to.params.id
                this.getNewsById(to.params.id)
            }
        }
    }
}
</script>