export default {
    methods: {
        preventNonDigits() {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault()
            }
        }
    }
}