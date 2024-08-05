<script setup>
import { ref, computed, watch } from 'vue'
import { useData } from 'vitepress'
import { useClipboard } from '@vueuse/core'
import moment from 'moment';
import 'moment-timezone'
import 'moment-duration-format';
import {t, routerPath} from '../locale'

const { lang } = useData()


const languages = ref([{label: 'All', value: 'all'}])

async function getLanguages(){
  const languagesJSON = await fetchData(`https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/languages.json`, 'json')

  languages.value = [
    {label: 'All', value: 'all'}, 
    ...languagesJSON.map(v => {
      return {
        label: v.name,
        value: convertToSlug(v.name)
      }
    })
  ]
}
getLanguages()


const form = ref({
  language: 'all',
  since: 'daily',
  cdn: 'github'
})

const cdnHash = {
  github: 'https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/{since}/{language}.',
  jsdelivr: 'https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/{since}/{language}.',
  other: 'https://gta.isboyjc.com/data/{since}/{language}.',
}

const jsonAPI = computed(v => cdnHash[form.value.cdn].replace('{since}', form.value.since).replace('{language}', form.value.language) + 'json')
const rssAPI = computed(v => cdnHash[form.value.cdn].replace('{since}', form.value.since).replace('{language}', form.value.language) + 'xml')

const { copy: jsonCopy, copied: jsonCopied } = useClipboard({ jsonAPI })
const { copy: rssCopy, copied: rssCopied } = useClipboard({ rssAPI })

function convertToSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '');
}

