<template>
  <div class="w-3/4">
    <p class="heading-5">{{ props.question.question }}</p>
    <div class="w-full px-4 py-16">
      <div class="mx-auto w-full max-w-md">
        <RadioGroup v-model="selected[props.question.id]">
          <!-- <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel> -->
          <div class="space-y-2">
            <RadioGroupOption
              as="template"
              v-for="answerIndex in Object.keys(props.question.answers).filter((key) => props.question.answers[key])"
              :key="answerIndex"
              :value="answerIndex"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                    : '',
                  checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
                ]"
                class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
              >
                <div class="flex w-full items-center justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        as="p"
                        :class="checked ? 'text-white' : 'text-gray-900'"
                        class="font-medium"
                      >
                        {{ props.question.answers[answerIndex] }}
                      </RadioGroupLabel>
                    </div>
                  </div>
                  <div v-show="checked" class="shrink-0 text-white">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="#fff"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import { reactive } from 'vue';

const selected = reactive({});

const props = defineProps({
  question: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const getAnswer = () => {
  return selected;
}

defineExpose({ getAnswer });
</script>

<style lang="scss" scoped>

</style>