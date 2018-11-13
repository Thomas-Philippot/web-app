<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-avatar
              size="150"
              color="grey lighten-4"
      >
        <img :src="account.avatar" alt="icon profile">
      </v-avatar>
      <h1>{{ account.name }}</h1>
      <p>{{ account.email }}</p>
      <v-btn
              color="primary"
              dark
              @click="dialog = true"
      >
        Edit
      </v-btn>
      <v-form v-model="valid" ref="form" lazy-validation>
      <v-dialog
              v-model="dialog"
              max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Update your account</v-card-title>

          <v-card-text>
              <v-text-field
                      v-model="account.name"
                      :rules="nameRules"
                      :counter="10"
                      label="Name"
                      required
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="blue darken-1"
                    flat="flat"
                    @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn color="primary" @click="editAccount" :disabled="!valid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      id: '',
      valid: true,
      account: {
        image: '',
        name: '',
        email: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),
    created () {
      this.getAccount()
    },
    methods: {
      getAccount () {
        axios.get('https://webapp-c8c7a.firebaseio.com/users.json?email=' + localStorage.email).then(response => {
          this.account = response.data[Object.keys(response.data)[0]]
          this.id = Object.getOwnPropertyNames(response.data)[0]
        }).catch(e => {
          console.log(e)
        })
      },
      editAccount () {
        if (this.$refs.form.validate()) {
          this.dialog = false
          axios.put('https://webapp-c8c7a.firebaseio.com/users/' + this.id + '/name.json', '"' + this.account.name + '"').then(response => {
            console.log('Account updated')
          }).catch(e => {
            console.log(e)
          })
          axios.put('https://webapp-c8c7a.firebaseio.com/users/' + this.id + '/email.json', '"' + this.account.email + '"').then(response => {
            console.log('Account updated')
          }).catch(e => {
            console.log(e)
          })
        }
      }
    }
  }
</script>
