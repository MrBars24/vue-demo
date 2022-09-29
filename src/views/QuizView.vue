<template>
  <div v-if="loading" class="w-3/4 h-24 rounded-md mx-auto">
    <div class="flex animate-pulse flex-col space-x-5">
      <div class="w-full flex flex-col space-y-5">
        <div class="w-full bg-gray-300 h-6 rounded-md ">
        </div>
        <div class="mt-10 w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
        <div class="w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
        <div class="w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
        <div class="w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
      </div>
      <div class="w-full flex flex-col mt-10 space-y-5">
        <div class="w-full bg-gray-300 h-6 rounded-md ">
        </div>
        <div class="mt-10 w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
        <div class="w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
        <div class="w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
        <div class="w-1/2 mx-auto bg-gray-300 h-10 rounded-md ">
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center">
    <QuizQuestions ref="quizQuestions" v-for="q in questions" :key="q.id" :question="q" />
    <div class="flex">
      <BaseButton @click="checkAnswers">Submit Answers</BaseButton>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                You are done
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your score is {{ score }}.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from 'vue'
import QuizQuestions from "../components/QuizQuestions.vue";
import BaseButton from "../components/base/BaseButton.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

const questions = reactive({});
const quizQuestions = ref(null);

onMounted(() => {
  getQuizes();
});

const isOpen = ref(false);
const score = ref(0);
const loading = ref(false);

const closeModal = () => {
  isOpen.value = false;
}
const openModal = () => {
  isOpen.value = true;
}

const getQuizes = async() => {
  loading.value = true;
  let quizes = await axios.get("https://quizapi.io/api/v1/questions", {
    params: {
      apiKey: 'mk9bljEpahMbhctyWWBLPXYl9EBVAnAfPYVgBabs',
      limit: 5,
    }
  });

  loading.value = false;
  Object.assign(questions, quizes.data);
};

const checkAnswers = async () => {
  let isFilled = await checkFilled();
  let tmpScore = 0;

  if (isFilled) { // check correct answers
    for (let index = 0; index < Object.keys(questions).length; index++) {
      let ans = quizQuestions.value[index].getAnswer();
      let question = questions[index];
      let answerKey = ans[question.id];
      if (question.correct_answer === answerKey) {
        tmpScore = tmpScore +  1;
      }
    }

    score.value = tmpScore;
    openModal();
  }
}

const checkFilled = async() => {
  const len = quizQuestions.value.length;
  let filled = 0;
  for (let index = 0; index < len; index++) {
    if (Object.keys(quizQuestions.value[index].getAnswer()).length > 0) {
      await filled++;
    }
  }
  return len === filled;
};
</script>

<style lang="scss" scoped>

</style>