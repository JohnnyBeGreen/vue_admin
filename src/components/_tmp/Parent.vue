<template>
    <Child />
</template>

<script>
import Child from './Child'

export default {
    name: 'Parent',

    components: {
        Child
    }
}
</script>