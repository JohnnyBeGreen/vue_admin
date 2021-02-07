export default {
    methods: {
        userRoleCheck(role) {
            let roleName = ''

            switch (role) {
                case '1':
                roleName = 'admin'
                break;
            }

            return roleName
        }
    }
}