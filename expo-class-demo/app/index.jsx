import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Button, Card } from 'react-native-paper';
import { useAuthRequest, exchangeCodeAsync, ResponseType } from 'expo-auth-session';
import { useDispatch } from 'react-redux';
import { getTokensFromSecureStore, saveTokensSecurely, storeTokens } from '@/state/slices/authSlice';

const discoveryDocument = {
  authorizationEndpoint: `${process.env.EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN}/oauth2/authorize`,
  tokenEndpoint: `${process.env.EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN}/oauth2/token`,
  revocationEndpoint: `${process.env.EXPO_PUBLIC_COGNITO_USER_POOL_DOMAIN}/oauth2/revoke`,
};

const requestConfig = {
  clientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID,
  responseType: ResponseType.Code,
  redirectUri: 'http://localhost:8081', // match your callback URI
  usePKCE: true,
};

export default function SignInScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [request, response, promptAsync] = useAuthRequest(requestConfig, discoveryDocument);

  useEffect(() => {
    const restoreSession = async () => {
      const tokens = await getTokensFromSecureStore();
      if (tokens) {
        dispatch(storeTokens(tokens));
        console.log('Bro, this bro is already legitamate. Let him in.')
        router.push('/SubmitForm');
      }
    };
    restoreSession();
  }, []);
  

  useEffect(() => {
    const fetchTokens = async () => {
      if (response?.type === 'success' && response.params.code) {
        try {
          const tokenResponse = await exchangeCodeAsync(
            {
              clientId: requestConfig.clientId,
              code: response.params.code,
              redirectUri: requestConfig.redirectUri,
              extraParams: {
                code_verifier: request.codeVerifier,
              },
            },
            discoveryDocument
          );
          const { accessToken, idToken, refreshToken, expiresIn } = tokenResponse;
          dispatch(storeTokens({ accessToken, idToken, refreshToken, expiresIn }));
          await saveTokensSecurely({ accessToken, idToken, refreshToken, expiresIn });
          router.push('/SubmitForm');
        } catch (err) {
          console.error('Token exchange failed:', err);
        }
      }
    };

    if (response) {
      fetchTokens();
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="headlineLarge" style={styles.title}>Welcome</Text>
          <Button mode="contained" onPress={() => promptAsync()}>
            Sign In
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  card: {
    padding: 20,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
});
