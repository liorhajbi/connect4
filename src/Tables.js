import React from "react";
import axios from "axios";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0

    }
    findNameGroup = () => {
        let i = 0
        let array = []
        axios.get('https://app.seker.live/fm1/teams/1').then((response) => {
            while (i<20) {
                array = array + response.data[i].name
                i++
            }
            this.setState({
                groups: array
            })
        })

    }
    componentDidMount() {
        this.findNameGroup()
    }

    changeGroup = (event) => {
        this.setState({
            current : event.target.value
        })

    }

    render() {
        return (
            <div className="Tables">
                <select value={this.state.current} onChange={this.changeGroup}  >
                <option value={"none"} disabled={true}> SELECT GROUP </option>
                {
                    this.state.groups.map((item) => {
                        return (
                            <option value = {item}>{item}</option>
                        )
                    })
                }
            </select>
                </div>

        )
    }
}

export default Tables;