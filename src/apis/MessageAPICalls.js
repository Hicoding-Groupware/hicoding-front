import {authRequest} from "./Api";
import {
    getMember,
    getReceiveDetail,
    getReceiveMessage, getSendDetail,
    getSendMessage,
    postMessageSuccess, putDeleteSuccess, getMessage
} from "../modules/MessageModule";
import {toast} from "react-toastify";

/* 받은 쪽지 조회 */
export const callReceiveMessageListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/msgs/receiver?page=${currentPage}`);
        console.log('callReceiveMessageListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getReceiveMessage(result));
        }
    }

};

/* 보낸 쪽지 조회 */
export const callSendMessageListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/msgs/sender?page=${currentPage}`);
        console.log('callSendMessageListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getSendMessage(result));
        }
    }

};

/* 파일 다운로드 */
export const callMessageFileAPI = ({fileNo}) => {
    console.log("api 쪽 fileNo : ", fileNo);
    return async (dispatch, getState) => {

        const result = await authRequest.get(
            `/msgs/${fileNo}`,
            {responseType:"blob"})      // 응답데이터 타입 정의
            .then((response) => {
            const blob = new Blob([response.data]);

            const fileObjectUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = fileObjectUrl;
            link.style.display = "none";


            // 다운로드 파일 이름 추출하는 함수
                const extractDownloadFilename = (response) => {
                    const disposition = response.headers["content-disposition"];
                    const fileName = decodeURI(
                        disposition
                            .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
                            .replace(/['"]/g, "")
                    );
                    return fileName;
                };


                // 다운로드 파일 이름 지정
                // 일반적으로 응답 Header의 Content-Disposition에 설정됨
                link.download = extractDownloadFilename(response)

            // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킴
            document.body.appendChild(link);
            link.click();
            link.remove();

            // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
            window.URL.revokeObjectURL(fileObjectUrl);

        });


    }

};

/* 멤버 조회 */
export const callMessageMemberListAPI = ({memberName}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/msgs/member?memberName=${memberName}`);
        console.log('callMessageMemberListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getMember(result));
        }
    }

};

/* 쪽지 쓰기 */
export const callMessageSendAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/msgs', registRequest);
        console.log('callStudentRegistAPI result : ', result);

        if(result.status === 200) {
            dispatch(postMessageSuccess());
            toast.info("쪽지가 전송되었습니다.");
        }

    }

}

/* 받은 쪽지 상세 조회 */
export const callReceiveDetailAPI = ({msgNo}) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/msgs/receiver/${msgNo}`);
        console.log('callReceiveDetailAPI result : ', result);

        if(result.status === 200) {
            dispatch(getReceiveDetail(result));
        }
    }

};

/* 보낸 쪽지 상세 조회 */
export const callSendDetailAPI = ({msgNo}) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/msgs/sender/${msgNo}`);
        console.log('callReceiveDetailAPI result : ', result);

        if(result.status === 200) {
            dispatch(getSendDetail(result));
        }
    }

};

/* 받은 쪽지 삭제 */
export const callReceiveDelete = ({deleteRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/msgs/receiver`, JSON.stringify(deleteRequest), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('callReceiveDelete result : ', result);

        if (result.status === 200) {
            dispatch(putDeleteSuccess());
            toast.info("삭제가 완료되었습니다.");
        }
    }

}


/* 메인에서 가져올 진행중인 강의 */
export const callMainMessageAPI = ({messageCurrentPage}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/mainMsgs?page=${messageCurrentPage}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callMainMessageAPI result : ', result);

        if (result?.status === 200) {
            dispatch(getMessage(result));
        }
    }
}
