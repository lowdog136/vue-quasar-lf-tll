<template>
  <div class="q-pa-md">
    <q-table
      title="Турнирная таблица"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="primary"
    />
  </div>
</template>

<script>

const columns = [
  {
    name: 'desc',
    required: true,
    label: '',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: false
  },
  { name: 'games', align: 'center', label: 'И', field: 'games' },
  { name: 'win', label: 'В', field: 'win' },
  { name: 'draw', label: 'Н', field: 'draw' },
  { name: 'lose', label: 'П', field: 'lose' },
  { name: 'ball_io', label: 'Разница', field: 'ball_io' },
  { name: 'score', label: 'О', field: 'score', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'last_game', label: 'Форма', field: 'last_game', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 1,
    name: 'Север',
    colorCode: 'primary',
    games: 12,
    win: 10,
    draw: 2,
    lose: 0,
    ball_io: '34-4',
    score: 32,
    last_game: 'BBBBH'
  },
  {
    id: 2,
    name: 'Псков',
    games: 11,
    win: 9,
    draw: 1,
    lose: 1,
    ball_io: '27-7',
    score: 28,
    last_game: 'ВВHBВ'
  },
  {
    id: 3,
    name: 'СШ №2 ВО Звезда',
    games: 12,
    win: 5,
    draw: 1,
    lose: 6,
    ball_io: '21-24',
    score: '16',
    last_game: 'ВВППП'
  },
  {
    id: 7,
    name: 'Химик',
    games: 12,
    win: 3,
    draw: 4,
    lose: 5,
    ball_io: '24-20',
    score: '13',
    last_game: 'ППHBB'
  },
  {
    id: 5,
    name: 'Новград',
    games: 12,
    win: 1,
    draw: 3,
    lose: 8,
    ball_io: '6-26',
    score: 6,
    last_game: 'ППППП'
  },
  {
    id: 6,
    name: 'СШ Ленинградец',
    games: 11,
    win: 5,
    draw: 3,
    lose: 3,
    ball_io: '27-14',
    score: '18',
    last_game: 'НВHBB'
  },
  {
    id: 7,
    name: 'СШ №7 Карелия',
    games: 12,
    win: 5,
    draw: 1,
    lose: 6,
    ball_io: '29-21',
    score: '16',
    last_game: 'ПВППВ'
  },
  {
    id: 8,
    name: 'СШ Электрон',
    games: 12,
    win: 1,
    draw: 1,
    lose: 9,
    ball_io: '6-49',
    score: '4',
    last_game: 'ППППB'
  }
]

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>
