import CreationInfoList from "../../components/lists/CreationInfoList";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMemberInquiryAPI} from "../../apis/MemberAPICalls";
import {creationSuccess, inquirySuccess} from "../../modules/MemberModule";

export const MEMBER_FORM_TYPE = {
    NO: 'no',
    ID: 'id',
    NAME: 'name',
    GENDER: 'gender',
    AGE: 'age',
    ROLE : 'role',
    STATUS: 'status',
    JOINED_AT: 'joinedAt',
    ENDED_AT: 'endedAt'
}

function DetailsView() {

    const dispatch = useDispatch()
    const {inquiryInfos} = useSelector(state => state.memberReducer)
    const [form, setForm] = useState(() => initializeMemberForm())

    // 토글 상태를 배열로 관리
    const [toggleStates, setToggleStates] = useState(Array(Object.keys(MEMBER_FORM_TYPE).length).fill(true));

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus();
        setForm(initializeMemberForm())
    }, [inquiryInfos, toggleStates])

    function initializeMemberForm() {
        return {
            no: '',
            id: '',
            name: '',
            gender: '',
            role: '',
            status: '',
            joinedAt: '',
            endedAt: ''
        }
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // 달 또는 일이 한 자리 수인 경우, 앞에 0을 추가
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    }

    // 인덱스에 해당하는 토글 항목을 토글하는 함수
    const toggleState = (curIndex) => {

        // 현재 toggle 값 가져와서 반전시키고 저장
        const changedToggle = !toggleStates[curIndex];
        console.log(changedToggle)

        // 특정 인덱스를 제외한 나머지를 true로 초기화하는 함수
        const newToggle = toggleStates.map((value, index) => index !== curIndex ? true : changedToggle);
        setToggleStates(newToggle);
        console.log(...toggleStates)
    };

    // 정렬 함수
    const handleSort = (formType, index) => {

        const isCurToggleOn = toggleStates[index]

        console.log(inquiryInfos)
        console.log(formType)
        console.log(isCurToggleOn)
        if (inquiryInfos) {

            let sortedData= null;
            switch (formType) {
                case MEMBER_FORM_TYPE.NO:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => b.no - a.no) :
                        [...inquiryInfos].sort((a, b) => a.no - b.no)
                    break;
                case MEMBER_FORM_TYPE.ID:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => {

                            // 6번째 자리 숫자로 비교
                            const aSixthDigit = parseInt(a.id[5], 10);
                            const bSixthDigit = parseInt(b.id[5], 10);

                            // 맨 뒷자리 숫자로 비교
                            const aLastDigit = parseInt(a.id[a.id.length - 1], 10);
                            const bLastDigit = parseInt(b.id[b.id.length - 1], 10);

                            return aSixthDigit - bSixthDigit;
                        })
                        :
                        [...inquiryInfos].sort((a, b) => {
                            // 6번째 자리 숫자로 비교
                            const aSixthDigit = parseInt(a.id[5], 10);
                            const bSixthDigit = parseInt(b.id[5], 10);

                            // 맨 뒷자리 숫자로 비교
                            const aLastDigit = parseInt(a.id[a.id.length - 1], 10);
                            const bLastDigit = parseInt(b.id[b.id.length - 1], 10);

                            return bSixthDigit - aSixthDigit;
                        })
                    break;
                case MEMBER_FORM_TYPE.NAME:
                    const collator = new Intl.Collator('ko', { sensitivity: 'base' })
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => collator.compare(a.name, b.name)) :
                        [...inquiryInfos].sort((a, b) => collator.compare(b.name, a.name))
                    break;
                case MEMBER_FORM_TYPE.GENDER:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => {
                            if(a.gender === '남자' && b.gender === '여자')
                                return -1
                        }) :
                        [...inquiryInfos].sort((a, b) => {
                            if(a.gender === '여자' && b.gender === '남자')
                                return -1
                        })
                    break;
                case MEMBER_FORM_TYPE.AGE:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => a.age - b.age) :
                        [...inquiryInfos].sort((a, b) => b.age - a.age)
                    break;
                case MEMBER_FORM_TYPE.ROLE:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => a.role.localeCompare(b.role)) :
                        [...inquiryInfos].sort((a, b) => b.role.localeCompare(a.role))
                    break;
                case MEMBER_FORM_TYPE.STATUS:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => a.status.localeCompare(b.status)) :
                        [...inquiryInfos].sort((a, b) => b.status.localeCompare(a.status))
                    break;
                case MEMBER_FORM_TYPE.JOINED_AT:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt)) :
                        [...inquiryInfos].sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))
                    break;
                case MEMBER_FORM_TYPE.ENDED_AT:
                    sortedData = isCurToggleOn ?
                        [...inquiryInfos].sort((a, b) => new Date(a.endedAt) - new Date(b.endedAt)) :
                        [...inquiryInfos].sort((a, b) => new Date(b.endedAt) - new Date(a.endedAt))
                    break;
            }

            toggleState(index)
            dispatch(inquirySuccess(sortedData))
        }
    };

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleDate = dateFun => {
        return dateFun()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(form)

        dispatch(callMemberInquiryAPI({inquiryRequest: form}))
    };

    return (
        <>
            <div>
                <h1>입력란</h1>
                <form onSubmit={handleSubmit}>

                    <label>
                        ID
                        <input
                            type='text'
                            name='id'
                            value={form.id}
                            onChange={onChangeHandler}
                            ref={inputRef}
                        />
                    </label>

                    <label>
                        성명
                        <input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={onChangeHandler}
                        />
                    </label>

                    <label>
                        성별
                        <select
                            name='gender'
                            value={form.gender}
                            onChange={onChangeHandler}
                        >
                            <option value=''>선택</option>
                            <option value='MALE'>남자</option>
                            <option value='FEMALE'>여자</option>
                        </select>
                    </label>

                    <label>
                        부서명
                        <select
                            name='role'
                            value={form.role}
                            onChange={onChangeHandler}
                        >
                            <option value="">선택</option>
                            <option value="ADMIN">관리자</option>
                            <option value="STAFF">행정</option>
                            <option value="TEACHER">강사</option>
                        </select>
                    </label>

                    <label>
                        재직상태
                        <select
                            name='status'
                            value={form.status}
                            onChange={onChangeHandler}
                        >
                            <option value="">선택</option>
                            <option value="ACTIVE">재직중</option>
                            <option value="NONACTIVE">휴가</option>
                            <option value="DELETED">퇴사</option>
                        </select>
                    </label>

                    <br/>

                    <label>
                        입사일 기준
                        <input
                            type="date"
                            name="joinedAt"
                            value={form.joinedAt}
                            onChange={onChangeHandler}
                            min=""
                            max=""
                        />

                        <input
                            type="date"
                            name="endedAt"
                            value={form.endedAt}
                            onChange={onChangeHandler}
                            min=""
                            max={handleDate(getCurrentDate)}
                        />

                    </label>

                    <br/>

                    <button type='reset' onClick={() => setForm(initializeMemberForm())}>초기화</button>
                    <button type="submit">조회</button>
                </form>
            </div>

            <div>
                <h1>발급란</h1>

                <table>

                    <thead>
                    <tr>
                        <th>No</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.NO, 0)
                            }}>.
                            </button>
                        </th>
                        <th>아이디</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.ID, 1)
                            }}>.
                            </button>
                        </th>
                        <th>이름</th>
                        <th>
                                <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.NAME, 2)
                            }}>.
                            </button>
                        </th>
                        <th>성별</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.GENDER, 3)
                            }}>.
                            </button>
                        </th>
                        <th>생년월일</th>
                        <th>나이</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.AGE, 4)
                            }}>.
                            </button>
                        </th>
                        <th>연락처</th>
                        <th>주소</th>
                        <th>이메일</th>
                        <th>부서</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.ROLE, 5)
                            }}>.
                            </button>
                        </th>
                        <th>재직 상태</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.STATUS, 6)
                            }}>.
                            </button>
                        </th>
                        <th>입사일</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.JOINED_AT, 7)
                            }}>.
                            </button>
                        </th>
                        <th>퇴사일</th>
                        <th>
                            <button type="button" onClick={() => {
                                handleSort(MEMBER_FORM_TYPE.ENDED_AT, 8)
                            }}>.
                            </button>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {inquiryInfos &&
                        inquiryInfos.map((info, index) => (
                            <tr key={info.id}>

                                <td colSpan="2">{info.no}</td>
                                <td colSpan="2">{info.id}</td>
                                <td colSpan="2">{info.name}</td>
                                <td colSpan="2">{info.gender}</td>
                                <td>{info.birth}</td>
                                <td colSpan="2">{info.age}</td>
                                <td>{info.phone}</td>
                                <td>{info.address}</td>
                                <td>{info.email}</td>
                                <td colSpan="2">{info.role}</td>
                                <td colSpan="2">{info.status}</td>
                                <td colSpan="2">{info.joinedAt}</td>
                                <td colSpan="2">{!info.endedAt ? '미정' : info.endedAt}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </>
    )
}

export default DetailsView