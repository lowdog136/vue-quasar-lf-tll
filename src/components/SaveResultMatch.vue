<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md">
      <q-form
        class="q-gutter-md"
      >
        <div>
          <q-input
            v-model='addPlayerA'
            hint="add SubTitle"
            lazy-rules
          />
          <q-input
            v-model='addPlayerB'
            hint="add Title"
            lazy-rules
          />

        </div>
        <q-btn @click="addResult" label="add event"/>
      </q-form>
    </div>
    <q-toggle
      :false-value="false"
      :label="`Показываем ${redModel}`"
      :true-value="true"
      color="red"
      v-model="redModel"
    />
    <div v-if="redModel">
      <div class="q-pa-md" v-for="event in events" :key="event.date" style="max-width: 650px">
        <q-card>
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title>{{ event.subtitle }}</q-toolbar-title>
          </q-toolbar>
          <q-list v-if="event.done">
            <q-item-section>
              {{ event.count }}
            </q-item-section>
            <q-item>
              {{ event.title }}
            </q-item>
            <q-item>
              {{ event.team1 }}-{{ event.team2 }}
            </q-item>
          </q-list>
          <q-tabs
            v-model="tab"
            class="bg-teal text-yellow shadow-2"
          >
            <q-tab  @click="countUpEvent(event.id)" name="mails" icon="arrow_upward" />
            <q-tab @click="addResult(event.id)" name="alarms" icon="done" />
            <q-tab @click="deleteResult(event.id)" name="movies" icon="delete" />
          </q-tabs>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'

const addPlayerA = ref('')
const addPlayerB = ref('')
// NewsCard block
const saveResultCollectionRef = collection(db, 'resultMatch')
const saveResultCollectionQuery = query(saveResultCollectionRef, orderBy('date', 'desc'))

const addResult = () => {
  addDoc(saveResultCollectionRef, {
    playerA: addPlayerA.value,
    playerB: addPlayerB.value,
    date: Date.now()
  })
  addPlayerA.value = ''
  addPlayerB.value = ''
  console.log('add todo', addPlayerA.value)
}

const deleteResult = id => {
  deleteDoc(doc(saveResultCollectionRef, id))
}

export default {
  name: 'SaveResultMatch',
  setup () {
    const submitResult = ref([])
    const onSubmitCheck = ref([])
    const SaveResults = ref([])
    const item = ref([])
    onMounted(async () => {
      // saveResult Module
      onSnapshot(saveResultCollectionQuery, (querySnapshot) => {
        const fbSaveResult = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            id: doc.id,
            playerA: doc.data().playerA,
            playerB: doc.data().playerB,
            date: doc.data().date
          }
          fbSaveResult.push(NewsCard)
        })
        SaveResults.value = fbSaveResult
      })
    })

    return {
      val: ref(true),
      val2: ref(true),
      name: ref('Player A'),
      name2: ref('Player B'),
      SaveResults,
      deleteResult,
      addResult,
      addPlayerA,
      addPlayerB,
      item,
      submitResult,
      onSubmitCheck,

      onSubmit (evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submitResult.value = data
      }
    }
  }
}
</script>
