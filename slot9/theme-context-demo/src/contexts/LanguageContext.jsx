import { createContext, useContext, useState, useMemo, useCallback } from 'react';

export const translations = {
  vi: {
    appTitle: 'Hệ thống Đa ngôn ngữ (i18n)',
    subtitle: 'Chuyển đổi ngôn ngữ tức thì xuyên suốt cây component không qua props',
    navHome: 'Trang chủ',
    navFeatures: 'Tính năng',
    navAbout: 'Giới thiệu',
    navContact: 'Liên hệ',
    welcomeHeader: 'Chào mừng bạn đến với FER202 ReactJS!',
    welcomeBody: 'React Context API giúp chia sẻ thông tin ngôn ngữ (i18n) cho mọi component con mà không cần prop drilling.',
    btnSwitch: 'Chuyển sang English',
    currentLang: 'Ngôn ngữ đang chọn:',
    feature1Title: 'Tối ưu Re-render',
    feature1Desc: 'useMemo và useCallback đảm bảo hàm dịch t() không tạo mới vô cớ.',
    feature2Title: 'Dễ dàng mở rộng',
    feature2Desc: 'Thêm ngôn ngữ mới đơn giản bằng cách bổ sung key vào từ điển translations.',
    footerText: 'Bản quyền © 2026 Đại học FPT - Môn học FER202',
  },
  en: {
    appTitle: 'Internationalization System (i18n)',
    subtitle: 'Instant multilingual switching across the component tree without prop drilling',
    navHome: 'Home',
    navFeatures: 'Features',
    navAbout: 'About Us',
    navContact: 'Contact',
    welcomeHeader: 'Welcome to FER202 ReactJS Course!',
    welcomeBody: 'React Context API enables sharing language information (i18n) to all subtree components without manual prop passing.',
    btnSwitch: 'Switch to Tiếng Việt',
    currentLang: 'Current Language:',
    feature1Title: 'Optimized Re-render',
    feature1Desc: 'useMemo and useCallback guarantee stable references for translation function t().',
    feature2Title: 'Easily Extensible',
    feature2Desc: 'Adding new languages is as simple as inserting new dictionary keys.',
    footerText: 'Copyright © 2026 FPT University - FER202 Course',
  },
};

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('vi');

  const switchLang = useCallback((newLang) => {
    if (newLang) {
      setLang(newLang);
    } else {
      setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
    }
  }, []);

  const t = useCallback(
    (key) => {
      const currentDict = translations[lang] || translations.vi;
      return currentDict[key] || key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      t,
      switchLang,
    }),
    [lang, t, switchLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage phai duoc su dung ben trong <LanguageProvider>');
  }
  return context;
}
