// 이름형식 확인
export const validateName = name => {
    const regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    return regex.test(name);
}

// email형식 확인
export const validateEmail = email => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

// 공백 제거
export const removeWhitespace = text => {
    if(text) {
        const regex = /\s/g;
        return text.replace(regex, '');
    }
    return '';
}