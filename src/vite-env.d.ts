import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Builder-flare-realm/', // ⚠️ ضروري مطابق لاسم المستودع تمامًا
  plugins: [react()],
});

