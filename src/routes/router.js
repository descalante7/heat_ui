import React, { useState } from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';

import Home from '../components/Home';
import Leagues from '../components/Leagues';
import Teams from '../components/Teams';
import Player from '../components/Player';

const Routes = () => {
    let leagueKey = '';
    let playerObj = '';
    let location = useLocation();    
    if(location.pathname == '/teams') {
        console.log(location);
        if(location.state){
            if(location.state.leagueKey) leagueKey = location.state.leagueKey;
        }       
    }

    if(location.pathname == '/player') {
        console.log(location);
        if(location.state){
            if(location.state.player) playerObj = location.state.player;
        }       
    }

     return (       
        <Switch>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/leagues" element={<Leagues/>}/>
            <Route exact path="/teams" element={<Teams leagueKey={leagueKey} />} />
            <Route exact path="/player" element={<Player player={playerObj} />} />
        </Switch>       
    );
}

export default Routes;