interface LoginSuccessData {
  token: string;
  user: {
    username: string;
  };
}

interface ElectronAPI {
  send: (channel: 'login-success', data: LoginSuccessData) => void;
  receive: (channel: string, func: (data: any) => void) => void;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
} 