import { RouterProvider } from 'react-router-dom';
import { useAuthCheck } from './hooks/useAuthCheck';
import routes from './routes/routes';

function App() {
  const authChecked = useAuthCheck();

  return (
    <>
      {!authChecked ? (
        <div className="text-center p-4">Please wait</div>
      ) : (
        <RouterProvider router={routes} />
      )}
    </>
  );
}

export default App;
