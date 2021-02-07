export const isEmpty = {
    methods: {
        isEmpty(value) {
            let sanitizedValue = value

            if (typeof value === 'string') sanitizedValue = value.trim()

            if (sanitizedValue === '' || sanitizedValue === null) {
                return true
            } else if (typeof sanitizedValue === 'object') {
                return this.isEmptyObject(sanitizedValue)
            } else if (Array.isArray(sanitizedValue)) {
                return this.isEmptyArray(sanitizedValue)
            } else {
                return false
            }
        },
        isEmptyObject(value) {
            if (value === null || value === undefined) {
                return true
            } else if (typeof value === 'object') {
                if (value instanceof Date) {
                    return false
                }

                if (Object.keys(value).length === 0) {
                    return true
                }
                let allEmpty = true
                for (let key in value) {
                    if (!this.isEmpty(value[key])) {
                        allEmpty = false
                    }
                }
                return allEmpty
            } else {
                return false
            }
        },
        isEmptyArray(value) {
            if (value === null || !value.length) {
                return true
            } else {
                return false
            }
        }
    }
}

export const emailFormatCheck = {
    methods: {
        emailFormatCheck(email) {
            const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            return result
        }
    }
}

export const formValidationUtil = {
    methods: {
        formValidationUtil(item, status, message) {
            item.valid = status
            item.validationMessage = message       
        }
    }
}

export const validationResult = {
    methods: {
        validationResult(errors, fields) {
            if (errors && fields.size > 0) {
                // store.dispatch('notificationDefaultData', {message: fields, code: 777})
                return false
            } else {
                // store.dispatch('notificationDefaultDataClear')
                return true
            }
        }
    }
}