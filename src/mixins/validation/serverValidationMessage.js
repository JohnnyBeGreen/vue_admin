//Вывод ответа сервера - message
export default {
    methods: {
        serverValidationMessage(response, ignore, modal) {
            let message = []
            let messageType = ''
            if (response.data.errors) {
                messageType = 'error'
                for (let key in response.data.errors) {
                    if (response.data.errors[key] !== response.data.errors[ignore]) {
                        response.data.errors[key].forEach(item => {
                            message.push(item)            
                        })
                    }
                }
            } else {
                message.push(response.data.message)
            }                    

            if (modal) {
                if (messageType === 'error') {
                    this.$store.dispatch('modalNotificationMessageOpen', {arr: message, data: {title: 'Ошибка', type: messageType}})
                } else {
                    this.$store.dispatch('modalNotificationMessageOpen', {arr: message})
                }
            }
            return {message: message, code: response.data.code}
        }
    }
}