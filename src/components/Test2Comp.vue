<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md" style="max-width: 650px">
<!--    addEvent-->
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newEventVer'
            hint="add Ver"
            lazy-rules
          />
          <q-input
            v-model='newEventTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newEventBody'
            autogrow
            hint="add Body"
            lazy-rules
          />
          <q-input
            v-model='newEventDateUpd'
            type="text"
            hint="add date"
            lazy-rules
          />
        </div>
        <q-btn @click="addEvent" label="add event"/>
      </q-form>
      <!--    addNewsCard-->
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model=newNewsCardSubTitle
            hint="add subtitle"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardTitle'
            hint="add Title"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardPreView'
            autogrow
            hint="add preview"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardFullNews'
            type="text"
            hint="add fullnews"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardDateNews'
            type="text"
            hint="add datenews"
            lazy-rules
          />
          <q-input
            v-model='newNewsCardSrcNews'
            type="text"
            hint="add srcnews"
            lazy-rules
          />
        </div>
        <q-btn @click="addNewsCard" label="add news"/>
      </q-form>
    </div>
    <q-toggle
      :false-value="false"
      :label="`Показываем EventAddModule ${redModel}`"
      :true-value="true"
      color="red"
      v-model="redModel"
    />
    <q-toggle
      :false-value="false"
      :label="`Показываем NewsAddModule ${greenModel}`"
      :true-value="true"
      color="red"
      v-model="greenModel"
    />
    <div v-if="redModel">
      <div class="q-pa-md" v-for="event in events" :key="event.id" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>{{ event.ver }}</q-toolbar-title>
          </q-toolbar>
          <q-list v-if="event.done">
            <q-item-section>
              {{ event.data }}
            </q-item-section>
            <q-item>
              {{ event.title }}
            </q-item>
            <q-item>
              {{ event.body }}
            </q-item>
          </q-list>
          <q-tabs
            v-model="tab"
            class="bg-teal text-yellow shadow-2"
          >
            <q-tab  @click="countUpEvent(event.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="toggleEvent(event.id)" name="alarms" icon="done" />
            <q-tab @click="deleteEvent(event.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
    <div v-if="greenModel">
      <div class="q-pa-md" v-for="NewsCard in NewsCards" :key="NewsCard.id" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>{{ NewsCard.subtitle }}</q-toolbar-title>
          </q-toolbar>
          <q-list v-if="NewsCard.done">
            <q-item-section>
              {{ NewsCard.data }}
            </q-item-section>
            <q-item>
              {{ NewsCard.title }}
            </q-item>
            <q-item>
              {{ NewsCard.fullnews }}
            </q-item>
          </q-list>
          <q-tabs
            v-model="tab"
            class="bg-teal text-yellow shadow-2"
          >
            <q-tab  @click="countUpEvent(event.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="toggleEvent(event.id)" name="alarms" icon="done" />
            <q-tab @click="deleteNewsCard(NewsCard.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </div>
   <div v-if="redModel" class="q-px-lg q-pb-md">
      <q-timeline color="secondary" >
        <q-timeline-entry heading >
          Хронология обновлений
        </q-timeline-entry>
        <q-timeline-entry v-for="event in events" :key="event.id"
          :title=event.title
          :subtitle=event.dateupd
          icon="done"
        >
          <div>
            ver: {{ event.ver }}
          </div>
          <div style="max-width: 650px">
            {{ event.body }}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  <div v-if="greenModel" class="q-px-lg q-pb-md">
    AddNewsBlock Mode
    <div v-for="NewsCard in NewsCards" :key="NewsCard.id">
      {{ NewsCard.title }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
// Event block
const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))
// NewsCard block
const newsCardCollectionRef = collection(db, 'siteNews')
const newsCardCollectionQuery = query(newsCardCollectionRef, orderBy('date', 'desc'))

const newEventVer = ref('')
const newEventTitle = ref('')
const newEventBody = ref('')
const newEventTeam2 = ref('')
const newEventDateUpd = ref('')
const newEventDate = ref('')
const newEventCount = ref('')
//  NewsCard Block
const newNewsCardSubTitle = ref('')
const newNewsCardTitle = ref('')
const newNewsCardPreView = ref('')
const newNewsCardFullNews = ref('')
const newNewsCardDateNews = ref('')
const newNewsCardSrcNews = ref('')

// Event Block
const addEvent = () => {
  addDoc(eventCollectionRef, {
    ver: newEventVer.value,
    title: newEventTitle.value,
    body: newEventBody.value,
    dateupd: newEventDateUpd.value,
    date: Date.now(),
    done: true
  })
  newEventVer.value = ''
  newEventTitle.value = ''
  newEventBody.value = ''
  newEventDateUpd.value = ''
  newEventDate.value = ''
  newEventCount.value = ''
  console.log('add todo', newEventDate.value)
}

