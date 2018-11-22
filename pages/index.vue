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
                                <v-form v-model="valid" ref="form">
                                    <v-text-field prepend-icon="person"
                                                  name="login"
                                                  label="Login"
                                                  type="text"
                                                  v-model="email"
                                                  :rules="emailRules"
                                    ></v-text-field>
                                    <v-text-field id="password"
                                                  prepend-icon="lock"
                                                  name="password"
                                                  label="Password"
                                                  type="password"
                                                  v-model="password"
                                                  :append-icon="viewPassword ? 'fa-eye' : 'fa-eye-slash'"
                                                  @click:append="() => (viewPassword = !viewPassword)"
                                                  :type="viewPassword ? 'text' : 'password'"
                                                  :rules="passwordRules"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary" to="/signup">Sign up</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn outline fab @click="googleSignIn" color="#4285F4"><v-icon>fab fa-google</v-icon></v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="signin" type="submit" :disabled="!valid">Login</v-btn>
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
  export default {
    layout: 'login',
    data: () => ({
      email: '',
      password: '',
      provider: null,
      viewPassword: false,
      valid: false,
      logged: false,
      loggedIn: '',
      passwordRules: [
        v => !!v || 'The password is required',
        v => v.length >= 6 || 'Password must contains at least 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),
    methods: {
      signin: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          localStorage.email = this.email
          localStorage.loggedIn = true
          localStorage.avatar = 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
          this.$router.push('/welcome')
        }).catch(e => {
          this.$snotify.error(e.message)
        })
      },
      googleSignIn () {
        this.provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(this.provider).then(result => {
          localStorage.avatar = result.user.photoURL
          localStorage.email = result.user.email
          localStorage.loggedIn = true
          this.$router.push('/welcome')
        }).catch(e => {
          this.$snotify.error(e.message)
          console.log(e)
        })
      }
    }
  }
</script>
