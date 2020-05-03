import React from 'react';

import { AddUserComponent, NavBarComponent } from '../../_components';

function RegisterPage() {
    return (
        <NavBarComponent>
            <AddUserComponent /> 
        </NavBarComponent>
      );
}

export { RegisterPage };