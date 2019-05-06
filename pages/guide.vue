<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Nuxt showcase guide</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <p>Here are all the things this app is able to do</p>
          <v-list two-line subheader>
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    avatar
            >
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]" color="white">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { icon: 'fas fa-sun', iconClass: 'error', title: 'Wheather', subtitle: 'Display the weather by searching a city' },
          { icon: 'fas fa-comments', iconClass: 'warning', title: 'Chat', subtitle: 'Real time chat with firebase' }
        ]
      }
    }
  }
</script>
