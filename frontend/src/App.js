import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import SidebarWithHeader from './pages/Structure';
import HomeSearch from './components/HomeP';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Router
} from "react-router-dom";
import UploadStuff from './components/UploadStuff';
import {BrowserRouter} from "react-router-dom" 
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import * as reactRouterDom from "react-router-dom";
import {useColorMode} from '@chakra-ui/react'
import { SessionAuth } from "supertokens-auth-react/recipe/session";


// import { extendTheme , Button} from '@chakra-ui/react'
// import { theme as baseTheme } from '@saas-ui/theme-glass'


import {theme} from './theme';

SuperTokens.init({
  appInfo: {
      appName: "licoricepizza",
      apiDomain: "http://localhost:8000",
      websiteDomain: "http://localhost:3000",
      apiBasePath: "/auth",
      websiteBasePath: "/auth"
  },
  recipeList: [
      Passwordless.init({
          contactMethod: "EMAIL_OR_PHONE"
      }),
      Session.init()
  ]
});


function App() {
  // localStorage.setItem('colorMode', JSON.stringify(testObject));
  localStorage.setItem('chakra-ui-color-mode', 'dark');
  // localStorage.removeItem('chakra-ui-color-mode');
  let { colorMode, toggleColorMode } = useColorMode('dark')

return(

<SuperTokensWrapper>
  <BrowserRouter>
  <Routes>

  <Route path="/" element={<SessionAuth>
  <ChakraProvider theme={theme}><SidebarWithHeader>

    <HomeSearch></HomeSearch>
    </SidebarWithHeader></ChakraProvider>
    </SessionAuth>
    } />

  {/* <Route path='/auth'> */}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
  {/* </Route> */}

  <Route path="/integrations" element={<ChakraProvider><SidebarWithHeader>
    <UploadStuff></UploadStuff>
    </SidebarWithHeader></ChakraProvider>} />
  </Routes>

  </BrowserRouter>
</SuperTokensWrapper>

);


}

export default App;
