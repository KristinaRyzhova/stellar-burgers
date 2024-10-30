import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const match = location.pathname.match(/\d+/);
  const orderNumbers = match ? parseInt(match[0], 10) : null;

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={<ProtectedRoute onlyUnAuth component={<Login />} />}
          />
          <Route
            path='/register'
            element={<ProtectedRoute onlyUnAuth component={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth component={<ForgotPassword />} />
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth component={<ResetPassword />} />
            }
          />
          <Route
            path='/profile'
            element={<ProtectedRoute component={<Profile />} />}
          />
          <Route
            path='/profile/orders'
            element={<ProtectedRoute component={<ProfileOrders />} />}
          />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute component={<OrderInfo />} />}
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={`#${orderNumbers}`} onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={`Детали ингредиента`} onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={`#${orderNumbers}`} onClose={closeModal}>
                  <ProtectedRoute component={<OrderInfo />} />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};
