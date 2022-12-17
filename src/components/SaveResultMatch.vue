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
  </div>
  <div v-for="item in SaveResults" :key="item.id">
    <ul>
      <p> {{ item.playerA }}</p>
      <p> {{ item.playerB }}</p>
      <q-separator />
    </ul>
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
      redModel: ref(true),
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
