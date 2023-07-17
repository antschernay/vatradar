import React from "react";


const Controllers = ({controllers}) => {


    const formatTime = (logOnTime) => {
    
        const date = new Date(logOnTime);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}Z`;

        return formattedTime;

    }

    return (
       
        <table className="white code w-100 center atc-table ba b--silver collapse">
            <tr className="bg-mid-gray bb b--silver items-center tc">
                <th className="ma0 pa1 br b--silver f6">Callisgn</th>
                <th className="ma0 pa1 br b--silver f6">Name</th>
                <th className="ma0 pa1 br b--silver f6">Frequency</th>
                <th className="ma0 pa1 br b--silver f6">Since</th>
            </tr>
        
            {controllers.map(controller => {
                return (
        
                <tr className="items-center tc bt b--mid-gray" style={{backgroundColor: "#8C8C78"}}>
                    <td className="ma0 pa1 br b--silver f6">{controller.callsign}</td>
                    <td className="ma0 pa1 br b--silver f6">{controller.name}</td>
                    <td className="ma0 pa1 br b--silver f6">{controller.frequency}</td>
                    <td className="ma0 pa1 br b--silver f6">{formatTime(controller.logon_time)}</td>
                </tr>
            
            
                )
            })}
        </table>
      
    )

    


}


export default Controllers;