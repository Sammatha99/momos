import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SalesCRMTable from './components/SalesCRMTable';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SalesCRMTable />
    </QueryClientProvider>
  );
}

export default App;
