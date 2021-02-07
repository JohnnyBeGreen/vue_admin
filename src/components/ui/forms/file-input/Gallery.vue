<template>
    <div class="jg-input-file__gallery">
        <div 
            v-for="(item, index) in filesComputed" 
            :key="index" 
            class="jg-input-file__gallery__item"
            :style="{ backgroundImage: 'url(' + BASE_URL + item.path.replace(/\\/g, '/') }"
        >
            <div @click.stop="exportFileId(item._id)" class="jg-input-file__gallery__item__delete"><span class="icon-cross1"></span></div>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'Gallery',

    props: ['loadedFiles', 'deletedFile'],
    emits: ['update:file-id'],
    data() {
        return {
            files: this.loadedFiles,
            BASE_URL: process.env.VUE_APP_BASE_URL
        }
    },
    computed: {
        filesComputed() {return this.loadedFiles}
    },
    methods: {
        deleteFile(deletedFile) {
            //deletedFile = file _id
            this.files.forEach((file, index) => {
                if (file._id === deletedFile) this.files.splice(index, 1)
            })
        },
        exportFileId(id) {
            this.$emit('update:file-id', id)
        }
    },
    watch: {
        deletedFile: {
            handler(val) {
                this.deleteFile(val)
            }
        }
    }
}
</script>