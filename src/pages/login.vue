<script setup lang="ts">
import { h } from 'vue';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons-vue'

definePageMeta({
  layout: 'white-board'
})

const supabase = useSupabaseClient()
const { auth } = useSupabaseClient()
const email = ref('')
const password = ref('')
const emailSending = ref(false) // Is Email Sending
const otpSent = ref(false) // Is OTP Email Sent Successfully
const errorInfo = ref('') // Error Message

const redirectTo = `http://localhost:3000/confirm`

const signInWithEmail = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log(error)
    errorInfo.value = error.message
  } else {
    navigateTo('/')
  }
}

const signInWithOtp = async () => {
  emailSending.value = true
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: '/confirm',
    }
  })
  if (error) {
    console.log(error)
    errorInfo.value = error.message
    otpSent.value = false
    emailSending.value = false
  }
  else {
    otpSent.value = true
    emailSending.value = false
  }
}

</script>

<template>
  <div class="w-screen h-screen flex items-center bg-white md:bg-[#222831ef]">
    <img alt="logo" loading="lazy" width="600" height="600" decoding="async" data-nimg="1"
      class="hidden md:block md:fixed w-screen h-screen object-cover -z-10" style="color:transparent"
      src="https://images.unsplash.com/photo-1612962280801-05d09bb6244c?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
    <div class="md:grid md:grid-cols-2 md:shadow-2xl w-full md:w-[800px] lg:w-[1000px] min-h-[600px] mx-auto">
      <div class="hidden p-6 md:p-12 lg:p-16 md:block bg-main">
        <div class="flex flex-col h-full gap-2 text-white font-bold text-3xl justify-center"><span>The Next
            Way</span><span>To Show Yourself.</span></div>
      </div>
      <div class="min-h-[400px] flex flex-col justify-start p-6 md:p-12 lg:p-16 bg-white">
        <div class="flex items-center gap-2 w-full pb-8">
          <span class="text-xl font-bold">FlexType</span>
        </div>
        <!--Login Form-->
        <div class="flex flex-col items-start justify-center gap-3">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
          <input id="email" v-model="email" type="email"
            class="text-sm leading-5 w-full py-2 px-3 border-2 text-slate-500 rounded" name="email">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password:</label>
          <input id="password" v-model="password" type="password"
            class="text-sm leading-5 w-full py-2 px-3 border-2 text-slate-500 rounded" name="password">
          <button @click="signInWithEmail"
            class="text-sm text-center leading-5 w-full py-2 text-white bg-main font-bold rounded hover:shadow-lg transition-all">
            Login
          </button>
          <div v-if="otpSent" class="flex gap-2 pt-6">
            <span>OTP Email is sent to your email box, please check your email.</span>
          </div>
          <div v-if="errorInfo" class="flex gap-2 pt-6 text-red-400">
            <span>{{ errorInfo }}</span>
          </div>
        </div>
        <!--SSO-->
        <div class="mt-6 flex flex-row gap-4">
          <!--
          <button class="aspect-square rounded-full w-9 h-9 flex items-center justify-center bg-main text-white text-xl"
            @click="signInWithGoogle">
            <GoogleOutlined />
          </button>
          -->
          <button class="aspect-square rounded-full w-9 h-9 flex items-center justify-center bg-main text-white text-xl"
            @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })">
            <GithubOutlined />
          </button>
        </div>
      </div>
    </div>
  </div>

</template>