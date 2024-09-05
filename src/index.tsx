import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from './contexts/UsersContext';
import { PostsProvider } from './contexts/PostsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);
root.render(
  <PostsProvider>
     <UsersProvider>
      <BrowserRouter>
           <App />
      </BrowserRouter>
     </UsersProvider>
   </PostsProvider>
);
