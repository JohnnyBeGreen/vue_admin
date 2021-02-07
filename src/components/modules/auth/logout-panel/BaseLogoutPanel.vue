<template>
    <section class="jg-logout-panel">
        <div class="jg-logout-panel__icon" @click.stop="logout()">
            <span class="icon-logout"></span>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BaseLogoutPanel',

    methods: {
        logout() {
            localStorage.clear()
            window.location.assign('/')
        }
    }
}
</script>