import React from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';

import Home from '../components/Home';
import Leagues from '../components/Leagues';
import Teams from '../components/Teams';
import Player from '../components/Player';
import Players from '../components/Players';
import ScoutPortal from '../components/ScoutPortal';
import CreateScout from '../components/CreateScout';
import SelectScout from '../components/SelectScout';
import CreateReport from '../components/CreateReport';
import ViewReports from '../components/ViewReports';
import EditReport from '../components/EditReport';

const Routes = () => {
    let leagueKey = '';
    let playerObj = '';
    let teamKey = '';
    let scoutObj = '';
    let reportObj = '';
    let location = useLocation();

    if(location.pathname === '/teams') {
        console.log(location);
        if(location.state){
            if(location.state.leagueKey) leagueKey = location.state.leagueKey;
        }       
    }

    if(location.pathname === '/player') {
        console.log(location);
        if(location.state){
            if(location.state.player) playerObj = location.state.player;
        }       
    }

    if(location.pathname === '/players') {
        console.log(location);
        if(location.state){
            if(location.state.teamKey) teamKey = location.state.teamKey;
        }       
    }

    if(location.pathname === '/selectScout' || location.pathname === '/createReport' || location.pathname === '/viewReports') {
        console.log(location);
        if(location.state){
            if(location.state.scout) scoutObj = location.state.scout;
        }       
    }

    if(location.pathname === '/editReport') {
        console.log(location);
        if(location.state){
            if(location.state.report) reportObj = location.state.report;
        }       
    }

     return (       
        <Switch>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/leagues" element={<Leagues/>}/>
            <Route exact path="/teams" element={<Teams leagueKey={leagueKey} />} />
            <Route exact path="/player" element={<Player player={playerObj} />} />
            <Route exact path="/players" element={<Players teamKey={teamKey} />} />
            <Route exact path="/scoutPortal" element={<ScoutPortal />} />
            <Route exact path="/createScout" element={<CreateScout />} />
            <Route exact path="/selectScout" element={<SelectScout scout={scoutObj} />} />
            <Route exact path="/createReport" element={<CreateReport scout={scoutObj} />} />
            <Route exact path="/viewReports" element={<ViewReports scout={scoutObj} />} />
            <Route exact path="/editReport" element={<EditReport report={reportObj} />} />
        </Switch>
    );
}

export default Routes;