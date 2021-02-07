<template>
    <section class="jg-date">
        <JG-TextInput 
            class="jg-date__item" 
            label="число" 
            placeholder="число"
            @update:value="inputValues.day = $event"
            :importedData="date.day"
            @keypress="preventNonDigits()"
        />
        <JG-TextInput 
            class="jg-date__item" 
            label="месяц" 
            placeholder="месяц"
            @update:value="inputValues.month = $event - 1"
            :importedData="date.month"
            @keypress="preventNonDigits()"
        />
        <JG-TextInput 
            class="jg-date__item" 
            label="год" 
            placeholder="год"
            @update:value="inputValues.year = $event"
            :importedData="date.year"
            @keypress="preventNonDigits()"
        />
    </section>
</template>

<script>
import moment from 'moment'
import preventNonDigits from '@/mixins/utils/prevent-non-digits'

export default {
    name: 'Date',

    mixins: [preventNonDigits],
    emits: ['update:result-date'],
    props: {
        importedData: [String, Object],
        valid: {
            type: Boolean,
            default: true
        },
        validationMessage: String,
        showValidation: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            date: {
                day: moment().format('D'),
                month: moment().format('M'),
                year: moment().format('Y')
            },
            inputValues: {
                day: '',
                month: '',
                year: ''
            },
            resultDate: null
        }
    },
    methods: {
        moment() {
            return moment()
        }
    },
    watch: {
        inputValues: {
            handler(val) {
                this.$emit('update:result-date', val)
            },
            deep: true,
            immediate: true
        },
        importedData: {
            handler(val) {
                if (val) {
                    this.date.day = moment(val).format('D')
                    this.date.month = moment(val).format('M')
                    this.date.year = moment(val).format('Y')
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>