<template>
    <jg-view-template nested>
        <template v-slot:content>
            <section class="jg-container_wm">
                <DocumentsSettings />
            </section>
        </template>
    </jg-view-template>
</template>

<script>
import DocumentsSettings from '@/components/modules/settings/BaseSettings'

export default {
    name: 'DocumentsSettingsView',

    components: {
        DocumentsSettings
    }
}
</script>