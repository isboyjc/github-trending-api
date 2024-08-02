import en from './en.mjs'
import zh from './zh.mjs'

const hash = {
  en,zh
}

export function t(loacle, key){
  return hash[loacle][key] || ''
}

export function routerPath(locale, path){
  return (locale == 'zh' ? '/zh' : '') + path
}