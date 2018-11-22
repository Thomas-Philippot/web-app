<template>
    <v-container fluid fill-height>
    <v-card
            class="mx-auto"
            max-width="500"
    >
        <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
                    color="primary lighten-2"
                    class="subheading white--text"
                    size="24"
                    v-text="step"
            ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
            <v-window-item :value="1">
                <v-form v-model="valid" ref="form">
                <v-card-text>
                    <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                    ></v-text-field>
                    <span class="caption grey--text text--darken-1">
            This is the email you will use to login to your account
          </span>
                </v-card-text>
                </v-form>
            </v-window-item>

            <v-window-item :value="2">
                <v-card-text>
                    <v-text-field
                            label="Password"
                            type="password"
                            required
                            :rules="passwordRules"
                            v-model="password"
                    ></v-text-field>
                    <v-text-field
                            label="Confirm Password"
                            type="password"
                            v-model="confirmation"
                            :error="error"
                    ></v-text-field>
                    <span class="caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
                </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
                <div class="pa-3 text-xs-center">
                    <v-img
                            class="mb-3"
                            contain
                            height="128"
                            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                    ></v-img>
                    <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
                    <span class="caption grey--text">Thanks for signing up!</span>
                </div>
            </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn
                    v-if="step === 1"
                    flat
                    to="/"
            >
                Back
            </v-btn>
            <v-btn
                    v-else
                    flat
                    @click="step--"
            >
                Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    :disabled="!valid"
                    color="primary"
                    depressed
                    @click="step++"
            >
                Next
            </v-btn>
        </v-card-actions>
    </v-card>
    </v-container>
</template>

<script>
  import firebase from 'firebase'
  import { userRef } from '~/plugins/firebase'
  export default {
    name: 'signUp',
    layout: 'login',
    data: () => ({
      step: 1,
      email: '',
      password: '',
      confirmation: '',
      valid: false,
      error: true,
      loggedIn: false,
      samePasswords: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must contains at least 6 characters'
      ],
      passwordRules2: [
        v => !!v || 'Password verification is required',
        v => v.length >= 6 || 'Password must contains at least 4 characters'
      ]
    }),
    methods: {
      signup: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
          userRef.push({ name: 'name', email: this.email, avatar: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png' })
          this.$router.push('/')
          this.$snotify.success('Account created !')
        }).catch(e => {
          this.$snotify.error(e.message)
        })
      }
    },
    mounted () {
      if (localStorage.loggedIn) {
        this.loggedIn = true
      }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Create a password'
          default: return 'Account created'
        }
      }
    },
    watch: {
      confirmation (newConfirmation) {
        this.error = newConfirmation !== this.password
      },
      step (newStep) {
        if (newStep > 3) {
          if (this.$refs.form.validate()) {
            this.signup()
          }
        }
      },
      loggedIn (newLoggedIn) {
        console.log(newLoggedIn)
      }
    }
  }
</script>

<style scoped>

</style>
