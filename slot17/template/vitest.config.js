import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/** Cấu hình kiểm thử – CÓ SẴN, KHÔNG sửa file này */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.{js,jsx}'],
    env: { VITE_API_URL: 'http://localhost:3001' },
    testTimeout: 10000,
  },
});
