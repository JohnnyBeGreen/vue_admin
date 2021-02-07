<template>
    <jg-view-template :title="$t('views.auth.documents')">
        <template v-slot:content>
            <JG-Tabs :links="links"/>
            <router-view></router-view>
        </template>
    </jg-view-template>
</template>

<script>
export default {
    name: 'DocumentsView',

    data() {
        return {
            links: [
                {link: `/admin/modules/documents/list`, name: this.$t("tabs.list")},
                {link: '/admin/modules/documents/settings', name: this.$t("tabs.settings")}
            ]
        }
    }
}
</script>