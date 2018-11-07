<template>
    <v-app>
        <v-navigation-drawer
                :clipped="clipped"
                v-model="drawer"
                fixed
                app
        >
            <v-list>
                <v-list-tile
                        router
                        :to="item.to"
                        :key="i"
                        v-for="(item, i) in items"
                        exact
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn
                        slot="activator"
                        flat
                >
                    {{email}}
                </v-btn>
                <v-list>
                    <v-list-tile @click="logout">
                        <v-list-tile-title>logout</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-btn
                    icon
            >
                <v-icon>phone</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        email: '',
        items: [
          { icon: 'apps', title: 'Welcome', to: '/welcome' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    methods: {
      logout: function () {
        localStorage.clear()
        this.$router.push('/')
      }
    },
    watch: {
      name (newEmail) {
        localStorage.email = newEmail
      }
    },
    beforeMount () {
      if (!localStorage.email) {
        this.$router.push('/')
      }
    },
    mounted () {
      if (localStorage.email) {
        this.email = localStorage.email
      }
    }
  }
</script>
