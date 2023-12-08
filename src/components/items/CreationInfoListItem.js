
function CreationInfoListItem ( { info : {memberId, memberPwd }, index }) {
    return (
        <div>
            <span>{index + 1}.</span>
            아이디 <input className='' type='text' value={ memberId } readOnly={true}/>
            임시 비밀번호 <input className='' type='text' value={ memberPwd } readOnly={true}/>
        </div>
    )
}
export default CreationInfoListItem;