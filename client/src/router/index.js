/*
 * @Description:
 * @Author: Danylko
 * @Date: 2024-06-29 12:28:39
 * @LastEditTime: 2024-07-06 13:41:48
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/about/index.vue')
  }
]

// const pages = import.meta.glob('../pages/**/page.js', {
// 	eager: true,
// 	import: 'default'
// })
// console.log("pages", pages)
// const pageComps = import.meta.glob('../pages/**/index.vue')

// const initObj = (path, meta) => {
// 	const pageJsPath = path;
// 	path = path.replace('../pages', '').replace('/page.js', '')
// 	const name = path.split('/').filter(Boolean).join('-')
// 	if (name == 'home') {
// 		path = '/'
// 	}
// 	const pageCom = pageJsPath.replace('page.js', 'index.vue')
// 	const value = {
// 		path,
// 		name,
// 		component: pageComps[pageCom],
// 		meta,
// 	}
// 	if (meta.isChild) {
// 		value.children = []
// 	}
// 	return value
// }
// //创建map对象
// const sortPages = new Map()
// //根据index排序
// const sortKey = Object.keys(pages).sort((a, b) => pages[a].inex - pages[b].index)
// console.log("so", sortKey)
// sortKey.forEach(key => {
// 	sortPages.set(key, pages[key])
// })

// const routes = [];
// for (let [path, meta] of sortPages.entries()) {
// 	// 第一层路由
// 	if (meta.index == 0) {
// 		routes.push(initObj(path, meta))
// 	}
// 	// 第二层路由先获取上层节点
// 	if (meta.index == 1) {
// 		const parentIndex = routes.findIndex(item => item.path == meta.parent)
// 		if (parentIndex != -1) {
// 			routes[parentIndex].children.push(initObj(path, meta))
// 		}
// 	}
// 	if (meta.index == 2) {
// 		const page = pages[`../pages${meta.parnet}/page.js`]
// 		const oneParentIndex = routes.findIndex(item => item.path == page.parent)
// 		const twoParentIndex = routes[oneParentIndex].children.findIndex((item) => item.path == meta.parent)
// 		if (twoParentIndex != -1) {
// 			routes[oneParentIndex].children[twoParentIndex].children.push(initObj(path, meta))
// 		}
// 	}
// }
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
