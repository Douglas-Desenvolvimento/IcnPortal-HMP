import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    react()
  ],
  server: {
    host: 'ilabconnect',
    https: {
      key: path.resolve(__dirname, 'cert/private-key.pem'),
      cert: path.resolve(__dirname, 'cert/cert.pem')
    },
    proxy: {

      '/trust': {
        target: 'https://213.163.247.230:8000/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/trust/, '/prove/cases/tscore'),
      },
      '/activity': {
        target: 'https://213.163.247.230:3093/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/activity/, '/event/activity'),
      },
      '/sign': {
        target: 'https://213.163.247.230:3093/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/sign/, '/auth/signin'),
      },
      '/profile': {
        target: 'https://213.163.247.230:3093/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/profile/, '/auth/profile'),
      },
      '/metrics': {
        target: 'https://213.163.247.230:3093/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/metrics/, '/event/metrics'),
      },
      '/verify': {
        target: 'https://213.163.247.230:8000/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/verify/, '/prove/cases/verify'),
      },
      '/jcalist': {
        target: 'https://213.163.247.230:3093/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/jcalist/, '/finding/list'),
      },
      '/cadsearch': {
        target: 'https://213.163.247.230:3093/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/cadsearch/, '/cad/search'),
      }
    },
  }
})
