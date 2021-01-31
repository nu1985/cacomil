import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              TabThreeScreen: 'three',
            },
          },
          TabLogin: {
            screens: {
              TabLoginScreen: 'login',
            },
          },
          TabSignup: {
            screens: {
              TabSignupScreen: 'signup',
            },
          },

        },
      },
      NotFound: '*',
    },
  },
};
