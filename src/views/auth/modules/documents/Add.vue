<template>
    <jg-view-template nested breadcrumbs>
        <template v-slot:content>
            <Form />
        </template>
    </jg-view-template>
</template>

<script>
import Form from '@/components/modules/documents/form/Form'

export default {
    name: 'AddDocumentView',

    components: {
        Form
    }
}
</script>