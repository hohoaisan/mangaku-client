import {useSelector} from 'react-redux';
import {AuthState} from 'redux/auth.slice';
import {RootState} from 'redux/store';

export type IUseAuth = AuthState & {
  isLackPermissions: boolean;
};

const useAuth = (permissions: string[] = []): IUseAuth => {
  const auth = useSelector((state: RootState) => state.auth);
  const userPerms = auth?.user?.permissions || [];
  const isLackPermissions = permissions
    ? !permissions.every(perm => userPerms.includes(perm))
    : false;
  return {
    isLackPermissions,
    ...auth,
  };
};

export default useAuth;
