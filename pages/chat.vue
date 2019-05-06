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
                            :key="index"
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
                            @click="toggle(item)"
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

  export default {
    data: () => ({
      message: '',
      items: []
    }),
    created () {
      this.getMessages()
    },
    methods: {
      getMessages () {
        msgRef.on('value', (response) => {
          this.items = response.val()
        })
      },
      sendMessage () {
        msgRef.push({ message: this.message, like: false, avatar: localStorage.avatar })
        this.message = ''
      },
      toggle (item) {
        item.like = !item.like
        msgRef.set(this.items)
      }
    }
  }
</script>
