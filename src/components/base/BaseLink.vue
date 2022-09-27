<template>
  <a
    :class="[props.isActive ?
      props.activeClass : props.inactiveClass,
      'px-3 py-2 rounded-md text-sm font-medium justify-between cursor-pointer']"
    :aria-current="props.isActive ? 'page' : undefined"
    @click="onClick">
    <div class="flex">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
    <slot v-if="hasSlot('right_icon')" name="right_icon" class="cursor-pointer text-gray-600"></slot>
  </a>
</template>

<script setup>
import { useSlots } from 'vue';

const emit = defineEmits(['click']);

const props = defineProps({
  href: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: false
  },
  activeClass: {
    type: String,
    default: 'bg-gray-900 text-white'
  },
  inactiveClass: {
    type: String,
    default: 'text-gray-300 hover:bg-gray-700 hover:text-white'
  }
})

const slots = useSlots();
const hasSlot = (name) => {
  return !!slots[name];
}

const onClick = () => {
  emit("click", ...arguments);
}
</script>

<style lang="scss" scoped>

</style>
