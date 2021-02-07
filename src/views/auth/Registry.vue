<template>
    <jg-view-template title="Реестр">
        <template v-slot:content>
            <BaseRegistry />
        </template>
    </jg-view-template>
</template>

<script>
import BaseRegistry from '@/components/modules/registry/BaseRegistry'

export default {
    name: 'RegistryView',

    components: {
        BaseRegistry
    }
}
</script>