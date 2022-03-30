import Cookie from 'universal-cookie'
import firebase from '../firebaseConfig'
import { unSubMeta } from './useUserChanged'
import { useQueryClient, QueryClient } from 'react-query'
import { useDispatch } from 'react-redux'

import { resetEditedTask, resetEditedNews } from '../slices/uiSlice'

const cookie = new Cookie()

export const useLogout = () => {
  const dispatch = useDispatch()
  const QueryClient = useQueryClient()
  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    dispatch(resetEditedNews())
    dispatch(resetEditedTask())
    await firebase.auth().signOut()
    QueryClient.removeQueries('tasks')
    QueryClient.removeQueries('news')
    cookie.remove('token')
  }

  return { logout }
}
