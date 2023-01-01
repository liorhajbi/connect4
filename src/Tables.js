import React from "react";
import axios from "axios";
import ResultHistory from "./ResultHistory";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0 , players : []
    }
    findNameGroup = () => {
        let i = 0
        let array = []
        axios.get('https://app.seker.live/fm1/teams/3').then((response) => {
            this.setState({
                groups: response.data
            })
        })

    }
    componentDidMount() {
        this.findNameGroup()
        this.findPlayers()
    }
    findPlayers = () =>{
        let i=0
        let thePlayers = []
        debugger
        axios.get('https://app.seker.live/fm1/squad/2/20').then((response) => {
            debugger
            while (i< response.data.length) {
                debugger
                let firstName = response.data[i].firstName;
                let lastName = response.data[i].lastName;
                let player = {firstName,lastName }
                thePlayers.push(player)
                i++
            }
            this.setState( {
                players : thePlayers
            })

    })

    }

    render() {
        return (
            <div className="Tables">
                <table>
                    {
                        this.state.groups.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.name}
                                    </td>
                                </tr>

                            )
                        })
                    }
                    {
                        this.state.players.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.firstName + "  "  +item.lastName}
                                    </td>
                                </tr>

                            )
                        })
                    }

                </table>

                </div>

        )
    }
}

export default Tables;