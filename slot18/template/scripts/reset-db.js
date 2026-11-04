// Khôi phục db.json về dữ liệu gốc: npm run reset-db (sau đó chạy lại npm start)
import { copyFileSync } from 'node:fs';

copyFileSync(new URL('../db.backup.json', import.meta.url), new URL('../db.json', import.meta.url));
console.log('✔ Đã khôi phục db.json từ db.backup.json');
