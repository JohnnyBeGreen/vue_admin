<template>
    <section class="jg-sidemenu__block jg-container jg-container_style-1">
        <span class="jg-sidemenu__block__title">{{ title }}</span>
        <slot name="menu-item"></slot>
    </section>
</template>

<script>
export default {
    name: 'SidemenuBlock',

    props: {
        title: String
    }
}
</script>