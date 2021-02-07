<template>
    <div class="jg-input" :class="{'jg-input-select_novalidation': !showValidation}">
        <transition name="fade-quick" appear>
            <span v-if="labelActive && showLabel && selectValue !== ''" class="jg-input-label">{{inputLabel}}</span>
        </transition>
        
        <div ref="Select" class="jg-input-select">
            <select 
                v-model="selectValue"
                @focus="makeLabelVisible()"
                @blur="hideLabel(), $emit('blur')"
            >
                <option disabled value="">{{label}}</option>
                <option 
                    v-for="(item, index) in options" 
                    :key="index" 
                    :value="item.name"
                >{{item.name}}</option>
            </select>
            <div class="jg-input-select__arrow">
                <span v-if="loading" class="jg-loader jg-loader_style-2 spin-cw"></span>
                <span v-else class="icon-chevron-down"></span>
            </div>
        </div>

        <Validation v-if="showValidation && !isFilter" :valid="valid" :message="validationMessage"/>
    </div>
</template>

<script>
import Validation from '../validation/Validation'

export default {
    name: 'SelectInput',

    components: {
        Validation
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        labelActive: {
            type: Boolean,
            default: true
        },
        importedData: [String, Number, Object, Array],
        options: {
            type: Array,
            required: true
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
        isFilter: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:value', 'blur', 'click'],
    data() {
        return {
            selectValue: '',
            inputLabel: this.label,
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
        selectValue: {
            handler(val) {
                if (val) this.showLabel = true
                
                let valueObject = null
                this.options.forEach(item => {
                    if (item.name === this.selectValue) valueObject = item
                })
                
                if (valueObject) this.$emit('update:value', valueObject)
            },
            immediate: true
        },
        importedData: {
            handler(val) {
                if (val.name) this.selectValue = val.name
            },
            immediate: true
        }
    }
}
</script>