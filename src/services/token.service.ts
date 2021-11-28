import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  static async getRefreshToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('@refreshToken');
      return token;
    } catch (err) {
      return null;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('@accessToken');
      return token;
    } catch (err) {
      return null;
    }
  }

  static async updateTokens({
    refreshToken,
    accessToken,
  }: {
    refreshToken?: string;
    accessToken?: string;
  }): Promise<void> {
    if (refreshToken) {
      await AsyncStorage.setItem('@refreshToken', refreshToken);
    }
    if (accessToken) {
      await AsyncStorage.setItem('@accessToken', accessToken);
    }
  }

  static async clearTokens(): Promise<void> {
    await AsyncStorage.multiRemove(['@refreshToken', '@accessToken']);
  }
}

export default TokenService;
