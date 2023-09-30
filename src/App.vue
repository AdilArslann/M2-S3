<template>
  <div class="header"><AppHeader /></div>
  <div class="main">
    <Calendar view="weekly" :attributes="attrs" :events="calendarEvents" :max-date="new Date()" @dayclick="handleDayClick" />
    <router-view />
    <AddHabit />
  </div>
</template>

<script setup>
import AppHeader from "./views/AppHeader.vue";
import AddHabit from './components/AddHabit.vue';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar } from 'v-calendar';

const calendarEvents = ref([]);

const router = useRouter();


const handleDayClick = (context) => {
  /*Handles when the user clicks on a day in the calendar.
  first checks the selected day if it is in the future it just ignores it
  if not then converts the date to the format we want and routes to that days
  habits*/
  const selectedDate = context.date;
  if (selectedDate > new Date()) {
    return;
  }
  // Create a new date using UTC values
  const utcDate = new Date(
    Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    )
  );

  const formattedDate = utcDate.toISOString().substring(0, 10);
  router.push({ path: `/day/${formattedDate}` });
};
onMounted(() => {
  /*This function is run when the site is first loaded to select the
  date as the current day when the user is using the site*/
  const currentDate = new Date();
  // Format the current date in yyyy-mm-dd format
  const formattedDate = currentDate.toISOString().substring(0, 10);
  router.push({ path: `/day/${formattedDate}` });
});


const attrs = ref([
  {
    key: "today",
    dot: true,
    dates: new Date(),
  },
]);
</script>

<style>
.header{
  margin-bottom: 20px;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vc-pane-container {
  background-color: black;
  color: #fafafa;
  width: 100%;
}


.vc-pane-container .vc-weekday {
  color: #348671;
}

.vc-header .vc-arrow,
.vc-title,
.vc-nav-arrow,
.vc-nav-title {
  background-color: #348671;
  color: #ffffff;
}

</style>

/*Well for some reason all the styles for the
v-calendar is messed up it is not working i am just sick
of it so i will just move on with this due to time limitations
and since this project isn't really focusing on ui but rather
for us to get familiar with vue composition api */