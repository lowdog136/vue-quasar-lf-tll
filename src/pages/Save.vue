<template>
  <div class="q-pa-md">
    <q-splitter
      v-model="splitterModel"
      style="height: 450px"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-date
            v-model="date"
            :events=washes
            event-color="orange"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-for="event in washes" :key="event.id"
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel :name=event.date>

            <div class="text-h4 q-mb-md">{{ event.date }}</div>            <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar6.jpg">
              </q-avatar>
            </q-item-section>
            <q-item-section>Jane</q-item-section>
          </q-item>
            <p>В этот день кофемашину моет:{{ event.name }}</p>
            <p>Пометка:{{ event.text }}</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
    <div>
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='newEventName'
            hint="add name"
            lazy-rules
          />
          <q-input
            v-model='newEventDate'
            hint="add date yyyy/mm/dd"
            lazy-rules
          />
          <q-input
            v-model='newEventText'
            hint="add note"
            lazy-rules
          />
        </div>
        <q-btn @click="addEvent" label="add event"/>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore, mapActions, mapGetters } from 'vuex'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../firebase'

const todosCollectionRef = collection(db, 'todos')
const eventCollectionRef = collection(db, 'washes')
// const eventCollectionCount = collection(db, 'events')

const newTodoContent = ref('')
const newEventName = ref('')
const newEventDate = ref('')
const newEventText = ref('')
const newEventCount = ref('')

const addEvent = () => {
  addDoc(eventCollectionRef, {
    name: newEventName.value,
    date: newEventDate.value,
    text: newEventText.value,
    count: newEventCount.value,
    done: true
  })
  newEventName.value = ''
  newEventDate.value = ''
  newEventText.value = ''
  newEventCount.value = ''
  console.log('add todo', newEventName.value)
}

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false
  })
  newTodoContent.value = ''
  console.log('add todo', newTodoContent.value)
}

const deleteEvent = id => {
  deleteDoc(doc(eventCollectionRef, id))
}
const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}

export default {
  name: 'Save',
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
  setup () {
    const todos = ref([])
    const washes = ref([])
    onMounted(async () => {
      onSnapshot(collection(db, 'todos'), (querySnapshot) => {
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
      onSnapshot(collection(db, 'washes'), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            date: doc.data().date,
            text: doc.data().text,
            done: doc.data().done,
            name: doc.data().name
          }
          fbEvents.push(event)
        })
        washes.value = fbEvents
      })
    })
    const toggleDone = id => {
      const index = washes.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        done: !washes.value[index].done
      })
    }
    // const countUp = id => {
    //   const index = events.value.findIndex(event => event.id === id)
    //   updateDoc(doc(eventCollectionRef, id), {
    //     count: events.value[index].title.length
    //   })
    //   console.log('length', events.value[index].count)
    // }
    const countUp = id => {
      const index = washes.value.findIndex(event => event.id === id)
      updateDoc(doc(eventCollectionRef, id), {
        count: increment(1)
      })
      console.log('count', washes.value[index].count)
    }
    // eslint-disable-next-line camelcase
    const login_form = ref({})
    // eslint-disable-next-line camelcase
    const register_form = ref({})
    const store = useStore()
    const login = () => {
      store.dispatch('login', login_form.value)
    }
    const register = () => {
      store.dispatch('login', register_form.value)
    }
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      login_form,
      titleMainEvent: 'samething title2',
      register_form,
      login,
      newTodoContent,
      newEventName,
      newEventDate,
      newEventText,
      newEventCount,
      newCount: 6,
      register,
      deleteTodo,
      deleteEvent,
      deleteDoc,
      toggleDone,
      countUp,
      addTodo,
      addEvent,
      splitterModel: ref(50),
      date: ref('2022/10/01'),
      washes,
      todos,
      store,
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
    ]),
    async addProfilesT () {
      await axios.post('http://localhost:3001/profile/', {
        name: this.name,
        surname: this.surname,
        other: this.other
      })
    },
    async addPostT () {
      await axios.post('http://localhost:3001/posts/', {
        title: this.title,
        body: this.body,
        count: this.count
      })
    }
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
