import path from 'path'
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress'
import UnoCSS from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// import {
//   ArcoResolver
// } from 'unplugin-vue-components/resolvers'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (dir) => dir ? path.resolve(__dirname, '../', dir) : __dirname

export default defineConfig({
  lang: 'en',
  locales: {
    root: {
      label: 'English',
      lang: 'en', 
      title: "GTA",
      description: "GitHub trending data for developers and rss subscribers",
      link: '/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide' }
        ],
        sidebar: [
          {
            text: 'Docs',
            items: [
              { text: 'Guide', link: '/guide' }
            ]
          }
        ],
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh', 
      title: "GTA",
      description: "面向开发人员和 RSS 订阅者的 Github 趋势数据",
      link: '/zh',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide' }
        ],
        sidebar: [
          {
            text: '文档',
            items: [
              { text: ' 指南', link: '/zh/guide' }
            ]
          }
        ],
      }
    }
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/isboyjc/github-trending-api' }
    ]
  },

  markdown: {
    lineNumbers: true,
  },

  vite: {
    plugins: [
      Components({
        // dirs 指定自动引入组件所在目录位置
        dirs: [resolve('.vitepress/theme/components')],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          // ArcoResolver({
          //   sideEffect: true
          // }),
          IconsResolver({
            prefix: 'icon',
          })
        ]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      }),
      UnoCSS({
        shortcuts: {
          'flex-cc': 'flex justify-center items-center',
          'flex-jc': 'flex justify-center',
          'flex-ic': 'flex items-center'
        },
        presets: [
          presetUno(), 
          presetAttributify({
            prefix: 'uno-',
            prefixedOnly: true, // <--
          })
        ],
        theme: {
          colors: {
            primary: 'var(--vp-c-indigo-1)',
          },
          fontFamily: {
            mono: 'var(--vt-font-family-mono)',
          },
        },
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ],
      })
    ],
    build:{
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    }
  },

  async buildEnd(siteConfig) {
    // console.log(siteConfig)
    // TODO RSS订阅
  },
})
