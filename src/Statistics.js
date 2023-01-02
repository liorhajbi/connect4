import React from "react";
import axios from "axios";
import SelectLeague from "./selectLeague";

class Statistics extends React.Component {
    state ={ half1: 0 , half2: 0 , goals :[]

    }

    findGoals = (id) =>{
        let i=0
        let j=0
        let countHalf1  = 0
        let countHalf2  = 0
        let goalsArray = []
        axios.get('https://app.seker.live/fm1/history/' + id ).then((response) => {
            while (i< response.data.length) {
                while (j < response.data[i].goals.length) {
                    let minute = response.data[i].goals[j].minute
                    let name = response.data[i].goals[j].scorer.firstName + " "
                        + response.data[i].goals[j].scorer.lastName

                    let goal = {name , minute}
                    goalsArray.push(goal)

                    j++
                }

                i++
                j=0
                this.setState({
                    goals : goalsArray
                })
            }
        })
        this.findHalf()
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
    findHalf = () => {
        debugger
        let countHalf1 =0
        let countHalf2 =0
        for (let j = 0; j <this.state.goals ; j++) {
            debugger
            if (this.state.goals[j].minute <= 45) {
                debugger
                countHalf1 ++
                this.setState( {
                    half1 : countHalf1
                })
            }
            else {
                countHalf2++
                this.setState( {
                    half2 : countHalf2
                })
            }
        }
        alert(countHalf1 + "  half1  " + countHalf2 + "  half2")
    }
    earliestGoalLatestGoal = () => {
        let early = 0
        let late = 0

    }
    sumOfGoalByRound = () => {

    }




    render() {
        return (
            <div className="Statistics">
            <SelectLeague responseClick = {this.findGoals.bind(this)} ></SelectLeague>
                {
                    this.state.half1 + " " + this.state.half2
                }
                <table>
                    {
                        this.state.goals.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        {item.name + " " + item.minute}
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
export default Statistics;