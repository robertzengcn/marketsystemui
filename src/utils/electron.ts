import type { LoginSuccessData } from '@/types/electron'

export const isElectron = () => {
  return !!(window.electron)
}

export const sendToElectron = (data: LoginSuccessData) => {
  if (isElectron()) {
    window.electron?.send('login-success', data)
  }
} 