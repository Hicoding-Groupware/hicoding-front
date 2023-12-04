function LectureListItem({lecture : {lecName, textbook, techStack} }){

    return(
        <tr>
            <td>{lecName}</td>
            <td>{textbook}</td>
            <td>{techStack}</td>
        </tr>
    );
}

export default LectureListItem;