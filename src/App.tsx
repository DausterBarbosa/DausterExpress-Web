import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {AuthProvider} from "./contexts/auth";

import Routes from './routes';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
