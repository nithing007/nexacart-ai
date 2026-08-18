// Singleton Google Identity Services (GIS) Helper
let isGisInitialized = false;
let activeCallback = null;

export const getGoogleClientId = () => {
  return (import.meta.env.VITE_GOOGLE_CLIENT_ID || '345697345656-b68bmovejdumqoqob0mbfeo5sh6i6ug8.apps.googleusercontent.com').trim();
};

export const initGoogleIdService = (onSuccessCallback) => {
  activeCallback = onSuccessCallback;

  const handleCredentialResponse = (response) => {
    if (activeCallback) {
      activeCallback(response);
    }
  };

  const setupGis = () => {
    if (window.google?.accounts?.id && !isGisInitialized) {
      isGisInitialized = true;
      window.google.accounts.id.initialize({
        client_id: getGoogleClientId(),
        callback: handleCredentialResponse,
        auto_select: false,
      });
    }
  };

  if (window.google?.accounts?.id) {
    setupGis();
  } else {
    let script = document.getElementById('google-gis-script');
    if (!script) {
      script = document.createElement('script');
      script.id = 'google-gis-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = setupGis;
      document.body.appendChild(script);
    }
  }
};

export const renderGoogleButton = (containerElement, options = {}) => {
  if (!containerElement) return;

  const defaultOptions = {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'signin_with',
    shape: 'pill',
    logo_alignment: 'left',
    width: 280,
    ...options,
  };

  const attemptRender = () => {
    if (window.google?.accounts?.id && containerElement) {
      containerElement.innerHTML = ''; // Clear prior renders
      window.google.accounts.id.renderButton(containerElement, defaultOptions);
    } else {
      setTimeout(attemptRender, 100);
    }
  };

  attemptRender();
};

export const triggerGoogleAuth = (onSuccessCallback, dispatch, googleLoginAsync, navigate) => {
  const clientId = getGoogleClientId();

  if (window.google?.accounts?.id) {
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        if (window.google?.accounts?.oauth2) {
          const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'openid profile email',
            callback: (tokenResponse) => {
              if (tokenResponse && tokenResponse.access_token) {
                dispatch(googleLoginAsync({ accessToken: tokenResponse.access_token }))
                  .unwrap()
                  .then((data) => {
                    if (data?.user?.role === 'admin') {
                      navigate('/admin', { replace: true });
                    } else {
                      navigate('/', { replace: true });
                    }
                  });
              }
            },
          });
          tokenClient.requestAccessToken({ prompt: 'select_account' });
        }
      }
    });
  } else if (window.google?.accounts?.oauth2) {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid profile email',
      callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          dispatch(googleLoginAsync({ accessToken: tokenResponse.access_token }))
            .unwrap()
            .then((data) => {
              if (data?.user?.role === 'admin') {
                navigate('/admin', { replace: true });
              } else {
                navigate('/', { replace: true });
              }
            });
        }
      },
    });
    tokenClient.requestAccessToken({ prompt: 'select_account' });
  }
};
