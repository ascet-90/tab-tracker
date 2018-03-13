import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/songs',
      name: 'Songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'Songs-Create',
      component: CreateSong
    },
    {
      path: '/songs/:id/edit',
      name: 'Edit-Song',
      component: EditSong
    },
    {
      path: '/songs/:id',
      name: 'Song',
      component: ViewSong
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ],
  mode: 'history'
})
