import {useSelector} from "react-redux";
import React from "react";

function PasswordUpdateModal () {

    const {logins} = useSelector(state => state.loginReducer);


    return(
        <>
            <table>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="password"
                            style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                            value={info.password}
                            name="memberPwd"
                            placeholder="새로운 비밀번호를 입력하세요"
                            onChange={onChangeHandler}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );

}

export default PasswordUpdateModal;