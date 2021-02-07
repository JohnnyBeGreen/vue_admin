export default {
    methods: {
        notification(data) {        
            let notification = []
            let isError = false

            if (data.error) {
                isError = true
                if (!Array.isArray(data.error)) {
                    notification.push(data.error.error_message)                
                }
                else {
                    data.error.forEach(error => {
                        notification.push(error.error_message)
                    })
                }
            } else {
                notification.push(data.message)                
            }

            const autohide = data.autohide

            return {
                code: data.code, 
                data: notification, 
                isError: isError, 
                autohide: autohide
            }
        }
    }
}