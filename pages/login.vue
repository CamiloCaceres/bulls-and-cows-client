<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { usePocketBase } from '@/composables/usePocketBase'

const { pb } = usePocketBase()
const router = useRouter();
const isLoading = ref(false)
const loginError = ref(false)

watch(loginError, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      loginError.value = false
    }, 5000)
  }
})

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  try {
    await pb.collection("users").authWithPassword(event.data.email, event.data.password);
    router.push('/')
  } catch (err) {
    console.error("Login failed:", err);
    loginError.value = true
    isLoading. value = false
  }
}


</script>

<template>
  <UCard class="max-w-sm mt-10 mx-auto">
    <template #header>
      <h1 class="">Login</h1>
    </template>
    
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <p class="text-red-500 " v-if="loginError">Login failed, please try again.</p>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <template #hint>
          <NuxtLink class="underline cursor-pointer" to="">Forgot password?</NuxtLink>
        </template>
        <UInput v-model="state.password" type="password" icon="i-heroicons-key" />
      </UFormGroup>

      <UButton class="dark:text-gray-200" :loading="isLoading" type="submit" block>
        Login
      </UButton>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

    </UForm>
    <p class="text-center text-sm my-2">
      Don't have an account?
      <NuxtLink class="underline cursor-pointer" to="/register">Sign up</NuxtLink>
    </p>
  </UCard>
</template>