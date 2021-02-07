<template>
        <div class="jg-validation">
            <div class="jg-validation__mark" :class="{'jg-validation__mark_active': !valid}"></div>
            <transition name="fade" appear>
                <div v-if="!valid" class="jg-validation__text"><span>{{ message }}</span></div>
            </transition>
        </div>
</template>

<script>
export default {
    name: 'Validation',

    props: {
        valid: {
            type: Boolean,
            default: true
        },
        message: {
            type: String
        }
    }
}
</script>