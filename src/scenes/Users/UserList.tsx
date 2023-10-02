import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserLike, delUserLike } from '@/store/users/slicer';
import { PropsUsers } from './types';
import { User } from '@/utils/types';
import { useVisibleListItems } from './hooks';
import { LikeStroke, LikeFill, ShowMore } from '@/assets/images/Icons';

const listSize = 8;

const UserList: React.FC<PropsUsers> = React.memo((props: PropsUsers) => {
  const { list } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number, setNumber] = useState(listSize);
  const visibleList = useVisibleListItems(number, list);

  //console.log(likes);

  const handleSelectUser = (userId: number) => (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.tagName === 'path' || el.tagName === 'BUTTON') return;
    else navigate(`/users/${userId}`);
  };

  const handleLikeUser = (user: User) => () => {
    if (!user?.liked) dispatch(addUserLike(user.id, { liked: true }));
    else dispatch(delUserLike(user.id, { liked: false }));
  };

  const handleShowMore = () => {
    setNumber(prevN => prevN + listSize);
  };

  return (
    <>
      <ul className="userList">
        {visibleList?.map((user: User) => (
          <li key={user.id} className="userList__card" onClick={handleSelectUser(user.id)}>
            <div className="userInfo">
              <div className="avatar">
                {!!user?.avatar && (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    aria-label="avatar"
                    className="image mainImg"
                  />
                )}
              </div>
              <p className="name">
                {user.first_name} {user.last_name}
              </p>
            </div>

            <div className="userLike">
              {!user?.liked && (
                <button className="btn btn_stroke" onClick={handleLikeUser(user)}>
                  {LikeStroke}
                </button>
              )}
              {user?.liked && (
                <button className="btn btn_fill" onClick={handleLikeUser(user)}>
                  {LikeFill}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {visibleList.length >= listSize && number <= visibleList.length && (
        <div className="showMore">
          <button className="btn actionBtn" onClick={handleShowMore}>
            Показать еще
            {ShowMore}
          </button>
        </div>
      )}
    </>
  );
});

export default UserList;
