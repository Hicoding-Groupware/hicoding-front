import CreationInfoListItem from "../items/CreationInfoListItem";
import {useEffect} from "react";

function CreationInfoList({infos}) {

    return(
        <div>
            {
                infos &&
                infos.map( (info, index) => (
                    <CreationInfoListItem key={index} index={index} info={info}/>
                ))}
        </div>
    )
}

export default CreationInfoList