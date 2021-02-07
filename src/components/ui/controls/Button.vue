<template>
    <button class="jg-button" :disabled="disabled" :class="{'jg-button_disabled': disabled}" :title="title">
        <span 
            v-if="buttonIconComputed"
            class="jg-button__icon" 
            :class="[{'opacity-0': loading}, buttonIconComputed]"
        ></span>
        
        <span  
            class="jg-button__name"
            :class="{'opacity-0': loading}"
        >{{ name }}</span>
        
        <div v-if="loading" class="jg-loader jg-loader_style-1 spin-cw" :class="{'jg-loader_style-2': buttonIconComputed}"></div>
    </button>
</template>

<script>
export default {
    name: 'Button',

    props: {
        name: String,
        title: String,
        icon: String,
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            buttonIcon: ''
        }
    },
    computed: {
        buttonIconComputed() {
            return this.buttonIcon
        }
    },
    mounted() {
        if (this.icon) this.buttonIcon = this.icon
        else this.iconSetup()
    },
    methods: {
        iconSetup() {
            switch(this.name) {
                case this.$t('controls.save'):
                    this.buttonIcon = 'icon-floppy-disk'
                    break
                case this.$t('controls.edit'):
                    this.buttonIcon = 'icon-floppy-disk'
                    break
                case this.$t('controls.addSettings'):
                    this.buttonIcon = 'icon-cog'
                    break
            }            
        }
    }
}
</script>