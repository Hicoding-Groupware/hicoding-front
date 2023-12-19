<div align=center> 
  <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/3d078492-4cc5-4b4f-8060-bd35f78f8359.PNG" width="300" height="150"/></div>

<br>
<br>

<div align="center">
    HAHYEON &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    HYEOK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    JUNHONG &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    WOOSEOK &nbsp;&nbsp;&nbsp;
    <br>
    <br>
    <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/281ebcf8-029b-400a-888d-88bce79151a8" width="130" height="130"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/956e797b-0a72-4fc6-b6ac-adae9606a45a" width="130" height="130"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/0c8f6abb-e857-4e01-acfc-656b4e65f81e" width="130" height="130"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/12a7b9d6-93a9-4b5f-bad9-509892567a0a" width="130" height="130"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </a>
</div>
<br><br>

## :clipboard: 개요
- 초기에 애완용품 쇼핑몰을 구상하면서 주인이없는 소외동물을 도와줄 수 있는 방법을 생각하고,
이에 많은 사람들이 소외동물을 도와줄 수 있는 수단인 기부에 쉽게 접근 할 수 있도록 적립금을 기부할 수 있는 반려동물 용품 쇼핑몰 제작을 기획.
      <br>
- 개발기간 : 2023.09.26 ~ 2023.10.20 (약 4주)
- 개발인원 : FullStack 4명     

## :clipboard: 개발환경
* IntelliJ
* Oracle
* Spring
* GitHub
<br>
<div align=left><h2>📚 FRONT-END</h2></div>

<div align=left> 
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <br>
</div>

<div align=left><h2>📚 BACK-END</h2></div>

<div align=left>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
  <img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white"> 
  <br>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
  <br>
</div>  

## 주요 기능
- 상품조회, 게시판 관리
- 주문, 결제
- 로그인, 회원가입
- 주문, 기부금 관리
- 적립금을 활용한 후원 기능

## :link: ERD 설계
* [shopping mall ERD](https://github.com/didrlgus/springboot-shoppingmall/issues/1)


# 화면

- #### 메인화면

 <p align="center"><img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/ac14661d-8edb-4e0a-b951-f730ba96f43c" width="1000" height="800"/></p>



- #### 상품 페이지
  

- **슬라이드, 상품리스트**

   1. setTimeout과index를 이용한 배너 슬라이드.

   2. Thymeleaf 를 설정해 데이터를 list로 가져와 메인화면 구성.

   3. Mybatis 동적 쿼리문을 이용하여 상품 리스트 구성.


- **상세페이지**

   1. Review, 상품 문의 작성 기능.

   2. Q&A 작성시 Modal 활성화.

    

- #### 게시판



 - **리스트, 페이징**
   
   1. Mybatis 동적 쿼리문을 이용하여 카테고리별 검색, 리스트, 순서, 페이징을 처리하여 게시판 구성. 

   2. Modal을 활용한 작성 팝업창 on off .
  
   3. Review , QNA 등 게시판 구역 세분화.


- #### 장바구니

   
 - **장바구니, 구매하기 기능**
   
   1. 장바구니 클릭 시 선택한 상품이 장바구니 리스트에 등록된후 팝업창 알림.
   
   2. 중복값 저장 불가.
  
   3. Json을 이용해 장바구니내 상품 수정.
  
   4. 체크박스와 form태그 생성을 이용하여 주문페이지 전송.
  
  
  

 - **주문페이지**
   
  1. 구매자 정보 입력 후 결제 진행.
  
  2. 적립금 후원여부 확인 후 전송.




- #### 로그인, 회원가입, 마이페이지

 - **로그인 기능**
 
    1. Spring Security 프레임워크를 통한 세션방식의 인증&인가 기능 처리.


 - **회원가입 기능**  

    1. 입력된 폼 양식 데이터를 바탕으로 회원 DB에 저장.
    2. JS문법 또는 정규식으로 통한 입력 조건 제한 로직 구현.    


    
 - **아이디 저장 기능, 로그인 유지 기능**
 
    1. 쿠키 생성과 LocalStorage 저장 기능을 통해 체크 버튼을 반영구 저장 방식으로 비/활성화 가능
    
    2. 아이디 저장 선택 시, LocalStorage에서 ID를 가져오기.
    
    3. 로그인 유지 선택 시, Spring Security Remember-me 기능을 통해 지정 유지 시간동안 쿠키 값이 사라져도 계속 생성시켜 강제 로그인 유지 가능
    
 
 - **아이디 찾기 기능, 비밀번호 찾기 기능**

   1. 회원 DB 정보들을 바탕으로 아이디를 조회 가능, 비밀번호는 임시 비밀번호를 발급 및 암호화 처리

- **마이페이지 기능**

   1. MyBatis를 활용한 회원 교환, 환불 취소, 상태 변경.
 
   2. 교환, 환불 시 사유 입력후 DB에 저장.


  
 - **회원가입 기능**

    1. 입력된 아이디가 회원 DB에 존재하는지 확인하는 중복검사 기능
    2. 비밀번호 입력 조건 로직
    3. 주소검색 입력 API
    4. 회원가입 처리 버튼 입력 시 회원DB 저장
  
 - **마이페이지 회원정보 수정**
 
  1. 로그인된 멤버 정보를 불러와 수정 시 DB 재 갱신
  2. 회원탈퇴 버튼 누를 경우 DB 활성화 상태를 비활성화로 만들어 탈퇴 유저로 처리

- **마이페이지 주문내역 조회**

  1. 주문내역 아이템들을 부분 선택 혹은 전체 선택 가능이 하고, 선택된 만큼 교환/반품/주문취소 상태로 사유와 함께 전송할 수 있게 처리



- #### 정산관리


 <p align="left">
   <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/10e8fbd3-4f1a-4297-bd55-8b751b21b6ba" width="400" height="250"/>
 </p>


 - **매출 조회**
 
  1. List<>와 타임리프를를 활용한 Today 매출 조회.


 - **기간별 매출 검색**
 
   1. JSON을 활용한 서버연결, 동적 쿼리문 문법으로 조회.




<p align="left">
   <img src="https://github.com/gibuhagae/gibuhagae/assets/138549312/fe02c1c4-907a-4b48-88d8-e93aaeac3e4e" width="600" height="250"/>
 </p>



- #### 배송관리  

 1. Mybatis 동적 쿼리문 문법들을 활용한 운송장 등록, 조회, 배송상태 수정.

 2. Modal창을 활용한 취소 내역 조회 기능 활성화.

 3. 서로 다른 동적쿼리문으로 주문현황 조회, 상태 변경.
