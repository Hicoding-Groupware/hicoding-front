function LectureListItem({lecture : lecName, textbook}){
    return(
        <div>
            <h5>{lecName}</h5>
            <h5>{textbook}</h5>
        </div>
    );
}

export default LectureListItem;