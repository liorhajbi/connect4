import './App.css';
import React from "react";
import axios from "axios";
class ResultHistory extends React.Component {

    state= {


    }

findResult = () =>{
    axios.get('https://app.seker.live/fm1///round/1/2').then((response) => {
        debugger
        let group1 =response.data[0].homeTeam.name
        let group2 =response.data[0].awayTeam.name
        let point1 = this.sumGoals(response)
        let point2 = response.data[0].goals.length - point1
        alert(group1 + "  " + group2)
        let game = {group1 , point1 , group2 , point2  }
        alert(game.group1 + game.point1 + game.group2 + game.point2)
        alert(this.sumGoals(response) + "  sum goals")

    })

}
sumGoals= (response) =>{
        let i=0
    let count =0
        while (i <response.data[0].goals.length) {
            debugger
            if (response.data[0].goals[i].home) {
                count++
                i++
            }
        }
        return count;

}
    componentDidMount() {
        this.findResult()
    }

     render() {
        return (
            <div> ggg </div>
        )
     }

}

export default ResultHistory;