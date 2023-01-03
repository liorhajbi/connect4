import React from "react";
import axios from "axios";
import SelectLeague from "./selectLeague";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0 , players : [] , result : []
    }
    findNameGroup = (id) => {
        let i = 0
        let array = []
        axios.get('https://app.seker.live/fm1/teams/' + id ).then((response) => {
            this.setState({
                groups: response.data
            })
        })
        this.findResult(id)

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

    findResult = (id) =>{
        let theResult = []
        let i=0
        let k=0
        let m =0
        axios.get('https://app.seker.live/fm1/history/1/900').then((response) => {
            while (i<response.data.length) {
                let group1 =response.data[k].homeTeam.name
                let group2 =response.data[k].awayTeam.name
                let point1 = this.sumGoals(response ,m)
                m++
                let point2 = response.data[k].goals.length - point1
                let round = response.data[k].round
                let game = {group1 , point1 , group2 , point2 , round }
                theResult.push(game)
                this.setState( {
                    result: theResult,
                })
                i++
                k++
            }

        })
    }
    sumGoals= (response,m) =>{
        let j=0
        let count =0
        let k=0
        while (j <response.data[m].goals.length) {
            if (response.data[m].goals[j].home) {
                count++
            }
            j++
        }
        return count;
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
                        this.state.result.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.group1 + "  " + item.point1  +" - "+item.point2 + "  " + item.group2}
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