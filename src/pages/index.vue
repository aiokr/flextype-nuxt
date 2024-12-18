<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const isMore = ref(false)

watch(user, () => {
  if (user.value) {
    console.log(user.value)
  }
}, { immediate: true })

const signOut = async () => {
  supabase.auth.signOut()
  navigateTo('/login')
}

</script>

<template>
  <div>
    <a-descriptions title="User Info">
      <a-descriptions-item label="ID" span=3>{{ user?.id }}</a-descriptions-item>
      <a-descriptions-item label="UserName">{{ user?.user_metadata?.full_name }}</a-descriptions-item>
      <a-descriptions-item label="Email">{{ user?.email }}</a-descriptions-item>
    </a-descriptions>
    <br />
    <a-button @click="isMore = !isMore">Learn more</a-button>
    <p v-show="isMore">
      {{ user }}
    </p>
    <div class="pt-6">
      <a-button danger @click="signOut">Sign Out</a-button>
    </div>
  </div>
</template>