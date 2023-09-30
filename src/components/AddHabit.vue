<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <label>Habit Name:</label>
      <input v-model="habitName" required />
      <br />
      <label>Start Date:</label>
      <input type="date" v-model="startDate" required />
      <br />
      <label>End Date:</label>
      <input type="date" v-model="endDate" required />
      <br />
      <button class="add-habit" type="submit">Add Habit</button>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const habitName = ref('')
const startDate = ref('')
const endDate = ref('')

const submitForm = () => {
  const habitExists = checkHabitExists(habitName.value)

  if (habitExists) {
    alert('A habit with the same name already exists.')
    return
  }
  const days = generateDays(startDate.value, endDate.value)

  const habits = JSON.parse(localStorage.getItem('habits')) || []
  habits.push({
    habitName: habitName.value,
    days
  })
  localStorage.setItem('habits', JSON.stringify(habits))

  // Clears the fields
  habitName.value = ''
  startDate.value = ''
  endDate.value = ''
  
  const router = useRouter()
  const route = useRoute()
  router.replace(route)
}

const generateDays = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = []
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`
    days.push({ date: formattedDate, done: false })
  }
  return days
}
const checkHabitExists = (habitName) => {
  const habits = JSON.parse(localStorage.getItem('habits')) || []
  return habits.some((habit) => habit.habitName === habitName)
}
</script>

<style>
.form-container {
  border: 1px solid #ccc;
  border-radius: 5px;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'habit-name-label habit-name-label'
    'habit-name habit-name'
    'start-date-label end-date-label'
    'start-date end-date'
    'submit submit';
  gap: 10px;
  margin: 10px;
}

label {
  font-size: 18px;
}

input {
  font-size: 16px;
  padding: 5px;
}

form > label:nth-of-type(1) {
  grid-area: habit-name-label;
}

form > label:nth-of-type(2) {
  grid-area: start-date-label;
}

form > label:nth-of-type(3) {
  grid-area: end-date-label;
}

form > input:nth-of-type(1) {
  grid-area: habit-name;
}

form > input:nth-of-type(2) {
  grid-area: start-date;
}

form > input:nth-of-type(3) {
  grid-area: end-date;
}

button[type='submit'] {
  grid-area: submit;
}

input[type='date']:hover {
  cursor: pointer;
}

.add-habit {
  font-size: 18px;
  padding: 10px;
}
</style>
