<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-item clickable v-ripple to="/">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[0].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[0].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/SaveResult">
      <q-item-section avatar>
        <q-icon name="note_add" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[2].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[2].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/LeaderBoard">
      <q-item-section avatar>
        <q-icon name="leaderboard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[3].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[3].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="/">
      <q-item-section avatar>
        <q-icon name="info" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $store.state.NavigationListMenu[4].Name }}</q-item-label>
        <q-item-label caption>{{ $store.state.NavigationListMenu[4].Caption }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple to="SaveResult">
      <q-item-section avatar>
        <q-icon name="edit_calendar" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Запись</q-item-label>
        <q-item-label caption>Записаться можно тут</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <!--            Блок "Новости клуба". Дата новости -->
        <q-item-label v-for="NewsCard in NewsCards.slice(0,1)"
                      :key="NewsCard.id" caption>
          <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">{{ NewsCard.datenews }}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>

import { onMounted, ref } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'
// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))
// раздел "О сайте"
const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'NewsDrawer',
  setup () {
    const events = ref([])
    const NewsCards = ref([])
    onMounted(async () => {
      onSnapshot(newsCardCollectionQuery, (querySnapshot) => {
        const fbNewsCards = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            datenews: doc.data().datenews
          }
          fbNewsCards.push(NewsCard)
        })
        NewsCards.value = fbNewsCards
      })
      // раздел "О сайте"
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            dateupd: doc.data().dateupd
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
    })
    return {
      labelAboutSite: 'О сайте',
      NewsCards,
      events
    }
  },
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>
