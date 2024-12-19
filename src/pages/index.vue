<script setup lang="ts">
import { message } from 'ant-design-vue';

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

const unlinkIdentity = async (item: any) => {
  console.log(item)
  const identity = item
  const { data, error } = await supabase.auth.unlinkIdentity(identity)
  if (error) {
    console.log(error)
  } else {
    // console.log(data)
    message.info('Unlink Success')
    supabase.auth.refreshSession()
  }
}

const linkGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  if (error) {
    console.log(error)
  } else {
    // console.log(data)
  }
}

const linkGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) {
    console.log(error)
  } else {
    // console.log(data)
  }
}

</script>

<template>
  <div>
    <a-descriptions title="User Info">
      <a-descriptions-item label="ID" :span="3">{{ user?.id }}</a-descriptions-item>
      <a-descriptions-item label="UserName">{{ user?.user_metadata?.full_name }}</a-descriptions-item>
      <a-descriptions-item label="Email">{{ user?.email }}</a-descriptions-item>
    </a-descriptions>

    <a-list>
      <a-list-item>
        <div>
          Github:
          <span v-if="user.identities.find((item: any) => item.provider === 'github')">{{ user.identities.find((item:
            any) => item.provider === 'github')?.email }}</span>
          <span v-else>Not Linked</span>
        </div>
        <a-button v-if="user.identities.find((item: any) => item.provider === 'github')" danger
          @click="unlinkIdentity(user.identities.find((item: any) => item.provider === 'github'))">Disconnect</a-button>
        <a-button v-else @click="linkGithub">Link Github</a-button>
      </a-list-item>
      <a-list-item>
        <div>
          Google:
          <span v-if="user.identities.find((item: any) => item.provider === 'google')">{{ user.identities.find((item:
            any) => item.provider === 'google')?.email }}</span>
          <span v-else>Not Linked</span>
        </div>
        <a-button v-if="user.identities.find((item: any) => item.provider === 'google')" danger
          @click="unlinkIdentity(user.identities.find((item: any) => item.provider === 'google'))">Disconnect</a-button>
        <a-button v-else @click="linkGoogle">Link Google</a-button>
      </a-list-item>
    </a-list>
    <div class="mt-2">
      <a-button danger @click="signOut">Sign Out</a-button>
    </div>
  </div>
</template>