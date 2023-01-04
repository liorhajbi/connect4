import React from "react";
import axios from "axios";
import SelectLeague from "./selectLeague";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0 , players : [] , result : [] , winnerArray : []
    }
    findNameGroup = (id) => {
        axios.get('https://app.seker.live/fm1/teams/' + id ).then((response) => {
            this.setState({
                groups: response.data ,
                current : id
            })
        })
    }
    // componentDidMount() {
    //     this.findNameGroup()
    //     this.findPlayers()
    // }
    findPlayers = (id) =>{
        let i=0
        let thePlayers = []
        axios.get('https://app.seker.live/fm1/squad/'+ this.state.current+ "/" + id).then((response) => {
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
        this.findResult(id)
        this.findWinner()

    }



    findWinner = () =>{
        let theResult = []
        let i=0
        let k=0
        let m =0
        let arrayOfWins = []
        axios.get('https://app.seker.live/fm1/history/'+ this.state.current+ "/" ).then((response) => {
            while (i<response.data.length) {
                let group1 =response.data[k].homeTeam.name
                let group2 =response.data[k].awayTeam.name
                let point1 = this.sumGoals(response ,m)
                m++
                let point2 = response.data[k].goals.length - point1
                let game = {group1 , point1 , group2 , point2  }
                let ifExistGroup = false
                if (point1 > point2) {
                    let name = group1
                    let win = 3
                    for (let j = 0; j <arrayOfWins.length ; j++) {
                        if (arrayOfWins[j].name === name) {
                            ifExistGroup = true
                            arrayOfWins[j].win += 3
                        }
                    }
                    if (!ifExistGroup) {
                        arrayOfWins.push({name,win})
                    }
                }

                if (point1 < point2) {
                    let name = group2
                    let win = 3
                    for (let j = 0; j <arrayOfWins.length ; j++) {
                        if (arrayOfWins[j].name === name) {
                            ifExistGroup = true
                            arrayOfWins[j].win += 3
                        }
                    }
                    if (!ifExistGroup) {
                        arrayOfWins.push({name,win})
                    }
                }

                if (point1 === point2) {
                    let name = group1
                    let win = 1
                    for (let j = 0; j <arrayOfWins.length ; j++) {
                        if (arrayOfWins[j].name === name) {
                            ifExistGroup = true
                            arrayOfWins[j].win ++
                        }
                    }

                    if (!ifExistGroup) {
                        arrayOfWins.push({name,win})
                    }

                    ifExistGroup = false
                    name = group2
                    for (let j = 0; j <arrayOfWins.length ; j++) {
                        if (arrayOfWins[j].name === name) {
                            ifExistGroup = true
                            arrayOfWins[j].win ++
                        }
                    }
                    if (!ifExistGroup) {
                        arrayOfWins.push({name,win})
                    }

                    this.setState( {
                        winnerArray: arrayOfWins,

                    })

                }

                i++
                k++
            }

        })
    }






    findResult = (id) =>{
        let theResult = []
        let i=0
        let k=0
        let m =0
        let arrayOfWins = []
        axios.get('https://app.seker.live/fm1/history/'+ this.state.current+ "/" + id).then((response) => {
            while (i<response.data.length) {
                let group1 = response.data[k].homeTeam.name
                let group2 = response.data[k].awayTeam.name
                let point1 = this.sumGoals(response, m)
                m++
                let point2 = response.data[k].goals.length - point1
                let round = response.data[k].round
                let game = {group1, point1, group2, point2, round}
                this.setState({
                    result: theResult

                })

                theResult.push(game)
                theResult.sort()
                this.setState({
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
                        this.state.groups.map((item)=>{
                            return(
                                <tr>
                                    <td onClick={() => this.findPlayers(item.id)} > {item.name}
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
                    {
                        this.state.winnerArray.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.name + "  "  +item.win}
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