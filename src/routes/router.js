import React, { useState } from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';

import Home from '../components/Home';
import Leagues from '../components/Leagues';
import Teams from '../components/Teams';

const Routes = () => {
    let leagueKey = '';
    let location = useLocation();    
    if(location.pathname == '/teams') {
        console.log(location);
        leagueKey = location.state.leagueKey;
    }

     return (       
        <Switch>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/leagues" element={<Leagues/>}/>
            <Route exact path="/teams" element={<Teams leagueKey={leagueKey} />} />
        </Switch>       
    );
}

export default Routes;