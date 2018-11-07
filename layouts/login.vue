<template>
    <v-flex>
        <vue-snotify></vue-snotify>
        <nuxt/>
    </v-flex>
</template>

<script>
  export default {
    name: 'Login',
    beforeMount () {
      if (localStorage.userName) {
        // this.$router.replace('/home')
      }
    }
  }
</script>
