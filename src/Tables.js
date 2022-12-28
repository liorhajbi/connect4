import React from "react";
import axios from "axios";


class Tables extends React.Component {
    state = {
        groups: [], current : "none", value:0
    }
    findNameGroup = () => {
        let i = 0
        let array = []
        axios.get('https://app.seker.live/fm1/teams/3').then((response) => {
            while (i<response.data.length) {
                array = array + response.data[i].name
                i++
            }
            this.setState({
                groups: response.data
            })
        })

    }
    componentDidMount() {
        this.findNameGroup()
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
                </table>

                </div>

        )
    }
}

export default Tables;