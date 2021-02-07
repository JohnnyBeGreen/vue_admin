<template>
    <section class="jg-auth-panel">
        <div class="jg-auth-panel__avatar"><span class="icon-user-2"></span></div>
        <div class="jg-auth-panel__info">
            <span class="jg-auth-panel__email">{{ $store.getters['auth/EMAIL'] }}</span>
            <span class="jg-auth-panel__role">{{ userRoleCheck($store.getters['auth/ROLE']) }}</span>
        </div>
    </section>
</template>

<script>
import userRoleCheck from '@/mixins/auth/role-check'

export default {
    name: 'BaseAuthPanel',

    mixins: [userRoleCheck]
}
</script>