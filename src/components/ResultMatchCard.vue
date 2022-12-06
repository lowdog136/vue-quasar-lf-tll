<template>
  <div>
    <NewsCard />
    <ResultMatchCardArchiveGameO />
    <ResultMatchCardArchiveGameF />
  </div>
</template>

<script>
import axios from 'axios'
import ResultMatchCardArchiveGameF from 'components/ResultMatchCardArchiveGameF'
import ResultMatchCardArchiveGameO from 'components/ResultMatchCardArchiveGameO'
import NewsCard from 'components/NewsCard/NewsCard'
const baseURL = 'https://severfans.ru'

export default {
  name: 'ResultMatchCard',
  components: { NewsCard, ResultMatchCardArchiveGameF, ResultMatchCardArchiveGameO },
  data () {
    return {}
  },
  async created () {
    try {
      const res = await axios.get(`${baseURL}/resultGames`)
      this.resultGames = res.data
    } catch (error) {
      console.log(error)
    }
  },
  setup () {
    return {}
  }
}
</script>
