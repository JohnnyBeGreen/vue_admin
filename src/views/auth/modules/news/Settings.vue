<template>
    <jg-view-template nested>
        <template v-slot:content>
            <section class="jg-container_wm">
                <NewsSettings />
            </section>
        </template>
    </jg-view-template>
</template>

<script>
import NewsSettings from '@/components/modules/settings/BaseSettings'

export default {
    name: 'NewsSettingsView',

    components: {
        NewsSettings
    }
}
</script>