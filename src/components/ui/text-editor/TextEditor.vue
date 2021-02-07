<template>
    <section name="text-editor">
        <Editor 
            :api-key="editorKey"
            :init="{
                menubar: false,
                plugins: 'lists link image emoticons code',
                toolbar: 'styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | removeformat | link image | code',
                height: 480
            }"
            v-model="text"
        />
    </section>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'TextEditor',

    emits: ['update:text'],
    components: {
        Editor
    },
    props: ['importedData'],
    data() {
        return {
            editorKey: process.env.VUE_APP_TINYMCE_API_KEY,
            text: ''
        }
    },
    watch: {
        text: {
            handler(val) {
                this.$emit('update:text', val)
            }
        },
        importedData: {
            handler(val) {
                this.text = val
            }
        }
    }
}
</script>