import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { TodoProvider } from '@/contexts/TodoContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
    </AuthProvider>
  );
}

export default MyApp;
