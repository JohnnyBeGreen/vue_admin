export default {
    methods: {
        async fileDownload(file) {
            try {
                const result = await this.axios({
                    method: 'GET',
                    baseURL: process.env.VUE_APP_BASE_URL + file,
                    responseType: 'blob'
                })

                return result
            } catch(e) {
                console.log(e)
            }
        }
    }
}