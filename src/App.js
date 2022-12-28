import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Tables from "./Tables";
import ResultHistory from "./ResultHistory";
import TopScorers from "./TopScorers";
import Statistics from "./Statistics";

class App extends React.Component {

    state = {
        leagues: [],current: "none",value:0

    }

    findLeague = () => {
        axios.get('https://app.seker.live/fm1/leagues').then((response) => {
            debugger;
            let array = [response.data[0].name, response.data[1].name, response.data[2].name]
            this.setState({
                leagues: array
            })
        });
    }
    componentDidMount() {
        this.findLeague()
    }
    changeLeague = (event) => {
        this.setState({
            current : event.target.value
        })

    }

    render() {
        return (
            <div className="App">
                <button> gg </button>

                <select value={this.state.current} onChange={this.changeLeague}>
                    <option value={"none"} disabled={true}> SELECT LEAGUE </option>
                    {
                        this.state.leagues.map((item) => {
                        return (
                        <option value = {item}>{item}</option>
                        )
                    })
                    }
                </select>

            <BrowserRouter>
                <NavLink style={{margin: "10px"}} to={"/Tables"}> Tables </NavLink>
                <NavLink style={{margin: "10px"}} to={"/ResultHistory"}> ResultHistory </NavLink>
                <NavLink style={{margin: "10px"}} to={"/TopScorers"}> TopScorers </NavLink>
                <NavLink style={{margin: "10px"}} to={"/Statistics"}> Statistics </NavLink>

                <Routes>
                    <Route path={"/ResultHistory"} element={<ResultHistory/>}/>
                    <Route path={"/Tables"} element={<Tables/>}/>
                    <Route path={"/TopScorers"} element={<TopScorers/>}/>
                    <Route path={"/Statistics"} element={<Statistics/>}/>



                </Routes>
            </BrowserRouter>
        </div>
        )
    }
}
export default App;