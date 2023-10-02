import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { selectUsers, usersLoading, usersLoaded, usersFailure } from '@/store/users/selectors';
import { Tel, Email, Back } from '@/assets/images/Icons';
import { User } from '@/utils/types';
import './style.css';

const UserCard: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { usersList } = useSelector(selectUsers, shallowEqual);
  const loading = useSelector(usersLoading, shallowEqual);
  const loaded = useSelector(usersLoaded, shallowEqual);
  const error = useSelector(usersFailure, shallowEqual);

  const findedUser = useMemo(
    () => usersList?.find(({ id }) => id === +params?.id),
    [params?.id, usersList],
  ) as User;

  const handleClickBack = () => {
    navigate('/');
  };

  return (
    <div className="userCard">
      <div className="userCard__header header">
        <div className="container">
          <button className="headerBtn" onClick={handleClickBack}>
            Назад
          </button>
          <button className="headerBtn mobileBtn" onClick={handleClickBack}>
            {Back}
          </button>

          <div className="userInfo">
            <div className="avatar">
              {!!findedUser?.avatar && (
                <img
                  src={findedUser.avatar}
                  alt="avatar"
                  aria-label="avatar"
                  className="image mainImg"
                />
              )}
            </div>
            <div className="nameWrap">
              <h2 className="name">
                {findedUser?.first_name} {findedUser?.last_name}
              </h2>
              {!!findedUser && <p className="label">Партнер</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="userCard__content container">
        {loading && (
          <div className="mainLoading">
            <CircularProgress color="inherit" />
          </div>
        )}

        {!loading && loaded && (
          <div className="contentWrap">
            <div className="aboutUser">
              <p className="text">
                Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых
                продуктов, включая такие аспекты, как организационная структура, процессы, аналитика
                и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса,
                улучшать процессы за счет применения новейших технологий и увеличивать продажи,
                используя самые современные аналитические инструменты.
              </p>
              <p className="text">
                В работе с клиентами недостаточно просто решить конкретную проблему или помочь
                справиться с трудностями. Не менее важно уделять внимание обмену знаниями:
                &quot;Один из самых позитивных моментов — это осознание того, что ты помог клиенту
                совершенно новый уровень компетентности, уверенность в том, что после окончания
                проекта у клиента есть все необходимое, чтобы дальше развиваться
                самостоятельно&quot;.
              </p>
              <p className="text">
                Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
                предпринимательскую деятельность. Он является совладельцем сети клиник эстетической
                медицины в Швейцарии, предлагающей инновационный подход к красоте, а также
                инвестором других бизнес-проектов.
              </p>
            </div>

            <div className="userContacts">
              <a href="tel:+79543334455" className="link tel">
                {Tel}
                +7 (954) 333-44-55
              </a>
              <a href={`mailto:${findedUser?.email}`} className="link email">
                {Email}
                {findedUser.email}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
