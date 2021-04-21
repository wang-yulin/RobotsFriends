import React ,{useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


function App() {
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchField] = useState('')

    const onSearchChange=(event)=>{
        setSearchField(event.target.value)
    };

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response=> {
    //             return response.json();
    //         })
    //         .then(users => {
    //             setRobots(users)
    //         });
    // }
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setRobots(users)
            });
    })

    
    const filterRobots = robots.filter(robots =>{
        return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length ? <h1>Loading</h1>
        :(
            <div className='tc'>
            <h1 className='f1'>RobotFriends</h1>
            <SearchBox 
            searchChange={onSearchChange}
            searchfield={searchfield}
            />
            <Scroll>
                <CardList robots={filterRobots} />
            </Scroll> 
        </div>
        );
}

export default App;