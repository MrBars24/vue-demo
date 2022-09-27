<template>
  <component
    :is="props.as"
    :type="type"
    :class="classes"
    class="focus:outline-none hover:shadow-lg font-semibold"
    @click="onClick"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(["click"]);
const props = defineProps({
  as: {
    type: String,
    default: "button"
  },
  type: {
    type: String,
    default: "button"
  },
  rounded: {
    type: Boolean
  },
  textColor: {
    type: String,
    default: "text-white"
  },
  background: {
    type: String,
    default: "bg-blue-500 hover:bg-blue-600"
  },
  size: {
    type: String,
    default: "md"
  },
  block: {
    type: Boolean
  }
});

const classes = computed(() => {
  let cls = [
    props.textColor,
    ...props.background.split(" ")
  ];

  if (props.size === "sm") {
    cls = cls.concat(["py-2", "px-4", "text-xs"]);
  } else if (props.size === "md") {
    cls = cls.concat(["text-sm", "py-2.5", "px-5"]);
  } else if (props.size === "lg") {
    cls = cls.concat(["text-md", "py-3", "px-6"]);
  }

  if (props.rounded) {
    cls.push("rounded-full");
  }

  if (props.block) {
    cls.push(["w-full"]);
  }

  return cls;
});

const onClick = () => {
  emit("click", ...arguments);
}
</script>

<style lang="scss" scoped>

</style>
