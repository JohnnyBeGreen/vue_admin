<template>
    <section class="jg-registry">
        <div class="jg-registry__item jg-container jg-container_style-1">
            <div class="jg-registry__item__name mbottom-m"><span>{{ blockName }}</span></div>
            <!-- <div class="mbottom-l">
                <div class="jg-registry__item__input" v-if="!showTitle || (uploadedFile && !uploadedFile.name)">
                    <JG-TextInput  
                        label="название" 
                        @update:value="form.name = $event"
                        :autofocus="true"
                    />
                    <div>
                        <JG-Button icon="icon-floppy-disk" name="изменить" class="jg-button jg-button_medium jg-button_style-1 jg-button_accent"/>
                        <JG-Button name="отмена" class="jg-button jg-button_medium jg-button_style-1 jg-button_monohrome" @click="showHideTitle()"/>
                    </div>
                </div>
                
                <div v-else class="jg-registry__item__name">
                    <span v-if="uploadedFile">{{ uploadedFile.name }}</span>
                    <div 
                        class="jg-icon jg-icon_m jg-icon_style-1 jg-icon_clickable"
                        @click="showHideTitle()"
                    >
                        <span class="icon-pencil"></span>
                    </div>
                </div>
            </div> -->            
            
            <div v-if="uploadedFile" class="jg-registry__item__info mbottom-m">
                <div class="jg-registry__item__info__item">
                    <div>
                        <span><strong>файл загружен:&nbsp;</strong></span>
                        <span>дата последней загрузки {{ uploadedFile ? momentFormatDate(uploadedFile.created_at) : ''}}</span>
                    </div>
                    <div 
                        class="jg-icon jg-icon_m jg-icon_style-1 jg-icon_monohrome jg-icon_clickable"
                        @click="openFile(uploadedFilePath)"
                    >
                        <span class="icon-link"></span>
                    </div>
                </div>
            </div>
            
            <FileInput @update:file="form.newFile = $event" :incoming="form.newFile" class="mbottom-l"/>

            <JG-Notification />

            <JG-Button 
                class="jg-button jg-button_hm jg-button_wm"
                :class="{'jg-button_style-1 jg-button_accent': form.newFile}"
                :name="uploadedFile ? 'обновить' : 'загрузить'"
                :loading="loading"
                :disabled="loading || !form.newFile"
                @click="uploadInit()"
            />
        </div>
    </section>
</template>

<script>
import momentFormatDate from '@/mixins/date-and-time/moment'
import FileInput from '@/components/ui/forms/file-input/FileInput'

export default {
    name: 'RegistryBlock',

    mixins: [momentFormatDate],
    props: {
        /** REGISTRY, LIST */
        blockType: String,
        blockName: String
    },
    components: {
        FileInput
    },
    data() {
        return {
            form: {
                name: '',
                newFile: null
            },
            
            showTitle: true,

            uploadedFile: null,
            uploadedFilePath: null,

            responseMessage: '',
            loading: false
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getFile() {
            this.form.newFile = this.$refs['file'].files
        },

        async getList() {
            try {
                const result = await this.axios({
                    method: 'GET',
                    url: 'registry',
                    params: {
                        skip: 1,
                        limit: 10
                    }
                })

                result.data.data.forEach(item => {
                    if (item.type === this.blockType) {
                        this.uploadedFile = item
                        this.uploadedFilePath = process.env.VUE_APP_BASE_URL + item.file_path.replace(/\\/g, '/')
                    }
                })
            } catch(e) {
                console.error('Ошибка загрузки списка', e)
            }
        },
        uploadInit() {
            if (!this.uploadedFile) this.uploadFile()
            else this.editFile()
        },
        async uploadFile() {
            const formData = new FormData()
            formData.append('files', this.form.newFile[0])

            try {
                const fileResponse = await this.axios({
                    method: 'POST',
                    url: 'files',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }, this.loading = true)

                const documentResponse = await this.axios({
                    method: 'POST',
                    url: 'registry',
                    data: {
                        name: this.form.name,
                        type: this.blockType,
                        file_path: fileResponse.data.data[0].path,
                        file_id: fileResponse.data.data[0]._id
                    }
                })

                this.form.newFile = null
                this.$refs['file'].value = null
                this.responseMessage = documentResponse.data.message
                setTimeout(() => {this.responseMessage = ''}, 5000)
                
                this.getList()

                this.loading = false                
            } catch(e) {
                console.error('Ошибка загрузки файла', e)
                this.loading = false
            }
        },
        async editFile() {
            let formData = new FormData()
            
            formData.append('file', this.form.newFile[0])
            formData.append('old_file_id', this.uploadedFile.file_id)
            formData.append('old_file_path', this.uploadedFile.file_path)

            try {
                const fileEditResult = await this.axios({
                    method: 'PATCH',
                    url: 'files',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(fileEditResult)
                const {data} = await this.axios({
                    method: 'PATCH',
                    url: 'registry',
                    data: {
                        id: this.uploadedFile._id,
                        name: this.form.name,
                        type: this.blockType,
                        file_path: fileEditResult.data.data.path,
                        file_id: fileEditResult.data.data._id
                    }
                })
                
                this.form.newFile = null
                
                this.$store.dispatch('notifications/notification', data)
                setTimeout(() => {this.$store.dispatch('notifications/notificationClear')}, 5000)

                this.getList()

                this.loading = false
            } catch(e) {
                console.error('Ошибка обновления файла', e)
                this.loading = false
            }
        },

        showHideTitle() {
            if (!event.target.classList.contains('jg-input__icon')) this.showTitle = ! this.showTitle
        },
        openFile(url) {
            window.open(url, '_blank')
        }
    }
}
</script>