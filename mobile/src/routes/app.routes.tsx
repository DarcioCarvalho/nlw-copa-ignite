import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlusCircle, SoccerBall, SignOut } from 'phosphor-react-native'

import { New } from '../screens/New';
import { Polls } from '../screens/Polls';
import { Find } from '../screens/Find';
import { SignOutUser } from '../screens/SignOut';
import { useAuth } from '../hooks/useAuth';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { signOut } = useAuth();
  const { colors, sizes } = useTheme();
  const size = sizes[6];

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === "android" ? -10 : 0
      }
    }}>
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: 'Novo Bolão'
        }}
      />

      <Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus Bolão'
        }}
      />

      <Screen
        name="find"
        component={Find}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="signOut"
        component={SignOutUser}
        listeners={{
          tabPress: () => signOut()
        }}
        options={{
          tabBarIcon: ({ color }) => <SignOut color={color} size={size} />,
          tabBarLabel: 'Sair'
        }}
      />

    </Navigator>
  );
}