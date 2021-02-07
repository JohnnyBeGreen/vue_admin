<template>
    <div 
        class="jg-input-file__preview" 
        v-for="(item, index) in urlsComputed" 
        :key="index"
    >
        <img class="jg-input-file__preview__item" :src="item">
        <div class="jg-input-file__preview__delete"><span @click.stop="deleteFile()" class="icon-cross1"></span></div>
        <div v-if="filesComputed" class="jg-input-file__preview__name">
            <span>{{ filesComputed[index].name }}&nbsp;</span>
            <span>{{ (filesComputed[index].size/1000).toFixed(2) }}Kb</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Image',

    props: ['loadedFiles'],
    emits: ['update:files'],
    data() {
        return {
            files: null,
            urls: []
        }
    },
    computed: {
        urlsComputed() {return this.urls},
        filesComputed() {return this.files}
    },
    methods: {
        generateUrls(files) {
            this.urls = []
            let imgsrc

            files.forEach(file => {
                imgsrc = URL.createObjectURL(file)
                this.urls.push(imgsrc)
            })
        },
        deleteFile() {
            this.urls = []
            this.files = null
            this.$emit('update:files', this.files)
        }
    },
    watch: {
        loadedFiles: {
            handler(val) {                
                if (val) {
                    this.files = val
                    this.generateUrls(val)
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>