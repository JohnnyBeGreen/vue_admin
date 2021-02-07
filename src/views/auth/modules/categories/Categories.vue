<template>
    <jg-view-template :title="$t('views.auth.categories')">
        <template v-slot:content>
            <Cats />
        </template>
    </jg-view-template>
</template>

<script>
import Cats from '@/components/modules/categories/BaseCategories'

export default {
    name: 'CategoriesView',

    components: {
        Cats
    }
}
</script>