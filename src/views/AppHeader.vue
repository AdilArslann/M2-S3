<template>
  <div class="header">
    <img alt="Habit Tracker logo" class="logo" src="@/assets/HeaderIcon.webp" />
    <h1>Habit Tracker</h1>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  width: 100%;
  background: rgb(28, 32, 32);
}

img {
  height: 102px;
  margin-right: 8px;
  padding-bottom: 10px;
}

h1 {
  margin: 0;
}
</style>
