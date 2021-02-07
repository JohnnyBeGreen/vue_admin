export default {
    methods: {
        async getSettings(id) {
            try {
                const result = await this.axios({
                    method: 'GET',
                    url: 'settings/module/' + id
                })

                return result
            } catch(e) {
                console.log(e)
            }
        }
    }
}