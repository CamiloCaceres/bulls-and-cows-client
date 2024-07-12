<template>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <UButton to="/" size="sm" variant="link" label="Bulls and Cows" />
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <UButton to="/tutorial" size="sm" variant="link" label="Tutorial" />
            <UButton to="/leaderboard" size="sm" variant="link" label="Leaderboard" />
            <UButton to="/play" size="sm" color="primary" label="Play" />
            <UButton icon="i-heroicons-user-circle-solid" size="sm" variant="link" />
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { UButton } from '#components';
  </script>