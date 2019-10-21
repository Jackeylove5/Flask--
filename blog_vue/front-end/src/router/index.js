import Vue from 'vue'
import Router from 'vue-router'
import Ping from '@/components/Ping'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from "../components/Register"
import Profile from '@/components/Profile'
import EditProfile from '@/components/EditProfile'
import Post from '@/components/Post'
import store from "../store"

import User from '@/components/Profile/User'
import Overview from '@/components/Profile/Overview'
import Followers from '@/components/Profile/Followers'
import Following from '@/components/Profile/Following'
import Posts from '@/components/Profile/Posts'

Vue.use(Router)

const router = new Router({
  mode:'history',    //去掉url中多余的#锚点
  routes:[
    {
      path :"/",
      name:'Home',
      component:Home,
    },
    {
    path: '/ping',
      name: "/Ping",
      component: Ping
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path:"/register",
      name:"Register",
      component:Register,
    },
    {
      path:"/login",
      name:"Login",
      component:Login,
    },
    {
      path :"/profile",
      name:'Profile',
      component:Profile,
      meta:{
        requiresAuth:true
      }
    },
    // {
    //   path: '/user/:id',    //后端接口定义规则
    //   name: 'Profile',
    //   component: Profile,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path:"/user/:id",
      name:"User",
      component:User,
      children: [
        { path: '', component: Overview },
        { path: 'overview', name: 'UserOverview', component: Overview },
        { path: 'followers', name: 'UserFollowers', component:Followers},
        { path: 'following', name: 'UserFollowing', component: Following },
        { path: 'posts', name: 'UserPosts', component: Posts }
      ],
      meta: {
        requiresAuth: true
      }

    },
    {
      // 用户修改自己的个人信息
      path: '/edit-profile',
      name: 'SettingProfile',
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:id',
      // name: 'User',
      component: User,
      children: [
        // Overview will be rendered inside User's <router-view>
        // when /user/:id is matched
        // 注意： 要有默认子路由，父路由不能指定 name
        { path: '', component: Overview },
        { path: 'overview', name: 'UserOverview', component: Overview },

        // Followers will be rendered inside User's <router-view>
        // when /user/:id/followers is matched
        { path: 'followers', name: 'UserFollowers', component: Followers },

        // Following will be rendered inside User's <router-view>
        // when /user/:id/following is matched
        { path: 'following', name: 'UserFollowing', component: Following },

        { path: 'posts', name: 'UserPosts', component: Posts }
      ],
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('blog-token')
  if (to.matched.some(record=>record.meta.requiresAuth)&&(!token || token === null)){
        Vue.toasted.show('Please log in to access this page.', { icon: 'fingerprint' })
    next(
      {
        path:'/login',
        query:{redirect:to.fullPath}
      })
  }else if (token && to.name == 'Login'){
    next({
      path:from.fullPath
    })
  }else if (to.matched.length === 0) {  // 要前往的路由不存在时
    console.log('here')
    console.log(to.matched)
    Vue.toasted.error('404: NOT FOUND', {icon: 'fingerprint'})
    if (from.name) {
      next({
        name: from.name
      })
    } else {
      next({
        path: '/'
      })
    }
  }else {
    next()
  }
})

export default router
