<template>
    <section class="jg-right-header_auth">
        <AuthPanel class="jg-right-header_auth__item"/>
        <LogoutPanel />
    </section>
</template>

<script>
import AuthPanel from '@/components/modules/auth/auth-panel/BaseAuthPanel'
import LogoutPanel from '@/components/modules/auth/logout-panel/BaseLogoutPanel'

export default {
    name: 'BaseRightHeaderAuth',

    components: {
        AuthPanel,
        LogoutPanel
    }
}
</script>