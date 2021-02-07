export default {
    methods: {
        async deleteFile(id) {
            try {
                const result = await this.axios({
                    method: 'DELETE',
                    url: 'files',
                    data: {
                        files: id
                    }
                })
                
                return result
            } catch(e) {
                console.log(e)
            }
        },
    }
}