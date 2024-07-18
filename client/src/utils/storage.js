/*
 * @Description: 主题存储
 * @Author: Danylko
 * @Date: 2024-07-18 16:38:20
 * @LastEditTime: 2024-07-18 17:22:20
 */

const THEME_KEY = 'theme'
export const storeTheme = (item) => {
  localStorage.setItem(THEME_KEY, item)
}

export const getTheme = () => {
  return localStorage.getItem(THEME_KEY)
}

export const removeTheme = () => {
  localStorage.removeItem(THEME_KEY)
}
