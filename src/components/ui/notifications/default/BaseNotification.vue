<template>
    <transition name="fade">
        <section
            v-if="notificationComputed" 
            class="jg-notification-default jg-notification-default_ok mbottom-m" 
            :class="{'jg-notification-default_error': notificationComputed.isError}"
        >
            <span v-if="notificationComputed.isError" class="jg-notification-default__title">Error</span>
            
            <span 
                v-for="(item, index) in notificationComputed.data" 
                :key="index" 
                class="jg-notification-default__item"
            >
                <span v-if="index > 0">{{index+1}}.&nbsp;</span>{{item}}
            </span>

            <span @click="notification = null" class="icon-cross jg-notification-default__close"></span>
        </section>
    </transition>
</template>

<script>
export default {
    name: 'BaseNotification',
    
    props: {
        notificationData: {
            type: Object
        }
    },
    data() {
        return {
            notification: null
        }
    },
    computed: {
        notificationComputed() {
            return this.notification
        }
    },
    methods: {
        formatProp(prop) {
            let notificationFormated = []
            let isError = false

            if (prop.response.error) {
                isError = true
                if (!Array.isArray(prop.response.error)) {
                    notificationFormated.push(prop.response.error.error_message)                
                }
                else {
                    prop.response.error.forEach(error => {
                        notificationFormated.push(error.error_message)
                    })
                }
            } else {
                notificationFormated.push(prop.response.message)                
            }

            this.notification = { 
                data: notificationFormated, 
                isError: isError
            }
        }
    },
    watch: {
        notificationData: {
            handler(val) {
                if (val) this.formatProp(val)
                if (!val.manualyClose) setTimeout(() => {this.notification = null}, 10000)
            },
            deep: true
        }
    }
}
</script>