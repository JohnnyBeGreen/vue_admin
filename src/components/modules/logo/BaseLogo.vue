<template>
    <div class="jg-logo">
        <span class="jg-logo__text" v-html="text"></span>
    </div>
</template>

<script>
export default {
    name: 'BaseLogo',

    props: {
        text: String
    }
}
</script>