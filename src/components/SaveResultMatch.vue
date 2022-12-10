<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        name="name"
        v-model="name"
        color="primary"
        label="Player A"
        filled
        clearable
      >
        <template v-slot:after>
          <q-checkbox @submit="onSubmit" v-model="val" />
        </template>
      </q-input>

      <q-input
        name="name"
        v-model="name2"
        color="primary"
        label="Player B"
        filled
        clearable
      >
        <template v-slot:after>
          <q-checkbox @submit="onSubmit" v-model="val2" />
        </template>
      </q-input>

      <div>
        <q-btn label="Save Result Match" type="submit" color="primary"/>
      </div>
    </q-form>

    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >
          {{ item.name }} = {{ item.value }}
        </div>
      </q-card-section>
    </q-card>
    <q-card v-if="submitResult === false" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >
          {{ item.name }} = {{ item.value }}
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div>
    <div v-for="SaveResult in SaveResults" :key="SaveResult.id">
      <ul>{{ SaveResult.id }}</ul>
      <ul>{{ SaveResult.playerA }} </ul>
      <ul> {{ SaveResult.playerB }}</ul>
      <q-separator />
    </div>
  </div>
  <div>
    <label for="myBrowser">Choose a browser from this list:</label>
    <input list="browsers" id="myBrowser" name="myBrowser" />
    <datalist id="browsers">
      <option value="Chrome" />
      <option value="Firefox" />
      <option value="Internet Explorer" />
      <option value="Opera" />
      <option value="Safari" />
      <option value="Microsoft Edge" />
    </datalist>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'src/firebase'

// NewsCard block
const saveResultCollectionRef = collection(db, 'resultMatch')
const saveResultCollectionQuery = query(saveResultCollectionRef, orderBy('date', 'desc'))

export default {
  name: 'SaveResultMatch',
  setup () {
    const submitResult = ref([])
    const onSubmitCheck = ref([])
    const SaveResults = ref([])
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
