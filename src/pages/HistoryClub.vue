<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <HistoryClubCard />
<!--    <q-card class="my-card">-->
<!--      <q-img :src="require('assets/image/imgTitle/title_0.png' )" />-->

<!--      <q-card-section>-->
<!--        <div class="text-h6 text-deep-orange-14 ">История ФК Север г. Мурманск</div>-->
<!--        <div class="text-subtitle2 text-grey">Материал из Википедии — свободной энциклопедии.</div>-->
<!--      </q-card-section>-->

<!--      <q-card-section>-->
<!--        <div class="text-h7">-->
<!--          Основан 1 марта 1961 году под названием «Тралфлотовец».-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          Дебют в турнире класса «Б», где выступали команды Северо-Запада и центра РСФСР, не удался — лишь 11-е место из 13 участников.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          В 1965 году команду переименовали в «Север». Наивысшим достижением мурманских футболистов было второе место в зональных соревнованиях 1968 года. Тогда «Север» вышел в полуфинальную часть чемпионата СССР среди команд класса «Б» в зоне РСФСР.-->
<!--          Полуфинальный турнир проходил в Пятигорске. Итог выступления заполярных футболистов — третье место. «Север» проиграл пятигорскому «Машуку» — 0:1, майкопской «Дружбе» — 0:5 и победил «Олимп» из подмосковного Фрязино — 3:0.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          С 1971 года после того, как произошла реорганизация чемпионата страны, «Север» получил «прописку» во второй лиге, выступая с переменным успехом.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          В 1984 году решением ВЦСПС, который проводил зональный турнир, три команды РСФСР, имеющие худшие результаты покидали вторую лигу и переходили в разряд КФК. Эта участь постигла горьковскую «Волгу», «Волжанин» из Кинешмы и мурманский «Север», который занял последнее место. Этот сезон стал последним для команды из Мурманска в первенстве страны.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          Вновь сформирован в 2006 году. Заявился в ЛФЛ. В сезоне 2006 года команда стала обладателем Кубка России среди ЛФК в зоне МРО «Северо-Запад».-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          В 2007 году клуб занял 1-е место в первенстве МРО «Северо-Запад» любительского первенства России.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          С 2008 года в течение пяти сезонов «Север» выступал в зоне «Запад» второго дивизиона (Первенство ПФЛ).-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          6 июня 2014 года у всех участников клуба закончились контракты. Было объявлено о расформировании клуба. Причиной стало недостаточное финансирование команды.-->
<!--          Руководство Мурманской области готово было выделить на содержание клуба лишь 22,5 миллиона рублей при необходимых для выступления на уровне второго дивизиона ПФЛ 35 млн рублей. Попытки найти спонсоров успехом не увенчались.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          10 апреля 2015 на сайте МРО «Северо-Запад» появилась информация, что ФК «Север» подтвердил своё участие в розыгрыше первенства региона в сезоне 2015.-->
<!--        </div>-->
<!--        <div class="text-h7">-->
<!--          В январе 2022 года появилась информация о возрождении клуба на любительском уровне для участия в Третьем дивизионе в зоне ОФФ «Северо-Запад».-->
<!--          Главным тренером был назначен бывший футболист «северян» Александр Петухов.-->
<!--          Формирование команды произошло на базе петербургского любительского клуба «Константиновское». Также на роль спортивного директора был назначен Адьям Кузяев, когда-то тренировавший сам «Север». В рамках подготовки к сезону команда заявилась на Турнир уполномоченного представителя президента в Северо-Западном федеральном округе.-->
<!--        </div>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HistoryClubCard from 'components/HistoryClubCard/HistoryClubCard'

export default defineComponent({
  name: 'HistoryClub',
  components: { HistoryClubCard }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 350px
  max-width: 750px

</style>
