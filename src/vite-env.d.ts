import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Builder-flare-realm/', // ⚠️ هذا هو اسم المستودع على GitHub
  plugins: [react()],
});
