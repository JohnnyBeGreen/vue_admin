<template>
    <section class="jg-registry">
        <RegistryBlock class="mbottom-l" blockType="REGISTRY" blockName="Реестр пострадавших участников строительства"/>
        <RegistryBlock blockType="LIST" blockName="Список получателей денежной компенсации"/>
    </section>
</template>

<script>
import RegistryBlock from './RegistryBlock'

export default {
    name: 'BaseRegistry',

    components: {
        RegistryBlock
    }
}
</script>