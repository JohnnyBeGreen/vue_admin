<template>
    <section class="jg-container jg-container_style-1 jg-login__container">
        <JG-TextInput 
            label="email" 
            class="jg-login__item" 
            @update:value="form.email.value = $event" 
            :valid="form.email.valid"
            :validationMessage="form.email.validationMessage"
            @input="validationEmail()"
        />
        
        <JG-TextInput 
            type="password" 
            label="пароль" 
            :valid="form.password.valid"
            :validationMessage="form.password.validationMessage"
            @update:value="form.password.value = $event" 
            class="jg-login__item" 
        />
        
        <JG-Notification :notification-data="notificationComputed"/>

        <JG-Button 
            name="войти" 
            class="jg-button_default jg-button_hl jg-button_fullwidth jg-button_style-1 jg-button_accent" 
            :loading="loading" 
            @click="login()"
        />
    </section>
</template>

<script>
import {isEmpty, emailFormatCheck, formValidationUtil, validationResult} from '@/mixins/validation/validation'

export default {
    name: 'BaseLogin',

    mixins: [isEmpty, emailFormatCheck, formValidationUtil, validationResult],
    data() {
        return {
            form: {
                email: {
                    label: 'Email',
                    value: '',
                    valid: true,
                    validationMessage: ''
                },
                password: {
                    label: 'Пароль',
                    value: '',
                    valid: true,
                    validationMessage: ''
                }
            },
            
            loading: false,
            notification: null,

            //Validation
            validationErrors: 0,
            validationFields: new Set()
        } 
    },
    computed: {
        notificationComputed() {
            return this.notification
        }
    },
    methods: {
        validationEmail() {
            if (this.isEmpty(this.form.email.value)) {
                this.formValidationUtil(this.form.email, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.form.email.label)
            } else {
                this.formValidationUtil(this.form.email, true)

                if (!this.emailFormatCheck(this.form.email.value)) {
                    this.formValidationUtil(this.form.email, false, this.$t("validation.emailFormat"))
                    this.validationErrors++
                    this.validationFields.add(this.form.email.label)
                } else {
                    this.formValidationUtil(this.form.email, true)
                }
            }
        },
        validationPassword() {
            if (this.isEmpty(this.form.password.value)) {
                this.formValidationUtil(this.form.password, false, this.$t("validation.requiredField"))
                this.validationErrors++
                this.validationFields.add(this.form.password.label)
            } else {
                this.formValidationUtil(this.form.password, true)
            }
        },
        validation() {
            this.validationErrors = 0
            this.validationFields.clear()

            this.validationEmail()
            this.validationPassword()

            //Validation result
            return this.validationResult(this.validationErrors, this.validationFields)
        },

        async login() {
            if (this.validation()) {
                try {
                    const response = await this.axios({
                        method: 'POST',
                        url: 'user/login',
                        data: {
                            email: this.form.email.value,
                            password: this.form.password.value
                        }
                    }, this.loading = true)
                    
                    if (!response.data.error) {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('refresh_token', response.data.data.refreshToken)
                        localStorage.setItem('id', response.data.data.id)
                        localStorage.setItem('email', response.data.data.email)
                        localStorage.setItem('role', response.data.data.role)
                        localStorage.setItem('status', response.data.data.status)

                        window.location.assign('/admin')

                        this.notification = {response: response.data}
                    } else {
                        this.notification = {response: response.data, manualyClose: true}
                    }


                    this.loading = false
                } catch(e) {
                    this.notification = {
                        response: {
                            error: {error_message: this.$t("modules.auth.login.errors.authError")}
                        },
                        manualyClose: true
                    }
                    console.error(e)
                    this.loading = false
                }
            }
        }
    }
}
</script>