<<<<<<< Updated upstream
import Image from "next/image";
=======
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface ProfileData {
  name: string
  email: string
  role: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    role: '',
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [passwordMessage, setPasswordMessage] = useState<string>('')

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        setProfile({
          name: (user.user_metadata?.full_name as string) || '',
          email: user.email || '',
          role: (user.user_metadata?.role as string) || 'student',
        })
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  const handleUpdateProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      email: profile.email,
      data: { full_name: profile.name },
    })

    if (error) alert('Failed to update profile: ' + error.message)
    else alert('Profile updated successfully!')
  }

  const handleChangePassword = async () => {
    setPasswordMessage('')
    const { data: sessionData } = await supabase.auth.getSession()
    const session = sessionData?.session

    if (!session || !session.user.email) {
      setPasswordMessage('User not authenticated')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password: oldPassword,
    })

    if (signInError) {
      setPasswordMessage('Current password is incorrect. Try again.')
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      setPasswordMessage('Failed to update password: ' + updateError.message)
    } else {
      setPasswordMessage('Password updated successfully!')
      setOldPassword('')
      setNewPassword('')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>
>>>>>>> Stashed changes

export default function Home() {
  return (
<<<<<<< Updated upstream
    <div>
      <p className="mx-auto w-fit text-center">Contact Us</p>
    </div>
  );
}
=======
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1f24] to-[#2a2b31] px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-2xl w-full max-w-xl space-y-6">
        <h2 className="text-3xl font-bold text-purple-400 text-center">Profile Settings</h2>

        <div className="space-y-4">
          <h4 className="text-small font-bold text-purple-400 text-left">Profile Information</h4>
          <input
            type="text"
            value={profile.name}
            placeholder="Full Name"
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            value={profile.email}
            placeholder="Email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
          >
            Update Info
          </button>
        </div>

        <div className="space-y-1">
          <h4 className="text-small font-bold text-purple-400 text-left">Role</h4>
          <input
            type="text"
            value={profile.role}
            disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-gray-400 cursor-not-allowed"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-small font-bold text-purple-400 text-left">Password</h4>
          <input
            type="password"
            value={oldPassword}
            placeholder="Current Password"
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleChangePassword}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
          >
            Change Password
          </button>
          {passwordMessage && <p className="text-sm text-red-400 text-center">{passwordMessage}</p>}
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
>>>>>>> Stashed changes
