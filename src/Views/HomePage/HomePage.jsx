import React from 'react';
import { HomeComponent } from '../../_components/HomeComponent';
import { NavBarComponent } from '../../_components';

function HomePage() {
    return (  
      <NavBarComponent>
        <HomeComponent />
      </NavBarComponent>    
      );
}

export { HomePage };