const pubDate = ref('')
async function fetchData(url, type = 'json') {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    let data = null

    if(type == 'json'){
      data = await response.json();
      pubDate.value = data.pubDate
    }
    if(type == 'rss'){
      data = await response.text();
      // const parser = new DOMParser();
      // const xmlDoc = parser.parseFromString(text, 'application/xml')
    }

    // console.log(data);
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

const json = ref('')
const itemLoading = ref(false)
// const rss = ref('')
watch(form, async () => {
  try{
    itemLoading.value = true
    json.value = await fetchData(jsonAPI.value)
    // rss.value = await fetchData(rssAPI.value, 'rss')
  }finally{
    itemLoading.value = false
  }
}, {
  immediate: true,
  deep: true
})


const pubDateFormat = computed(() => {
  if(!pubDate.value) return ''
  moment.locale(lang.value)

  const time = moment(pubDate.value).tz('GMT')
  const now = moment().tz('GMT')
  const duration = moment.duration(now.diff(time));

  const seconds = Math.floor(duration.asSeconds());
  const minutes = Math.floor(duration.asMinutes());
  const hours = Math.floor(duration.asHours());
  const days = Math.floor(duration.asDays());
  const months = Math.floor(duration.asMonths());
  const years = Math.floor(duration.asYears());

  let timeDescription = '';
  if (years > 0) {
    timeDescription = `${years} ${t(lang.value, 'years')}`;
  } else if (months > 0) {
    timeDescription = `${months} ${t(lang.value, 'months')}`;
  } else if (days > 0) {
    timeDescription = `${days} ${t(lang.value, 'days')}`;
  } else if (hours > 0) {
    timeDescription = `${hours} ${t(lang.value, 'hours')}`;
  } else if (minutes > 0) {
    timeDescription = `${minutes} ${t(lang.value, 'minutes')}`;
  } else {
    timeDescription = `${seconds} ${t(lang.value, 'seconds')}`;
  }


  return t(lang.value, 'lastReq').replace('{time}', timeDescription)
})

</script>

<template>
  <div class="custom-home">
    
    <section>
      <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-10">
        <div>
          <div class="text-center max-w-4xl mx-auto">
            <!-- <div class="sm:flex sm:justify-center">
              <a 
                v-motion
                :initial="{ opacity: 0, y: 100 }"
                :enter="{ opacity: 1, y: 0, scale: 1 }"
                :delay="0"
                :duration="400" 
                target="_blank"
                href="https://islenote.com"
                class="h-34px font-semibold text-primary rounded-full px-5 text-sm leading-6 border-2 border-solid border-primary flex-center duration-200 no-underline!"
                uno-hover="bg-primary text-[var(--vp-c-neutral-inverse)]!"
              >
                <icon-custom-islenote class="text-16px mr-6px" />
                <span class="block lg:inline"> {{t(lang, 'notice')}} <span aria-hidden="true">→</span> </span> 
              </a> 
            </div>  -->
            <h1 
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="50"
              :duration="400" 
              class="text-4xl! tracking-tight font-medium text-primary md:text-5xl font-display mt-12"
            >
              {{ t(lang, 'desc') }}
            </h1> 
            <div 
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="100"
              :duration="400" 
              class="text-[var(--vp-c-text-3)] lg:text-xl max-w-2xl mt-4 mx-auto text-base"
            >
              {{ t(lang, 'desc.secondary') }}
            </div> 
          </div>

          <div class="flex justify-center gap-3 mt-10 mb-5 flex-col sm:flex-row">
            <a 
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="200"
              :duration="400" 
              class="items-center justify-center h-12 font-medium rounded-xl inline-flex duration-200 lg:w-auto px-6 py-3 text-center text-[var(--vp-c-text-1)]! w-full border-2 border-solid border-[var(--vp-c-gray-soft)] no-underline!"
              uno-hover="text-primary! border-primary"
              :href="routerPath(lang, '/guide')"
            >
              {{ t(lang, 'guide') }}
            </a> 
            <a 
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="300"
              :duration="400" 
              target="_blank"
              class="items-center justify-center h-12 font-medium rounded-xl inline-flex bg-primary border-solid border-2 border-primary duration-200 lg:w-auto px-6 py-3 text-center text-[var(--vp-c-neutral-inverse)]! w-full no-underline!"
              uno-hover="bg-transparent border-primary text-primary!" 
              href="https://github.com/isboyjc/github-trending-api"
            >
            GitHub Stars →
            </a> 
          </div>

          <div class="sm:flex sm:justify-center">
            <div
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="400"
              :duration="400" 
              target="_blank"
              class="h-34px font-semibold text-primary rounded-full px-5 text-sm leading-6 flex-center duration-200"
            >
              {{ pubDateFormat }}
            </div> 
          </div> 
        </div>
      </div>
    </section>

    <section>
      <div class="w-full mx-auto ">
        <a-form 
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="500"
          :duration="400"
          size="small" 
          :model="form" 
          layout="inline" 
          class="flex-cc my-2"
        >
          <a-form-item field="language" :label="t(lang, 'language')" label-col-flex="80px">
            <a-select class="w-auto!" v-model="form.language" allow-search :bordered="false">
              <a-option v-for="item of languages" :key="item.value" :value="item.value">{{item.label}}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="since" :label="t(lang, 'since')" label-col-flex="80px">
            <a-select class="w-auto!" v-model="form.since" :bordered="false">
              <a-option value="daily">{{ t(lang, 'today') }}</a-option>
              <a-option value="weekly">{{ t(lang, 'thisWeek') }}</a-option>
              <a-option value="monthly">{{ t(lang, 'thisMonth') }}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="cdn" :label="t(lang, 'cdn')" label-col-flex="80px">
            <a-select class="w-auto!" v-model="form.cdn" :bordered="false">
              <a-option value="github">GitHub</a-option>
              <a-option value="jsdelivr">jsDelivr</a-option>
              <a-option value="other">Other</a-option>
            </a-select>
          </a-form-item>
        </a-form>

        <div class="w-full flex-cc flex-col mt-4">
          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="550"
            :duration="400"
            class="items-center justify-center max-w-1000px w-100% h-11 font-medium rounded-xl inline-flex duration-200 lg:w-auto px-2 py-3 text-center text-[var(--vp-c-text-1)]! w-full border-2 border-solid border-[var(--vp-c-gray-soft)] no-underline!"
            uno-hover="text-primary! border-primary"
          >
            <div class="border-r-width-3 border-r-solid border-r-[var(--vp-c-gray-soft)] pl-1 pr-2">JSON API</div>
            <div class="flex-1 truncate mx-2">{{jsonAPI}}</div>
            <div class="w-8 h-8 flex-cc bg-[var(--vp-c-gray-soft)] rounded-2.3 cursor-pointer" uno-hover="bg-primary text-[var(--vp-c-neutral-inverse)]" @click="jsonCopy(jsonAPI)">
              <icon-solar-copy-outline class="text-14px" v-if="!jsonCopied" />
              <icon-lucide-check class="text-14px" v-else />
            </div>
          </div> 
          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="600"
            :duration="400"
            class="mt-4 items-center justify-center max-w-1000px w-100% h-11 font-medium rounded-xl inline-flex duration-200 lg:w-auto px-2 py-3 text-center text-[var(--vp-c-text-1)]! w-full border-2 border-solid border-[var(--vp-c-gray-soft)] no-underline!"
            uno-hover="text-primary! border-primary"
          >
            <div class="border-r-width-3 border-r-solid border-r-[var(--vp-c-gray-soft)] pl-1 pr-2"> RSS API </div>
            <div class="flex-1 truncate mx-2">{{rssAPI}}</div>
            <div class="w-8 h-8 flex-cc bg-[var(--vp-c-gray-soft)] rounded-2.3 cursor-pointer" uno-hover="bg-primary text-[var(--vp-c-neutral-inverse)]" @click="rssCopy(rssAPI)">
              <icon-solar-copy-outline class="text-14px" v-if="!rssCopied" />
              <icon-lucide-check class="text-14px" v-else />
            </div>
          </div> 
        </div>
        
        <div 
          v-if="!itemLoading"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="700"
          :duration="400"
          class="w-full mt-8 border-1 border-solid border-[var(--vp-c-gray-soft)] rounded-lg"
        >
          <CustomGithubTrendingItem class="border-b-1 border-b-solid border-b-[var(--vp-c-gray-soft)]" v-for="item of json.items" :key="item.url" :data="item" :since="form.since" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.custom-home{
  width: 100%;
}


@media screen and (min-width: 640px) and (max-width: 960px) {
  .custom-home-banner__top-image{
    width: 280px;
  }
}

@media screen and (max-width: 640px) {
  .custom-home-banner__top-image{
    width: 200px;
  }
}
</style>