<template>
  <div class="min-h-full">
    <Disclosure v-slot="{ open }" as="nav" class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <!-- <SkyIcon class="h-10 w-10" /> -->
              <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 578 599">
                <path class="cls-1" d="M283,587L158,512,408,362l125,75Z"/>
                <path class="cls-2" d="M35,438V163L285,13V288L35,438"/>
                <path class="cls-2" d="M34,437L284,287l125,75L159,512Z"/>
                <path class="cls-1" d="M159,513V238L409,88V363Z"/>
                <path class="cls-3" d="M283,588L533,438V163L283,313V588Z"/>
              </svg>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <BaseLink @click="navigateTo('home')" :is-active="activePage.name === 'home'">Home</BaseLink>
                <BaseLink @click="navigateTo('about')" :is-active="activePage.name === 'about'">About</BaseLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <div class="relative cursor-pointer">
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                  <div class="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 -mt-px mr-0.5 m-auto"></div>
                </div>
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
    <main class="transition container px-8 mt-8">
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import StackedNavLinks from '@/components/molecules/StackedNavLinks.vue';
import BaseLink from '../../base/BaseLink.vue';

const $route = useRoute();
const $router = useRouter();
const activePage = ref($route.matched.at(-1))

watch($route, () => {
  activePage.value = $route.matched.at(-1);
});

const user = {
  name: 'Khel Austria',
  email: 'khel@example.com',
  imageUrl:
    'https://avatars.githubusercontent.com/u/19724597?v=4',
}

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const navigateTo = (name) => {
  $router.push({ name: name })
};
</script>

<style lang="scss" scoped>
  .cls-1 {
    fill: #40c4ff;
  }

  .cls-1, .cls-2, .cls-3 {
    fill-rule: evenodd;
  }

  .cls-2 {
    fill: #80d8ff;
  }

  .cls-3 {
    fill: #0091ea;
  }
</style>