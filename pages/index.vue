<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Nuxt showcase App</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="login" label="Login"
                                                  type="text" v-model="email"></v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password"
                                                  type="password" v-model="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary" @click="signup">Sign up</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn outline fab @click="googleSignIn" color="#4285F4"><v-icon>fab fa-google</v-icon></v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="signin">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import firebase from 'firebase'
  import { userRef } from '~/plugins/firebase'

  export default {
    layout: 'login',
    data: () => ({
      email: '',
      password: '',
      provider: null
    }),
    watch: {
      provider: function (newProvider) {
        firebase.auth().getRedirectResult().then(function (result) {
          localStorage.email = result.user.email
          localStorage.loggedIn = true
          localStorage.avatar = result.user.photoURL
          this.$router.push('/welcome')
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created () {
    },
    methods: {
      signin: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
          localStorage.email = this.email
          localStorage.loggedIn = true
          localStorage.avatar = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
          this.$router.push('/welcome')
        }).catch(e => {
          alert(e.message)
        })
      },
      googleSignIn () {
        this.provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(this.provider)
        this.$router.replace('/')
      },
      signup: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
          userRef.push({ name: 'name', email: this.email, avatar: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png' })
        }).catch(e => {
          alert(e.message)
        })
      }
    }
  }
</script>
