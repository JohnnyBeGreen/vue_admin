<template>
    <div 
        class="jg-input jg-input-text" 
        :class="{'jg-input-text_novalidation': !showValidation}"
        :style="disabled ? 'opacity: .5' : 'opacity: 1'"
    >
        <transition name="fade-quick" appear>
            <span v-if="showLabel" class="jg-input-label">{{inputLabel}}</span>
        </transition>
        
        <input 
            ref="Input"
            :type="type" 
            v-model="inputValue"
            :placeholder="inputPlaceholder" 
            @focus="makeLabelVisible()"
            @blur="hideLabel(), $emit('blur')"
            @input="$emit('input')"
            @keypress="$emit('keypress')"
            :disabled="disabled"
            :readonly="readonly"
        >
        
        <div v-if="icon" class="jg-input__icon" @click.stop="$emit('click')">
            <span v-if="loading" class="jg-loader jg-loader_style-1 spin-cw"></span>
            <span v-else :class="icon"></span>
        </div>

        <Validation v-if="showValidation" :valid="valid" :message="validationMessage"/>
    </div>
</template>

<script>
import Validation from '../validation/Validation'

export default {
    name: 'BaseTextInput',

    components: {
        Validation
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        importedData: [String, Number],
        placeholder: String,
        icon: {
            type: String,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        },
        autofocus: {
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
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:value', 'input', 'blur', 'click', 'keypress'],
    data() {
        return {
            inputValue: '',
            inputLabel: this.label,
            inputPlaceholder: this.placeholder ? this.placeholder : `${this.$t("forms.textInputPlaceholderPrefix")} ${this.label}`,
            showLabel: false
        }
    },
    mounted() {
        if (this.autofocus) this.$refs['Input'].focus()
    },
    methods: {
        makeLabelVisible() {
            this.showLabel = true
        },
        hideLabel() {
            if (event.target.value === '') this.showLabel = false
        }
    },
    watch: {
        inputValue: {
            handler(val) {
                if (val) this.showLabel = true
                this.$emit('update:value', this.inputValue)
            },
            immediate: true
        },
        importedData: {
            handler(val) {
                if (val) this.inputValue = val
            },
            immediate: true
        }
    }
}
</script>