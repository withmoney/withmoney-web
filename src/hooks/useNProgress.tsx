import { useEffect } from 'react';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

const UseNProgress = (loading: boolean) => {
  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);
};

export default UseNProgress;
