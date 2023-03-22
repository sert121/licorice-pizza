import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
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


SuperTokens.init({
  appInfo: {
      appName: "laweyerapp",
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
return(

<BrowserRouter>
<Routes>

<Route path="/" element={<ChakraProvider><SidebarWithHeader>
  <HomeSearch></HomeSearch>
  </SidebarWithHeader></ChakraProvider>} />

<Route path='/auth'>
{getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
</Route>

<Route path="/integrations" element={<ChakraProvider><SidebarWithHeader>
  <UploadStuff></UploadStuff>
  </SidebarWithHeader></ChakraProvider>} />
</Routes>

</BrowserRouter>

);


}

export default App;