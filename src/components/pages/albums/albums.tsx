import React, { FC } from 'react';
import { MainPage } from './albumsStyles';

import { HeaderComponent } from '../../common/header/header';

import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { token } from '../../../store/selectors/tokenSelector';

import jwt_decode from 'jwt-decode';

type JWT = {
    id: number;
    iat: Date;
    exp: Date;
};

export const Albums: FC = () => {
    const state = useSelector((state) => (state as RootState).tokenReducer);
    const jwtToken = token(state);

    const decoded: JWT = jwt_decode(jwtToken);
    console.log(decoded.id);

    return (
        <MainPage>
            <HeaderComponent />
            <h2>Albums page!</h2>
        </MainPage>
    );
};
