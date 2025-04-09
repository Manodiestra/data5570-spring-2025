import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, Button, Card } from 'react-native-paper';
import { signInWithCognito } from '@/utils/authRedirect';

export default function SignInScreen() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signInWithCognito();
    if (result.type === 'success') {
      const url = new URL(result.url);
      const code = url.searchParams.get('code');
      if (code) {
        // exchange code for tokens
        // store tokens in Redux or SecureStore
        router.push('/SubmitForm');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Image 
            source={require('../assets/images/react-logo.png')}  // Adjust path as needed
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="headlineLarge" style={styles.title}>Welcome</Text>
          <Button mode="contained" onPress={handleSignIn}>
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
