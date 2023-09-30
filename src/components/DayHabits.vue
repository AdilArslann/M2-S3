<template>
  <div>
    <h2>Habits for {{ selectedDate }}</h2>
    <ul>
      <li v-for="habit in habitsForDate(selectedDate)" :key="habit.habitName">
        <label>
          <div v-if="!habit.editing">
            <input
              type="checkbox"
              :checked="habitDone(habit, selectedDate)"
              @change="setHabitDone(habit, selectedDate, $event.target.checked)"
            />
            {{ habit.habitName }}
            <button @click="editHabit(habit)">Edit</button>
            <button @click="stopHabit(habit)">Stop</button>
            <button @click="deleteHabit(habit)">Delete</button>
          </div>
          <div v-else>
            <input type="text" v-model="habit.editName" />
            <button @click="saveEditedHabit(habit)">Save</button>
            <button @click="cancelEdit(habit)">Cancel</button>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedDate = ref(route.params.date)
let habits = JSON.parse(localStorage.getItem('habits')) || []

// Make habits array reactive
habits = reactive(habits.map((habit) => ({ ...habit, editing: false, editName: habit.habitName })))

onMounted(() => {
  habitsForDate(selectedDate.value)
})

watch(
  () => route.params.date,
  (newDate) => {
    selectedDate.value = newDate
    habitsForDate(newDate)
  }
)

const habitsForDate = (date) => {
  // habits = JSON.parse(localStorage.getItem("habits")) || []; // Update the habits list
  return habits.filter((habit) => {
    return habit.days.some((day) => day.date === date)
  })
}

const habitDone = (habit, date) => {
  const dayEntry = habit.days.find((day) => day.date === date)

  if (dayEntry) {
    return dayEntry.done
  }
  return false
}

const setHabitDone = (habit, date, value) => {
  const dayEntry = habit.days.find((day) => day.date === date)

  if (dayEntry) {
    dayEntry.done = value
    const habitIndex = habits.findIndex((h) => h.habitName === habit.habitName)
    if (habitIndex !== -1) {
      habits[habitIndex] = habit
      localStorage.setItem('habits', JSON.stringify(habits))
    }
  }
}

const editHabit = (habit) => {
  habit.editing = true
}

const saveEditedHabit = (habit) => {
  if (habit.editName.trim() !== '') {
    habit.habitName = habit.editName
    habit.editing = false
    localStorage.setItem('habits', JSON.stringify(habits))
  }
}

const cancelEdit = (habit) => {
  habit.editing = false
}
const stopHabit = (habit) => {
  const currentDate = new Date()
  const newDays = habit.days.filter((day) => {
    const habitDate = new Date(day.date)
    return habitDate <= currentDate
  })
  habit.days = newDays
  localStorage.setItem('habits', JSON.stringify(habits))
}
const deleteHabit = (habit) => {
  const habitIndex = habits.findIndex((h) => h.habitName === habit.habitName)
  if (habitIndex !== -1) {
    habits.splice(habitIndex, 1)
    localStorage.setItem('habits', JSON.stringify(habits))
  }
}
</script>

<style>
h2 {
  color: #448d7d;
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
}

li label {
  display: flex;
  align-items: center;
}

li input[type='checkbox'] {
  margin-right: 10px;
}

li input[type='text'] {
  margin-right: 10px;
}

li button {
  margin-left: 10px;
}
</style>
