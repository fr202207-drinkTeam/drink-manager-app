import { useEffect } from 'react';

const ScrollTop = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollTo' in window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return null;
};

export default ScrollTop;





