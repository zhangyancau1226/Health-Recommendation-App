import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { SignedIn, SignedOut, Setting, Subway, Subway2, Tortilla, Phoenix, StudentCenter, BCCavern, WendysSC, EinsteinPX, GreensToGoPX, Grille, PandaSC, WahooSC, Pizza, Tortilla2, Grille2, RamenSC} from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: SignedIn,
    Login: SignedOut,
    UserInfo: Setting,

    SubwayBC: Subway,
    TortillaBC: Tortilla,
    WendySC: WendysSC,
    EinsteinPX: EinsteinPX,
    GreensPX: GreensToGoPX,
    GrilleBC: Grille,
    PandaSC: PandaSC,
    RamenSC: RamenSC,
    WahooSC: WahooSC,
    BCBC: Pizza,
    SubwaySC: Subway2,
    TortillaPX: Tortilla2,
    GrillePX: Grille2,


    PhoenixPage: Phoenix,
    StudentCenterPage: StudentCenter,
    BCCavernPage: BCCavern,

  },
  {
    initialRouteName:'Login',
  }
));