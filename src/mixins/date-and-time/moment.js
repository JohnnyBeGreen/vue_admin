import moment from 'moment'

export default {
    methods: {
        momentFormatDate(date) {
            return moment(date).format('DD-MM-YYYY')
        },
        momentFormatDateAndTime(date) {
            return moment(date).format('DD MM YYY, H:mm')
        }
    }
}