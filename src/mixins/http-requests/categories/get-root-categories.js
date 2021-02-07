export default {
    methods: {
        async getRootCategories() {
            try {
                const result = await this.axios({
                    method: 'GET',
                    url: 'cat/roots'
                })

                let rootCategories = []
                result.data.data.forEach(item => {
                    rootCategories.push({value: item._id, name: item.name})
                })
                
                return rootCategories
            } catch(e) {
                console.error(e)
            }
        }
    }
}