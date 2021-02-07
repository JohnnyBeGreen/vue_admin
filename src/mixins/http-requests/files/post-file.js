export default {
    methods: {
        async postFile(formData, method = 'POST', url = 'files') {
            try {
                const result = await this.axios({
                    method: method,
                    url: url,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                
                return result
            } catch(e) {
                console.error(e)
            }
        }
    }
}