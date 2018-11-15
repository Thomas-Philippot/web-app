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
            <v-speed-dial
                    v-model="fab"
                    top
                    right
                    direction="bottom"
                    open-on-hover
                    transition="slide-y-transition"
            >
                <v-btn
                        slot="activator"
                        v-model="fab"
                        color="blue darken-2"
                        dark
                        fab
                >
                    <v-icon>account_circle</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn
                        fab
                        dark
                        small
                        color="green"
                        to="/account"
                >
                    <v-icon>fas fa-pen</v-icon>
                </v-btn>
                <v-btn
                        fab
                        dark
                        small
                        color="red"
                        @click="logout"
                >
                    <v-icon>fas fa-sign-out-alt</v-icon>
                </v-btn>
            </v-speed-dial>
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
    name: 'default',
    middleware: 'authenticated',
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        fab: false,
        email: '',
        items: [
          { icon: 'fas fa-home', title: 'Welcome', to: '/welcome' },
          { icon: 'fas fa-clipboard', title: 'Guide', to: '/guide' },
          { icon: 'fas fa-sun', title: 'Weather', to: '/weather' },
          { icon: 'fas fa-comments', title: 'Forum', to: '/forum' }
        ],
        right: true,
        rightDrawer: false,
        title: 'Nuxt showcase App'
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
    mounted () {
      if (localStorage.email) {
        this.email = localStorage.email
      }
    }
  }
</script>
