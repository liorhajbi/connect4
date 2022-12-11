import logo from './logo.svg';
import './App.css';
import React from "react";

function Circle() {
    return (
        <div height="110" width="500">
            <circle1
                cx="50"
                cy="55"
                r="45"
                fill="none"
                stroke="#F0CE01"
                strokeWidth="4"
            />


        </div>

    );
}

function changeColor() {
    return (

        <div height="110" width="500">
            <circle2
                cx="50"
                cy="55"
                r="45"
                fill="none"
                stroke="#F0CE01"
                strokeWidth="4"
            />

        </div>);

}
class App extends React.Component {
    state= { circles : [{locations: "11", color:"white"},21,31,41,51,61,71,12,22,32,42,52,62,72]

    }



 render() {
     return (

         <table>
       <tr>
           <td> </td>
           {
           Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td></td>
           {
               Circle()
           }

       </tr>
<tr>
</tr>
       <tr>
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td></td>
           {
               Circle()
           }
       </tr>
       <tr>
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td></td>
           {
               Circle()
           }
       </tr>
       <tr>
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td></td>
           {
               Circle()
           }
       </tr>
       <tr>
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td> </td>
           {
               Circle()
           }
           <td></td>
           {
               Circle()
           }
       </tr>
      </table>)

 }

}
export default App;