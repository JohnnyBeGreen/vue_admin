<template>
    <section class="jg-input-file">
        <div v-if="label" class="jg-input-file__label">
            <span>{{label}}</span>
        </div>
        
        <!-- Preview one image -->
        <div v-if="withPreview && !multiple" class="jg-input-file__preview">
            <img 
                class="jg-input-file__preview__item"
                v-for="(item, index) in filesUrls" 
                :key="index" 
                :src="item"
            >
        </div>

        <!-- Preview gallery of images -->
        <div v-if="withPreview && multiple && filesUrls.length  " class="jg-input-file__gallery">
            <div 
                v-for="(item, index) in filesUrls" 
                :key="index" 
                class="jg-input-file__gallery__item"
                :style="{ backgroundImage: 'url(' + item + ')' }"
            >
                <div>
                    <span @click.stop="filesUrls.splice(index, 1)" class="icon-cross1"></span>
                </div>
                <div>
                    <span>{{ file[index].name }}&nbsp;</span>
                    <span>{{ (file[index].size/1000).toFixed(2) }}Kb</span>
                </div>
            </div>        
        </div>

        <div v-if="withPreview && !multiple" class="jg-input-file__files">
            <div v-if="file" class="jg-input-file__file">
                <span>{{ file[0].name }}</span>
                <span>{{ (file[0].size/1000).toFixed(2) }}Kb</span>
                <JG-Button 
                    class="jg-icon jg-icon_s jg-icon_style-1 jg-icon_monohrome jg-icon_clickable" 
                    icon="icon-cross"
                    @click="deleteFile()"
                />
            </div>
        </div>
        <div class="jg-input-file__input">
            <input type="file" :id="id" :multiple="multiple" @change="selectFile()">
            <label v-if="!multiple" :for="id"><span class="icon-folder-open"></span>&nbsp;{{ $t("forms.fileLabel") }}</label>
            <label v-else :for="id"><span class="icon-folder-open"></span>&nbsp;{{ $t("forms.filesLabel") }}</label>
        </div>
    </section>
</template>

<script>
export default {
    name: 'InputFile',

    props: {
        incoming: {
            type: Object,
            default: () => ({})
        },
        label: String,
        withPreview: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:file'],
    data() {
        return {
            id: new Date().getTime(),
            file: null,
            filesUrls: []
        }
    },
    methods: {
        selectFile() {
            this.file = event.target.files
        },
        deleteFile() {
            this.file = null
            this.filesUrls = []
        },
        
        generateFilesUrls(files) {
            this.filesUrls = []
            let item = []
            let imgsrc
            
            if (files.length) item = files
            else item.push(files)

            item.forEach(file => {
                imgsrc = URL.createObjectURL(file)
                this.filesUrls.push(imgsrc)
            })
        }        
    },
    watch: {
        file: {
            handler(val) {
                this.$emit('update:file', val)
                
                if (val) this.generateFilesUrls(val)
            },
            deep: true
        },
        incoming: {
            handler(val) {
                if (val && val.length) this.file = val
            },
            deep: true,
            immediate: true
        }
    }
}
</script>   