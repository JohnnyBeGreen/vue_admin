export default {
    methods: {
        async getModule() {
            let name = null
            if (this.$route.meta.moduleName) name = this.$route.meta.moduleName
            else name = null
            
            if (name) {
                try {

                    const result = await this.axios({
                        method: 'GET',
                        url: 'modules/name/' + name
                    })
                    
                    if (result.data.code === 404) {
                        throw new Error('Module not found')
                    }

                    return result
                } catch(e) {
                    console.log(e)
                    return {error: {error_message: this.$t("modules.modules.errors.moduleNotFound")}}
                }
            } return false
        }
    }
}