<template>
    <div class="jg-input-file__files">
        <div v-if="filesComputed" class="jg-input-file__file">
            <div class="jg-input-file__container jg-input-file__icon">
                <span class="icon-file-empty"></span>
            </div>
            
            <div v-if="filesComputed[0].original_name" class="jg-input-file__container jg-input-file__name">
                <span>{{ filesComputed[0].original_name }}</span>
            </div>

            <div v-else class="jg-input-file__container jg-input-file__name">
                <span>{{ filesComputed[0].name }}</span>
            </div>

            <div v-if="filesComputed[0].size" class="jg-input-file__container jg-input-file__size">
                <span>{{ (filesComputed[0].size/1000).toFixed(2) }}Kb</span>
            </div>
            
            <div class="jg-input-file__container">
                <JG-Button 
                    v-if="!isEdit"
                    class="jg-icon jg-icon_s jg-icon_style-1 jg-icon_monohrome jg-icon_clickable" 
                    icon="icon-bin"
                    @click="deleteFile()"
                />
                <JG-Button
                    v-else
                    class="jg-icon jg-icon_s jg-icon_style-1 jg-icon_monohrome jg-icon_clickable" 
                    icon="icon-arrow-right"
                    @click="openFile()"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AnyFileInput',

    props: {
        loadedFiles: {
            type: [Object, Array]
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:files'],
    data() {
        return {
            files: null
        }
    },
    computed: {
        filesComputed() {return this.files}
    },
    methods: {
        deleteFile() {
            this.files = null
            this.$emit('update:files', this.files)
        },
        openFile() {
            window.open(process.env.VUE_APP_BASE_URL + this.files[0].path, 'blank')
        }
    },
    watch: {
        loadedFiles: {
            handler(val) {
                if (Array.isArray(val)) {
                    this.files = val
                } else {
                    this.files = []
                    this.files.push(val)
                }
            }
        }
    }
}
</script>