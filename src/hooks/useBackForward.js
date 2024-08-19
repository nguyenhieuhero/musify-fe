import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function useBackForward() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  useEffect(() => {
    const checkHistory = () => {
      setCanGoBack(window.history.state?.idx > 0);
      setCanGoForward(window.history.state?.idx < window.history.length - 1);
    };

    checkHistory();
    window.addEventListener('popstate', checkHistory);

    return () => {
      window.removeEventListener('popstate', checkHistory);
    };
  }, []);

  const navigate = useNavigate();
  const goBack = canGoBack ? () => navigate(-1) : null;
  const goForward = canGoForward ? () => navigate(1) : null;
  return { goBack, goForward, canGoBack, canGoForward };
}

export default useBackForward;
