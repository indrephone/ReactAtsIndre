import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import MainOutlet from './components/outlets/MainOutlet';
import Home from './components/pages/Home';
import AddPost from './components/pages/AddPost';
import MyPosts from './components/pages/MyPosts';
import ProtectedRoute from './protection/ProtectedRoute'; // Update path if necessary

const App = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<MainOutlet />}>
          {/* Home displays all posts */}
          <Route index element={<Home />} />

          {/* Protected routes - only logged-in users can access */}
          <Route
            path="add-post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-posts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
