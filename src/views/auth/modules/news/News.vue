<template>
    <jg-view-template :title="$t('views.auth.news')">
        <template v-slot:content>
            <JG-Tabs :links="links"/>
            <router-view></router-view>
        </template>
    </jg-view-template>
</template>

<script>
export default {
    name: 'NewsView',

    data() {
        return {
            links: [
                {link: `/admin/modules/news/list`, name: this.$t("tabs.list")},
                {link: '/admin/modules/news/settings', name: this.$t("tabs.settings")}
            ]
        }
    }
}
</script>