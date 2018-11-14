<template>
    <v-flex>
        <!-- <vue-snotify></vue-snotify> -->
        <nuxt/>
    </v-flex>
</template>

<script>
  export default {
    name: 'Login',
    middleware: 'login'
  }
</script>
