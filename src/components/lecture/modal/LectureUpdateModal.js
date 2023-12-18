function LectureUpdateModal({setLectureUpdateModal,leccode}){
    return(
    <>
        <div className='lectureModal'>
            <div className='modalBody'>
                <button className='modalCloseBtn'onClick={()=>setLectureUpdateModal(false)}>X</button>
                <div className='modalContent'>
                    <h2>강의 수정</h2>

                    <input name='lecName' />
                    <input name='textbook' />
                    <input name='techStack'  />

                    <button className='modalRegistBtn' >수정</button>
                    <button className='modalCancelBtn' >취소</button>
                </div>

            </div>
        </div>
    </>
    )
}
export default LectureUpdateModal;
