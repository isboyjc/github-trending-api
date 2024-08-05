<template>
  <div class="w-full p-4">
    <div class="w-full flex justify-between items-center">
      <div class="w-ful flex-1">
        <div class="w-full flex justify-start items-center">
          <icon-iconoir-repository class="text-16px" />
          <a
            target="_blank"
            class="font-700 lg:w-auto text-center text-primary! no-underline!"
            uno-hover="underline!" 
            :href="data.url"
          >
            <span class="text-primary ml-2 text-18px font-500">{{ data.title }}</span>
          </a>
        </div>
        <div class="pt-4px">{{ data.description }}</div>
      </div>
      <div class="w-120px"></div>
    </div>
    <div class="w-full flex justify-between items-center mt-2">
      <div class="w-full flex-1 flex justify-start items-center flex-warp">
        <div class="flex justify-start items-center text-12px lg:mr-3 mr-2" v-if="data.language">
          <div 
            class="w-12px h-12px rounded-full" 
            :style="{
              background: data?.languageColor || 'var(--vp-c-bg-soft)'
            }"
          ></div>
          <div class="ml-1">{{ data.language }}</div>
        </div>
        <div class="flex justify-start items-center text-12px lg:mr-3 mr-2" uno-hover="text-primary!">
          <icon-tabler-star class="text-12px" />
          
          <a
            target="_blank"
            class="no-underline! text-inherit!"
            :href="data.url + '/stargazers'"
          >
            <span class="ml-1">{{ data.stars }}</span>
          </a>
        </div>
        <div class="flex justify-start items-center text-12px lg:mr-3 mr-2" uno-hover="text-primary!">
          <icon-tabler-git-fork class="text-14px" />

          <a
            target="_blank"
            class="no-underline! text-inherit!"
            :href="data.url + '/forks'"
          >
            <span class="ml-1">{{ data.forks }}</span>
          </a>
         
        </div>
        <div class="flex flex-shrink-0 justify-start items-center text-12px lg:mr-3 mr-2">
          <div>{{ t(lang, 'builtBy') }}</div>
          <div class="flex ml-1">
            <a-avatar-group :size="24">
              <a :href="v.url" target="_black" :alt="'@' + v.name" :title="'@' + v.name" v-for="v of data.contributors" :key="v.name">
                <a-avatar :image-url="v.avatar">{{ v.name }}</a-avatar>
              </a>
            </a-avatar-group>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center text-12px flex-shrink-0">
        <icon-tabler-star class="text-12px" />
        <span class="ml-1">{{ data.addStars }} stars {{ addStarDesc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress'
import {t} from '../locale'

const { lang } = useData()

const props = defineProps({
  data: Object,
  since: String
});

const hash = {
  'daily': 'today',
  'weekly': 'thisWeek',
  'monthly': 'thisMonth',
}
const addStarDesc = computed(() => {
  props.since
  return t(lang.value, hash[props.since]).toLowerCase()
})
</script>