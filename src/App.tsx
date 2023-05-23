import React from 'react';
import{BrowserRouter} from 'react-router-dom'
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts';
import { AuthProvider } from './shared/contexts/AuthProvider';
import { Login } from './shared/components/Login';
import { DrawerProvider } from './shared/contexts/DrawerProvider';
import { AppDrawer } from './shared/components/AppDrawer';


export const App=()=> {
  return (
    <AuthProvider>

    <AppThemeProvider>
<Login>
  <DrawerProvider>
    <BrowserRouter>
    <AppDrawer>
   <AppRoutes/>
    </AppDrawer>
    </BrowserRouter>
  </DrawerProvider>
</Login>
    </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
