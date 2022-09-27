<template>
  <div>
    <h1>This is {{ page }} page</h1>
    <input type="text" v-model="page" style="display: block">

    <br>
    <form>
      <!-- <div>
        <h2>{{ firstname }}</h2>
        <h2>{{ lastname }}</h2>
        <h2>{{ age }}</h2>
      </div> -->
      <div>
        <h2>First name: {{ person.firstname }}</h2>
        <h2>Last name: {{ person.lastname }}</h2>
        <h2>Age: {{ person.age }}</h2>
        <h2>Course: {{ person.course }}</h2>
        <div v-if="person.course">
          <h3 v-if="person.course === 'BSCS'">Bachelor of Science in Computer Science</h3>
          <h3 v-if="person.course === 'BSIT'">Bachelor of Science in Information Technology</h3>
          <h3 v-if="person.course === 'ACT'">Associate in Computer Technology</h3>
          <h3 v-if="person.course === 'BSEMC'">Bachelor of Science in Entertainment and Multimedia Computing</h3>
        </div>
        <div v-else>No course selected</div>
      </div>
      <input type="text" v-model="person.firstname" placeholder="first name">
      <input type="text" v-model="person.lastname" placeholder="last name">
      <input type="number" v-model="person.age" placeholder="age">
      <select v-model="person.course" name="course" id="course">
        <option v-for="course in courses" :key="course">{{ course }}</option>
      </select>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// const page = "page name";
const page = ref("page name");

// const firstname = ref();
// const lastname = ref();
// const age = ref();
const person = reactive({
  firstname: "",
  lastname: "",
  age: "",
  course: "",
});

const courses = ["ACT", "BSCS", "BSEMC", "BSIT"];

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
