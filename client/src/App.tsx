import { Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import Categories from './components/Categories';
import Test from './components/Test';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element=<Categories /> />
        <Route path="/:category/:duration" element=<Test /> />
        {/* <Route path="/:category/:duration/result" element=<Result />> */}
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
