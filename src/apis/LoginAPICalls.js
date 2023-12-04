import {loginFailure, loginSuccess} from "../modules/LoginModule";
import {request} from "./Api";
import {saveToken} from "../utils/TokenUtils";


export const callLoginAPI = ({loginRequest}) => {

    return async (dispatch, getState) => {

          console.log(loginRequest);
          const result = await request(
              'POST',
              '/login',
              {'Content-Type': 'application/json'},  //자바 문자이기때문에
              JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

          );
          console.log('callSignupAPI result : ', result);
          if (result?.status === 200) {
              saveToken(result.headers);
              dispatch(loginSuccess());
          } else {
              dispatch(loginFailure());

          }


    }
}