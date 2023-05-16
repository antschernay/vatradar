import React from "react";


const Controllers = ({controllers}) => {

    return (
       
        <table className="white code  w-100 center atc-table ">
            <tr className="bg-gray">
                <th className="ma0 pa2 f6">Callisgn</th>
                <th className="ma0 pa2 f6">Name</th>
                <th className="ma0 pa2 f6">Frequency</th>
                <th className="ma0 pa2 f6">Since</th>
            </tr>
        
            {controllers.map(controller => {
                return (
        
                <tr className="items-center tc bg-black">
                    <td className="ma0 pa2 f6">{controller.callsign}</td>
                    <td className="ma0 pa2 f6">{controller.name}</td>
                    <td className="ma0 pa2 f6">{controller.frequency}</td>
                    <td className="ma0 pa2 f6">Online</td>
                </tr>
            
            
                )
            })}
        </table>
      
    )

    


}


export default Controllers;