import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const ThirdStep = () => {
    return (
        <>
        <p>회원가입을 위해</p>
        <p>개인정보를 입력해주세요.</p>

        <p>이름</p>
        <p>필수</p>
        <Input
        id="name"
        type="text"
        placeholder="예) 홍길동."
        />
        <p>전화번호</p>
        <p>필수</p>
        <Input
        id="phone"
        type="text"
        placeholder="예) 010-0000-0000"
        />
        <p>주소</p>
        <p>필수</p>
        <Input
        id="address"
        type="text"
        placeholder="예) 상세주소까지 모두 입력해주세요."
        />
        <p>차량소유여부</p>
        <p>필수</p>
        <div>
        <Button>예</Button>
        <Button>아니요</Button>
        </div>
        <p>치매교육 이수 여부</p>
        <div>
        <Button>예</Button>
        <Button>아니요</Button>
        </div>

        <p>자격증 등록</p>
        <Button>요양보호사</Button>
        {/* 요양보호사 자격증 체크시 인풋 활성화 */}
        <Input
        id="certificate1"
        type="text"
        placeholder="요양보호사 자격증번호 입력해주세요."
        />


        <Button>간병사</Button>
        <Input
        id="certificate2"
        type="text"
        placeholder="간병사 자격증번호 입력해주세요."
        />

<Button>병원동행매니저</Button>
        <Input
        id="certificate3"
        type="text"
        placeholder="병원동행매니저 자격증번호 입력해주세요."
        />

<Button>산후관리사</Button>
        <Input
        id="certificate4"
        type="text"
        placeholder="산후관리사 자격증번호 입력해주세요."
        />

<Button>기타</Button>
        <Input
        id="certificate5"
        type="text"
        placeholder="기타 자격증번호 입력해주세요."
        />


<Button>가입하기</Button>

        </>
    )
}

export default ThirdStep;
