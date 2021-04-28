import React ,{ useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { requestRobots, setSearchField } from '../action'

const mapStateToProps = state =>{
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPendibg: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App(props) {
    const { searchField, onSearchChange, robots, isPending, onRequestRobots } = props
    
    useEffect(onRequestRobots,[])

    
    const filterRobots = robots.filter(robots =>{
        return robots.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return isPending ? <h1>Loading</h1>
        :(
            <div className='tc'>
            <h1 className='f1'>RobotFriends</h1>
            <SearchBox 
            searchChange={onSearchChange}
            searchfield={searchField}
            />
            <Scroll>
                <CardList robots={filterRobots} />
            </Scroll> 
        </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);