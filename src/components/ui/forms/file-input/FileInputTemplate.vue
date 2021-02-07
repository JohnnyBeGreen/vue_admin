<template>
    <section class="jg-input-file">
        <div v-if="label" class="jg-input-file__label">
            <span>{{label}}</span>
        </div>
        
        <slot></slot>
        
        <div class="jg-input-file__input">
            <section>
                <input type="file" :id="id" :multiple="multiple" @change="selectFile()">

                <label v-if="mode === 'one'" :for="id">
                    <span class="icon-folder-open"></span>&nbsp;{{ $t("forms.fileLabel") }}
                </label>

                <label v-if="mode === 'many'" :for="id">
                    <span class="icon-folder-open"></span>&nbsp;{{ $t("forms.filesLabel") }}
                </label>
            </section>

            <div v-if="loading" class="jg-loader jg-loader_style-1 spin-cw jg-input-file__gallery__item__loader"></div>
        </div>

        <Validation v-if="showValidation" :valid="valid" :message="validationMessage" class="jg-validation_transparent mtop-m"/>
    </section>
</template>

<script>
import Validation from '../validation/Validation'

export default {
    name: 'InputFile',

    props: {
        mode: {
            type: String,
            default: 'one' //many
        },
        multiple: {
            type: Boolean,
            default: false
        },
        label: String,
        loading: {
            type: Boolean,
            default: false
        },
        showValidation: {
            type: Boolean,
            default: true
        },
        valid: {
            type: Boolean,
            default: true
        },
        validationMessage: {
            type: String
        }
    },
    components: {
        Validation
    },
    emits: ['update:files'],
    data() {
        return {
            id: new Date().getTime()
        }
    },
    methods: {
        selectFile() {
            this.$emit('update:files', Array.from(event.target.files))
        }
    }
    
}
</script>   