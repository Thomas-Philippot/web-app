<template>
    <v-app>
        <v-select
                :items="items"
                label="Standard"
                v-model="category"
        ></v-select>
        <v-btn @click="getArticles">Search</v-btn>
        <v-layout
                row
                wrap
                align-center
                class="container">
            <v-flex
                    v-for="(article, id) in articles"
                    :key="id"
                    md6
                    lg4
                    sm12
                    mb-3>
                <v-hover>
                    <v-card
                            slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            class="mx-auto"
                            width="344"
                    >
                        <v-img
                                v-if="article.urlToImage !== null"
                                :aspect-ratio="16/9"
                                :src=article.urlToImage
                        ></v-img>
                        <v-card-title>
                            <div>
                                <span class="headline">{{ article.title }}</span>
                                <div class="d-flex">
                                    <div class="ml-2 grey--text text--darken-2">
                                        <span class="subheading">{{ article.description }}</span>
                                    </div>
                                </div>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-hover>
            </v-flex>
        </v-layout>
        <v-layout>
            <a href="https://newsapi.org/" target="_blank">Powered by News API</a>
        </v-layout>
    </v-app>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'news',
    data: () => {
      return {
        articles: [],
        items: ['VueJs', 'développeur freelance', 'Java', 'npm', 'Bitcoin'],
        category: 'VueJs'
      }
    },
    created () {
      this.getArticles()
    },
    methods: {
      getArticles () {
        axios.get('https://newsapi.org/v2/everything?q=' + this.category + '&language=fr&from=2018-11-18&sortBy=publishedAt&apiKey=8736d01c3e3a4595a6a674ec46264943').then(response => {
          console.log(response.data.articles)
          this.articles = response.data.articles
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>

</style>