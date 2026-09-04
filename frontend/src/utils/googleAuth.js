// Singleton Google Identity Services (GIS) Helper
let isGisInitialized = false;
let activeCallback = null;
let initializedClientId = null;

export const getGoogleClientId = () => {
  const envId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const rawId = envId && envId !== 'undefined' ? envId : '345697345656-b68bmovejdumqoqob0mbfeo5sh6i6ug8.apps.googleusercontent.com';
  return rawId.trim().replace(/^["']|["']$/g, '');
};

export const initGoogleIdService = (onSuccessCallback) => {
  if (onSuccessCallback) {
    activeCallback = onSuccessCallback;
  }

  const handleCredentialResponse = (response) => {
    if (activeCallback) {
      activeCallback(response);
    }
  };

  const setupGis = () => {
    const clientId = getGoogleClientId();
    if (window.google?.accounts?.id) {
      if (!isGisInitialized || initializedClientId !== clientId) {
        isGisInitialized = true;
        initializedClientId = clientId;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          itp_support: true,
          ux_mode: 'popup',
          use_fedcm_for_prompt: true,
        });
      }
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
