
function CreationInfoListItem ( { info : {memberId, memberPwd }, index }) {
    return (
        <div>
            <span>{index + 1}.</span>
            이름 <input className='' type='text' value={ memberId } readOnly={true}/>
            임시 비밀번호 <input className='' type='text' value={ memberPwd } readOnly={true}/>
        </div>
    )
}
export default CreationInfoListItem;