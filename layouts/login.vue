<template>
    <v-app>
        <vue-snotify></vue-snotify>
        <nuxt/>
    </v-app>
</template>

<script>
  export default {
    name: 'Login',
    middleware: 'login'
  }
</script>
