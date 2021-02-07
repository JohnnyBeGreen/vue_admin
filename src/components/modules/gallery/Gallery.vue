<template>
    <section class="jg-gallery">
        <file-input @update:files="files = $event" :loading="loading">
            <GalleryInput 
                :loaded-files="loadedFiles" 
                @update:file-id="filesToDelete.push($event)" 
                :deleted-file="deletedFileComputed"
            />
        </file-input>
    </section>
</template>

<script>
import FileInput from '@/components/ui/forms/file-input/FileInputTemplate'
import GalleryInput from '@/components/ui/forms/file-input/Gallery'

export default {
    name: 'GalleryModule',

    /** parent - id of a parent object */
    props: {
        parent: {
            type: String
        },
        typesToExclude: { //Do not show files with particular type
            type: Array,
            default: () => ([])
        }
    },
    components: {
        FileInput,
        GalleryInput
    },
    data() {
        return {
            files: [], //raw
            loadedFiles: [], //server response
            filesToDelete: [], //file _id
            deletedFile: null,
            loading: false
        }
    },
    computed: {
        deletedFileComputed() {return this.deletedFile},
        author() {return this.$store.getters['auth/ID']}
    },
    mounted() {
        if (this.$route.params.id) this.getFiles(this.$route.params.id)        
    },
    methods: {
        async uploadFile(id) {
            const formData = new FormData()
            formData.append('files', this.files[0])
            formData.append('refer', id)
            formData.append('author', this.author)

            try {
                this.loading = true

                const result = await this.axios({
                    method: 'POST',
                    url: 'files/image',
                    data: formData
                })
                
                this.loadedFiles.push(result.data.data[0])
                this.$store.dispatch('gallery/files_count_local', this.loadedFiles.length > 0 ? this.loadedFiles.length + 1 : 0)
            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async deleteFile() {
            try {
                this.loading = true

                const result = await this.axios({
                    method: 'DELETE',
                    url: 'files',
                    data: {
                        files: this.filesToDelete
                    }
                })
                
                this.deletedFile = result.data.data[0]._id
                this.$store.dispatch('gallery/files_count_local', this.loadedFiles['length'] > 1 ? this.loadedFiles.length + 1 : 0)
                this.loading = false
            } catch(e) {
                console.log(e)
                this.loading = false
            }
        },
        async getFiles(refer_id) {
            try {
                const {data} = await this.axios({
                    method: 'GET',
                    url: 'files/by-refer/' + refer_id
                })
                
                if (this.typesToExclude.length) {
                    data.data.forEach(item => {
                        this.typesToExclude.forEach(type => {
                            if (item.type !== type.toString()) this.loadedFiles.push(item)
                        })
                    })

                } else {
                    data.data.forEach(item => {
                        this.loadedFiles.push(item)
                    })

                }

            } catch(e) {
                console.log(e)
            }
        }
    },
    watch: {
        files: {
            handler(val) {
                if (val && val.length) this.uploadFile(this.parent)
            }
        },
        filesToDelete: {
            handler() {
                this.deleteFile()
            },
            deep: true
        }
    }
}
</script>