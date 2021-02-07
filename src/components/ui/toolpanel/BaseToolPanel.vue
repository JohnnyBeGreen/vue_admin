<template>
    <section class="jg-toolpanel">
        <div class="jg-toolpanel__container">
            <section class="jg-toolpanel__container_left">
                <slot name="left"></slot>
            </section>

            <section class="jg-toolpanel__container_right">
                <slot name="right"></slot>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BaseToolPanel'
}
</script>