import React from "react";
import axios from "axios";
import SelectLeague from "./selectLeague";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0 , players : []
    }
    findNameGroup = (id) => {
        let i = 0
        let array = []
        axios.get('https://app.seker.live/fm1/teams/' + id ).then((response) => {
            this.setState({
                groups: response.data
            })
        })

    }
    // componentDidMount() {
    //     this.findNameGroup()
    //     this.findPlayers()
    // }
    findPlayers = (item) =>{
        let i=0
        let thePlayers = []
        let name = item.target.value
        alert(name)
        axios.get('https://app.seker.live/fm1/squad/2/20').then((response) => {
            while (i< response.data.length) {
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
                <SelectLeague responseClick = {this.findNameGroup.bind(this)} ></SelectLeague>
                <table>
                    {
                        this.state.groups.map((item, itemIndex)=>{
                            return(
                                <tr>
                                    <td > {item.name}
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