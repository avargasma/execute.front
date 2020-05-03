import React from 'react';

import { ListUserComponent, NavBarComponent } from '../../_components';

function ListUserPage() {
    return (
        <NavBarComponent>
            <ListUserComponent /> 
        </NavBarComponent>
      );
}

export { ListUserPage };