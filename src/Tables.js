import React from "react";
import axios from "axios";
import SelectLeague from "./selectLeague";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0 , players : [] , result : [] , winnerArray : [] , GroupId: "none"
    }
    findNameGroup = (id) => {
        axios.get('https://app.seker.live/fm1/teams/' + id ).then((response) => {
            this.setState({
                groups: response.data ,
                current : id
            })
        })
        this.findWinner(id)
    }
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
    }
    ifWinner = (name , ifWin) => {
        let arrayOfWins = this.state.winnerArray
        let ifExist = false
        let pointToAdd;
        if (ifWin) {
            pointToAdd =3
        }
        else {
            pointToAdd =1
        }
        for (let j = 0; j <arrayOfWins.length ; j++) {
            if (arrayOfWins[j].name === name) {
                ifExist = true
                arrayOfWins[j].win += pointToAdd
            }
        }
        if (!ifExist) {
            arrayOfWins.push({name,win: pointToAdd})
        }
        this.setState( {
            winnerArray : arrayOfWins.sort((a, b) => b.win - a.win)
        })
    }




    findWinner = () =>{
        let i=0
        let k=0
        let m =0
        axios.get('https://app.seker.live/fm1/history/'+ this.state.current+ "/" ).then((response) => {
            while (i<response.data.length) {
                let group1 =response.data[k].homeTeam.name
                let group2 =response.data[k].awayTeam.name
                let point1 = this.sumGoals(response ,m)
                m++
                let point2 = response.data[k].goals.length - point1
                if (point1 > point2) {
                    let name = group1
                    this.ifWinner(name, true)
                }
                if (point1 < point2) {
                    let name = group2
                    this.ifWinner(name,true)
                }
                if (point1 === point2) {
                    let name = group1
                    this.ifWinner(name,false)
                    name = group2
                    this.ifWinner(name,false)

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
    groupChanged = (event) => {
        this.setState({
            GroupId: event.target.value
        })
    }

    render() {
        return (
            <div className="Tables">
                <SelectLeague responseClick = {this.findNameGroup.bind(this)} ></SelectLeague>

                <table>
                    {
                        this.state.winnerArray.map((item)=>{
                            return(
                                <tr>
                                    <td onChange={this.groupChanged} onClick={() => this.findPlayers("607")} >   {item.name + "  "  +item.win}
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