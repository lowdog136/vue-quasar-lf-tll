<template>
  <div class="q-gutter-md">
    <div v-for="SaveResult in LeaderBoards" :key="SaveResult.id">
      <ul>id: {{ SaveResult.id }}</ul>
      <ul>player_name: {{ SaveResult.title }} </ul>
      <ul>player_score: {{ SaveResult.score }} </ul>
      <q-separator />
    </div>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div>
        <q-btn label="Show tables" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'

const saveResultCollectionRef = collection(db, 'playerList')
const saveResultCollectionQuery = query(saveResultCollectionRef, orderBy('score', 'desc'))

export default {
  name: 'LeaderBoardTable',
  setup () {
    const submitResult = ref([])
    const onSubmitCheck = ref([])
    const LeaderBoards = ref([])
    const item = ref([])
    onMounted(async () => {
      // saveResult Module
      onSnapshot(saveResultCollectionQuery, (querySnapshot) => {
        const fbSaveResult = []
        querySnapshot.forEach((doc) => {
          const NewsCard = {
            id: doc.id,
            title: doc.data().title,
            score: doc.data().score
          }
          fbSaveResult.push(NewsCard)
          console.log(NewsCard.score)
        })
        LeaderBoards.value = fbSaveResult
      })
    })

    return {
      val: ref(true),
      val2: ref(true),
      LeaderBoards,
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
