<template>
    <section class="jg-view jg-view-login">
        <transition name="fade" appear>
            <Login class="ab-center"/>
        </transition>
    </section>
</template>

<script>
import Login from '@/components/modules/auth/login/BaseLogin'

export default {
    name: 'LoginView',

    components: {
        Login
    }
}
</script>