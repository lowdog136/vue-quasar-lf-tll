<template>
  <div class="q-pa-md row items-start q-gutter-md">
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
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'

const eventCollectionRef = collection(db, 'siteUpdates')
const eventCollectionQuery = query(eventCollectionRef, orderBy('date', 'desc'))
const newEventVer = ref('')
const newEventTitle = ref('')
const newEventBody = ref('')
const newEventDateUpd = ref('')
const newEventDate = ref('')
const newEventCount = ref('')

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

export default {
  name: 'siteUpdate',
  components: {},
  data () {
    return {}
  },
  setup () {
    const todos = ref([])
    const events = ref([])
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
      newEventCount,
      done: ref(true),
      redModel: ref(false),
      deleteEvent,
      deleteDoc,
      toggleEvent,
      countUpEvent,
      addEvent,
      events,
      todos,
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
