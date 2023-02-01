import { memo } from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAvatarUrl } from '../../store/app-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const avatarUrl = useAppSelector(getAvatarUrl);

  const logoutHandle = () => {
    dispatch(logoutAction());
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <div className="user-block">
        <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
      </div>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyList}>
            <img src={avatarUrl ? avatarUrl : 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <Link to="/" className="user-block__link" onClick={logoutHandle}>Sign out</Link>
      </li>
    </ul>
  );
}

export default memo(UserBlock);

