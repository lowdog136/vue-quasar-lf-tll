<template>
<!--    <div class="q-gutter-md" >-->
<!--      <q-date-->
<!--        v-model="date"-->
<!--        color="orange"-->
<!--        text-color="black"-->
<!--        dark-->
<!--        :events="eventListValue"-->
<!--        bordered-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-date name="wedding" v-model="date" />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>

      <q-card flat bordered class="q-mt-md bg-grey-2" v-if="submitResult.length > 0">
        <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
        <q-separator />
        <q-card-section class="row q-gutter-sm items-center">
          <div
            v-for="(item, index) in submitResult"
            :key="index"
            class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
          >{{ item.name }} = {{ item.value }}</div>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'listDateEvent',
  setup: function () {
    const submitResult = ref([])
    return {
      date: ref('2022/09/01'),
      submitResult,

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
  },
  props: {
    eventListValue: {
      type: Object,
      default () {
        return {
          listEvents: String
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