const deleteEvent = id => {
  deleteDoc(doc(eventCollectionRef, id))
}
// NewsCard Block
const addNewsCard = () => {
  addDoc(newsCardCollectionRef, {
    subtitle: newNewsCardSubTitle.value,
    title: newNewsCardTitle.value,
    preview: newNewsCardPreView.value,
    fullnews: newNewsCardFullNews.value,
    datenews: newNewsCardDateNews.value,
    srcnews: newNewsCardSrcNews.value,
    date: Date.now(),
    done: true
  })
  newNewsCardSubTitle.value = ''
  newNewsCardTitle.value = ''
  newNewsCardPreView.value = ''
  newNewsCardFullNews.value = ''
  newNewsCardDateNews.value = ''
  newNewsCardSrcNews.value = ''
  console.log('add news', newNewsCardSubTitle.value)
}
const deleteNewsCard = id => {
  deleteDoc(doc(newsCardCollectionRef, id))
}

export default {
  name: 'GamesNowEventAdd',
  components: {},
  data () {
    return {
      tests: [],
      author1: ['Room view', 'Room service', 'Food'],
      author2: 'Room service',
      BtnName: 'pump',
      BtnSize: 'xs',
      tourCount: 0,
      count: '',
      items: []
    }
  },
  mounted () {
    // axios
    //   .post('http://localhost:3001/posts/', {
    //     id: '4',
    //     userId: '3',
    //     title: 'Article title4-1',
    //     body: 'Article body content44'
    //   })
    //   .then((response) => console.log(response))
    // axios
    //   .get('http://localhost:3001/posts')
    //   .then((response) => {
    //     this.posts = response.data
    //   })
  },
  setup () {
    const todos = ref([])
    const events = ref([])
    const NewsCards = ref([])
    onMounted(async () => {
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
          const todo = {
            id: doc.id,
            content: doc.data().content,
            title: doc.data().title,
            done: doc.data().done
          }
          fbTodos.push(todo)
        })
        todos.value = fbTodos
      })
      onSnapshot(eventCollectionQuery, (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            ver: doc.data().ver,
            title: doc.data().title,
            body: doc.data().body,
            dateupd: doc.data().dateupd,
            date: doc.data().date,
            done: doc.data().done
          }
          fbEvents.push(event)
        })
        events.value = fbEvents
      })
      // NewsCard Module
      onSnapshot(newsCardCollectionQuery, (querySnapshot) => {
        const fbNewsCards = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            id: doc.id,
            subtitle: doc.data().subtitle,
            title: doc.data().title,
            preview: doc.data().preview,
            fullnews: doc.data().fullnews,
            datenews: doc.data().datenews,
            srcnews: doc.data().srcnews,
            date: doc.data().date,
            done: doc.data().done
          }
          fbNewsCards.push(NewsCard)
        })
        NewsCards.value = fbNewsCards
      })
    })
    const toggleEvent = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        done: !events.value[index].done
      })
    }
    const countUpEvent = id => {
      const index = events.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        count: events.value[index].count++
      })
      console.log('countUP', events.value[index].count)
    }
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      titleMainEvent: 'samething title2',
      newEventVer,
      newEventTitle,
      newEventBody,
      newEventDateUpd,
      newEventTeam2,
      newEventCount,
      newNewsCardDateNews,
      newNewsCardFullNews,
      newNewsCardTitle,
      newNewsCardSubTitle,
      newNewsCardPreView,
      newNewsCardSrcNews,
      done: ref(true),
      redModel: ref(false),
      greenModel: ref(false),
      deleteEvent,
      addNewsCard,
      deleteNewsCard,
      deleteDoc,
      toggleEvent,
      countUpEvent,
      addEvent,
      events,
      todos,
      NewsCards,
      tab: ref(['alarms', 'mails']),
      expanded: ref(false)
    }
  },
  computed: {
    ...mapGetters([
      'dropDown'
    ])
  },
  methods: {
    ...mapActions([
      'togledropDown',
      'changePush',
      'myCountZero',
      'myCountUp',
      'howWatch'
    ])
  },

  props: {}
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
  .root
    width: 400px
    margin: 0 auto
    background-color: #fff
    padding: 30px
    margin-top: 100px
    border-radius: 20px
  input
    border: none
    outline: none
    border-bottom: 1px solid #ddd
    font-size: 1em
    padding: 5px 0
    margin: 10px 0 5px 0
    width: 100%
  button
    background-color: #3498db
    padding: 10px 20px
    margin-top: 10px
    border: none
    color: white
</style>
