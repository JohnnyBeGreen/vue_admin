<template>
    <div class="jg-sidemenu__item">
        <div class="jg-sidemenu__bullet" :class="{'jg-sidemenu__bullet_active': $route.path === link}"></div>
        <router-link :to="link" tag="A" class="jg-sidemenu__name">{{ name }}</router-link>
    </div>
</template>

<script>
export default {
    name: 'SidemenuItem',

    props: {
        link: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        icon: String
    }
}
</script>