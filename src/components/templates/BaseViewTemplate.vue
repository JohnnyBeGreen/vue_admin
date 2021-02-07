<template>
    <section class="jg-view-template" :class="{'jg-view-template_nested': nested}" :style="'max-width:' + maxWidth + 'px'">
        <div v-if="breadcrumbs" class="jg-view-template__breadcrumbs">
            <Breadcrumbs />
        </div>

        <div v-if="title" class="jg-view-template__title"><span>{{ title }}</span></div>

        <section>
            <slot name="above-content"></slot>
        </section>

        <section class="jg-view-template__content">
            <div v-if="loading" class="jg-loader jg-loader_style-3 spin-cw relative mauto"></div>
            <slot v-if="!loading" name="content"></slot>
        </section>
    </section>
</template>

<script>
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs'

export default {
    name: 'BaseViewTemplate',

    components: {
        Breadcrumbs
    },
    props: {
        title: String,
        maxWidth: {
            type: Number
        },
        nested: {
            type: Boolean,
            default: false
        },
        breadcrumbs: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>