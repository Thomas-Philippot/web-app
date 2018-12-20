<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Welcome to my Showcase app</v-card-title>
        <v-card-text>
          <p>This applications is there to show what's thing can be done with vueJS, I used <a href="https://vuetifyjs.com/en/">Vuetify</a> FrontEnd Framework</p>
          <p>For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>.</p>
          <p>If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>.</p>
          <p>Feel free to check my social activities</p>
          <v-btn icon href="https://github.com/Thomas-Philippot/" target="_blank">
            <v-icon class="mx-3">fab fa-github</v-icon>
          </v-btn>
          <v-btn icon href="https://gitlab.com/Thomas_philippot" target="_blank">
            <v-icon class="mx-3">fab fa-gitlab</v-icon>
          </v-btn>
          <v-btn icon href="https://twitter.com/Thomas_ph35" target="_blank">
            <v-icon class="mx-3">fab fa-twitter</v-icon>
          </v-btn>
          <v-btn icon href="https://stackoverflow.com/users/7667135/thomas?tab=profile" target="_blank">
            <v-icon class="mx-3">fab fa-stack-overflow</v-icon>
          </v-btn>
          <div class="text-xs-right">
            <em class="mr-1"><small>Thomas Philippot</small></em>
            <v-avatar
                    :size="50"
            >
              <img src="https://avatars1.githubusercontent.com/u/36050256?s=400&u=12b0099235beb8827f59876708835c92a297034a&v=4" alt="avatar">
            </v-avatar>
          </div>
          <hr class="my-3">
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
