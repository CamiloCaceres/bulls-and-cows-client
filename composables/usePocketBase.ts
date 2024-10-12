import PocketBase from 'pocketbase'
import { ref } from 'vue'

export const usePocketBase = () => {
  const pb = new PocketBase(useRuntimeConfig().public.pocketbaseUrl) 
  const currentUser = ref(pb.authStore.model)

  pb.authStore.onChange((auth: any) => {
    currentUser.value = pb.authStore.model
  })

  return { pb, currentUser }
}