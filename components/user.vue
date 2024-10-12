<script setup lang="ts">

const { pb, currentUser } = usePocketBase();

function signOut() {
  pb.authStore.clear();
}
</script>

<template>
  <UPopover v-if="currentUser">
    <UButton class="capitalize" variant="link">{{ currentUser.username }}</UButton>

    <template #panel>
      <div class="py-6 px-10 flex flex-col space-y-4 items-start">

        <div class="flex flex-col">
          <h2 class="text-lg font-semibold">{{ currentUser.username }}</h2>
          <h3 class="text-sm dark:text-gray-400">{{ currentUser.email }}</h3>
          <div class="w-full h-1 border-t mt-2"></div>
        </div>
        <div class="flex flex-col space-y-1">
          <NuxtLink :to="`/users/${currentUser.id}`" class="text-sm underline text-primary underline-offset-2"
            >My blueprints</NuxtLink
          >
          <NuxtLink to="/collections/my-collections" class="text-sm underline text-primary underline-offset-2"
            >My collections</NuxtLink
          >
        </div>
        <UButton
          variant="outline"
          color="amber"
          @click="signOut"
          v-if="currentUser"
          size="lg"
          >Logout</UButton
        >
      </div>
    </template>
  </UPopover>
  <UButton v-else @click="() => $router.push('/login')">Login</UButton>
</template>