<template>
    <v-app id="inspire">
        <v-container fluid grid-list-md>
            <ul>
                <li v-for="message of messages">
                    {{message}}
                </li>
            </ul>
            <v-card>
            <v-list two-line>
                <template v-for="(item, index) in items">
                    <v-subheader
                            v-if="item.header"
                            :key="item.header"
                    >
                        {{ message.header }}
                    </v-subheader>

                    <v-divider
                            v-else-if="item.divider"
                            :inset="item.inset"
                            :key="index"
                    ></v-divider>

                    <v-list-tile
                            v-else
                            :key="item.message"
                            avatar
                            @click="toggle(item, index)"
                    >
                        <v-list-tile-avatar>
                            <img :src="item.avatar">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.message"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon
                                    v-if="!item.like"
                                    color="grey lighten-1"
                            >
                                fas fa-heart
                            </v-icon>

                            <v-icon
                                    v-else
                                    color="red darken-2"
                            >
                                fas fa-heart
                            </v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider
                            v-if="index + 1 < items.length"
                            :key="index"
                    ></v-divider>
                </template>
                <v-container>
                <v-layout row wrap>
                <v-textarea
                        name="input-7-1"
                        label="Enter you message"
                        value=""
                        v-model="message"
                ></v-textarea>
                    <v-btn color="primary" @click="sendMessage">Send</v-btn>
                </v-layout>
                </v-container>
            </v-list>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
  import { msgRef } from '~/plugins/firebase'
  import axios from 'axios'

  export default {
    data: () => ({
      message: '',
      selected: [0],
      items: []
    }),
    created () {
      this.getMessages()
    },
    methods: {
      getMessages () {
        axios.get('https://webapp-c8c7a.firebaseio.com/messages.json').then(response => {
          this.items = response.data
        })
      },
      sendMessage () {
        msgRef.push({ message: this.message, like: false, avatar: localStorage.avatar })
        this.getMessages()
        this.message = ''
      },
      toggle (item, index) {
        item.like = !item.like
        axios.put('https://webapp-c8c7a.firebaseio.com/messages/' + index + '/like.json', item.like).then(response => {
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>
