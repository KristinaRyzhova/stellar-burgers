import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  fetchGetUser,
  fetchLoginUser,
  getIsAuthChecked,
  getUser
} from '../../services/slices/userSlice/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  useEffect(() => {
    const checkUserAuth = async () => {
      if (!isAuthChecked) {
        await dispatch(fetchGetUser());
      }
    };

    if (user) {
      navigate('/');
    }

    checkUserAuth();
  }, [dispatch, isAuthChecked, user]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
