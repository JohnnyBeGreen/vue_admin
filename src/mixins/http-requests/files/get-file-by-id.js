export default {
    methods: {
        async getFile(id) {
            try {
                const result = await this.axios({
                    method: 'GET',
                    url: 'files/' + id
                })
                
                return result.data.data
            } catch(e) {
                console.log(e)
            }
        },
    }
}