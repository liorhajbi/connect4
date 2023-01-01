import './App.css';
import React from "react";
import axios from "axios";
class ResultHistory extends React.Component {

    state= {
        result : [] , arrayWithSort :[]
    }

findResult = () =>{
    let theResult = []
    let i=0
    let k=0
    axios.get('https://app.seker.live/fm1/history/1/').then((response) => {
        while (i<response.data.length) {
            let group1 =response.data[k].homeTeam.name
            let group2 =response.data[k].awayTeam.name
            let point1 = this.sumGoals(response)
            let point2 = response.data[k].goals.length - point1
            let round = response.data[k].round
            let game = {group1 , point1 , group2 , point2 , round }
            theResult.push(game)
            i++
            k++
        }

    })
    this.setState( {
        result: theResult,
    })
    this.sortByRound()

}
sumGoals= (response) =>{
    let j=0
    let count =0
    let k=0
        while (j <response.data[k].goals.length) {
            if (response.data[k].goals[j].home) {
                count++
            }
            j++
            k++
        }
        return count;

}

sortByRound = () => {
    let j = 0;
    let i = 0
    let arraySort = []
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    alert(min + "min" + max + "max")

    while (j < this.state.result.length) {
        alert("vvvv")
        if (this.state.result[j].round > min && this.state.result[j].round< max) {
            arraySort.push(this.state.result[i])
            }
            j++
        }
        this.setState( {
            arrayWithSort : arraySort
        })
    }


    componentDidMount() {
        this.findResult()
    }

     render() {
        return (
            <div className="ResultHistory">
                <div> min</div>
                <input id={"min"} type={"number"}min={1} max={15}/>
                <div> max</div>
                <input id={"max"} type={"number"}min={1} max={15}/>
                <button onClick={this.sortByRound}> OK</button>

                <table>
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
                        this.state.arrayWithSort.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.group1 + "  " + item.point1  +" - "+item.point2 + "  " + item.group2 + " " + item.round}
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

export default ResultHistory;