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
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SaveResultMatch',
  setup () {
    const submitResult = ref([])
    const onSubmitCheck = ref([])

    return {
      val: ref(true),
      val2: ref(true),
      name: ref('Player A'),
      name2: ref('Player B'),
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
