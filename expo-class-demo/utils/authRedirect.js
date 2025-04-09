import * as WebBrowser from 'expo-web-browser';

const REGION = process.env.EXPO_PUBLIC_COGNITO_REGION;
const USER_POOL_DOMAIN = process.env.EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN;
const CLIENT_ID = process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:8081';

export const signInWithCognito = async () => {
  console.log('ENV VARS', REGION, USER_POOL_DOMAIN, CLIENT_ID);
  const url = `${USER_POOL_DOMAIN}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=email+openid+profile`;
  console.log('FULL URL', url);
  // Mobile: use WebBrowser.openAuthSessionAsync
  const result = await WebBrowser.openAuthSessionAsync(url, REDIRECT_URI);
  return result;
};
