<br>
<div align="center">

**Notable Block**은 블록체인과 파일 확장 속성을 통해 문서의 출처를 증명하고, 작성과 공유까지 지원하는 스마트 에디터 플랫폼입니다.

<br>
<a target="blank" href="https://notable-block.com/login">
  <img width="450px" alt="Notable Block 아이콘" src=https://github.com/user-attachments/assets/2dbb0ee3-9cda-4f71-b444-05604a0f2ddb>
</a>

<br>
<br>

[<img alt="배포 입장 버튼" src=https://github.com/user-attachments/assets/1a5ab70f-05cc-4c63-9004-28158e712085>](https://notable-block.com/login)

<br>

_디지털 문서는 쉽게 공유되지만, 누가 처음 작성했는지를 증명하는 건 어려운 문제입니다.  
문서의 작성부터 공유, 블록체인과 파일의 확장 속성으로 출처 증명까지 지원하는 플랫폼을 구현했습니다._

[서버 레포지토리](https://github.com/notableBlock/notableBlock-server) |
[블록체인 레포지토리](https://github.com/notableBlock/notableBlock-blockchain)

</div>

<br>
<span id="index"></span>
<br>

## 목차

<!-- toc -->

- [1. 프로젝트의 동기](#1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EB%8F%99%EA%B8%B0)
- [2. 프로젝트의 핵심 기능 소개](#2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)
- [3. 핵심 기능 구현 과정](#3-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%EA%B3%BC%EC%A0%95)
  - [3-1. 블록 기반 스마트에디터 구현](#3-1-%EB%B8%94%EB%A1%9D-%EA%B8%B0%EB%B0%98-%EC%8A%A4%EB%A7%88%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0-%EA%B5%AC%ED%98%84)
    - [(1) 고민: 자유롭게 작성하면서도 구조화된 노트를 만들 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%9E%90%EC%9C%A0%EB%A1%AD%EA%B2%8C-%EC%9E%91%EC%84%B1%ED%95%98%EB%A9%B4%EC%84%9C%EB%8F%84-%EA%B5%AC%EC%A1%B0%ED%99%94%EB%90%9C-%EB%85%B8%ED%8A%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 블록 단위로 구성된 직관적이고 유연한 에디터](#2-%EA%B5%AC%ED%98%84-%EB%B8%94%EB%A1%9D-%EB%8B%A8%EC%9C%84%EB%A1%9C-%EA%B5%AC%EC%84%B1%EB%90%9C-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9D%B4%EA%B3%A0-%EC%9C%A0%EC%97%B0%ED%95%9C-%EC%97%90%EB%94%94%ED%84%B0)
    - [(3) 결과: 단축키로 빠르게, 블록 단위로 유연하게 작성할 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%EB%8B%A8%EC%B6%95%ED%82%A4%EB%A1%9C-%EB%B9%A0%EB%A5%B4%EA%B2%8C-%EB%B8%94%EB%A1%9D-%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%9C%A0%EC%97%B0%ED%95%98%EA%B2%8C-%EC%9E%91%EC%84%B1%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-2. 노트 내용을 미리볼 수 있는 노트 뷰어 기능](#3-2-%EB%85%B8%ED%8A%B8-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%AF%B8%EB%A6%AC%EB%B3%BC-%EC%88%98-%EC%9E%88%EB%8A%94-%EB%85%B8%ED%8A%B8-%EB%B7%B0%EC%96%B4-%EA%B8%B0%EB%8A%A5)
    - [(1) 고민: 에디터 페이지까지 가지 않고도 노트의 내용을 미리 볼 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%97%90%EB%94%94%ED%84%B0-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B9%8C%EC%A7%80-%EA%B0%80%EC%A7%80-%EC%95%8A%EA%B3%A0%EB%8F%84-%EB%85%B8%ED%8A%B8%EC%9D%98-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%AF%B8%EB%A6%AC-%EB%B3%BC-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 읽기 전용 구조와 안전한 텍스트 렌더링 구조](#2-%EA%B5%AC%ED%98%84-%EC%9D%BD%EA%B8%B0-%EC%A0%84%EC%9A%A9-%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%95%88%EC%A0%84%ED%95%9C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B5%AC%EC%A1%B0)
    - [(3) 결과: 페이지 이동 없이 노트의 내용을 미리 볼 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99-%EC%97%86%EC%9D%B4-%EB%85%B8%ED%8A%B8%EC%9D%98-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%AF%B8%EB%A6%AC-%EB%B3%BC-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-3.xattr 기반 메타데이터 설계 및 블록체인 연동](#3-3xattr-%EA%B8%B0%EB%B0%98-%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%84%A4%EA%B3%84-%EB%B0%8F-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%97%B0%EB%8F%99)
    - [(1) 고민: 노트의 출처를 안전하게 저장하고 복원할 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EB%85%B8%ED%8A%B8%EC%9D%98-%EC%B6%9C%EC%B2%98%EB%A5%BC-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B3%A0-%EB%B3%B5%EC%9B%90%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: .tar 아카이브와 xattr 메타데이터, 블록체인을 통한 원본 검증](#2-%EA%B5%AC%ED%98%84-tar-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B8%8C%EC%99%80-xattr-%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%9B%90%EB%B3%B8-%EA%B2%80%EC%A6%9D)
    - [(3) 결과: 노트를 누가 만들었는지 검증할 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%EB%85%B8%ED%8A%B8%EB%A5%BC-%EB%88%84%EA%B0%80-%EB%A7%8C%EB%93%A4%EC%97%88%EB%8A%94%EC%A7%80-%EA%B2%80%EC%A6%9D%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-4. .tar 아카이브 기능 지원](#3-4-tar-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B8%8C-%EA%B8%B0%EB%8A%A5-%EC%A7%80%EC%9B%90)
    - [(1) 고민: 외부 프로그램 없이 .tar 파일로 아카이브 할 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%99%B8%EB%B6%80-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EC%97%86%EC%9D%B4-tar-%ED%8C%8C%EC%9D%BC%EB%A1%9C-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B8%8C-%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 서버에서 .tar 파일을 만들고 바로 다운로드 되도록 구성](#2-%EA%B5%AC%ED%98%84-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-tar-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EB%A7%8C%EB%93%A4%EA%B3%A0-%EB%B0%94%EB%A1%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%90%98%EB%8F%84%EB%A1%9D-%EA%B5%AC%EC%84%B1)
    - [(3) 결과: 클릭 한 번으로 .tar 파일로 아카이브할 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%ED%81%B4%EB%A6%AD-%ED%95%9C-%EB%B2%88%EC%9C%BC%EB%A1%9C-tar-%ED%8C%8C%EC%9D%BC%EB%A1%9C-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B8%8C%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-5. 라이브러리 없이 구현한 SSE 기반 실시간 알림 시스템](#3-5-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-%EA%B5%AC%ED%98%84%ED%95%9C-sse-%EA%B8%B0%EB%B0%98-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC-%EC%8B%9C%EC%8A%A4%ED%85%9C)
    - [(1) 고민: 사용자에게 알림은 언제, 왜 필요할까?](#1-%EA%B3%A0%EB%AF%BC-%EC%82%AC%EC%9A%A9%EC%9E%90%EC%97%90%EA%B2%8C-%EC%95%8C%EB%A6%BC%EC%9D%80-%EC%96%B8%EC%A0%9C-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%A0%EA%B9%8C)
    - [(2) 구현: MongoDB Change Stream과 SSE를 활용한 실시간 알림 시스템](#2-%EA%B5%AC%ED%98%84-mongodb-change-stream%EA%B3%BC-sse%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC-%EC%8B%9C%EC%8A%A4%ED%85%9C)
    - [(3) 결과: 사용자는 노트의 흐름을 실시간으로 추적하고, 놓친 알림도 다시 확인할 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%EC%82%AC%EC%9A%A9%EC%9E%90%EB%8A%94-%EB%85%B8%ED%8A%B8%EC%9D%98-%ED%9D%90%EB%A6%84%EC%9D%84-%EC%8B%A4%EC%8B%9C%EA%B0%84%EC%9C%BC%EB%A1%9C-%EC%B6%94%EC%A0%81%ED%95%98%EA%B3%A0-%EB%86%93%EC%B9%9C-%EC%95%8C%EB%A6%BC%EB%8F%84-%EB%8B%A4%EC%8B%9C-%ED%99%95%EC%9D%B8%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-6. 트리 차트를 활용한 노트 구조 시각화](#3-6-%ED%8A%B8%EB%A6%AC-%EC%B0%A8%ED%8A%B8%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%85%B8%ED%8A%B8-%EA%B5%AC%EC%A1%B0-%EC%8B%9C%EA%B0%81%ED%99%94)
    - [(1) 고민: 사용자에게 어떻게 노트가 파생되었는지 편리하게 보여줄 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%82%AC%EC%9A%A9%EC%9E%90%EC%97%90%EA%B2%8C-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%85%B8%ED%8A%B8%EA%B0%80-%ED%8C%8C%EC%83%9D%EB%90%98%EC%97%88%EB%8A%94%EC%A7%80-%ED%8E%B8%EB%A6%AC%ED%95%98%EA%B2%8C-%EB%B3%B4%EC%97%AC%EC%A4%84-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 노트 데이터를 트리 구조로 변환하고 D3.js를 활용한 시각화](#2-%EA%B5%AC%ED%98%84-%EB%85%B8%ED%8A%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%ED%8A%B8%EB%A6%AC-%EA%B5%AC%EC%A1%B0%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EA%B3%A0-d3js%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8B%9C%EA%B0%81%ED%99%94)
    - [(3) 결과: 노트의 파생과 관계를 한눈에 이해할 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%EB%85%B8%ED%8A%B8%EC%9D%98-%ED%8C%8C%EC%83%9D%EA%B3%BC-%EA%B4%80%EA%B3%84%EB%A5%BC-%ED%95%9C%EB%88%88%EC%97%90-%EC%9D%B4%ED%95%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-7. 리프레쉬 토큰, 액세스 토큰을 활용한 로그아웃 없는 로그인 유지](#3-7-%EB%A6%AC%ED%94%84%EB%A0%88%EC%89%AC-%ED%86%A0%ED%81%B0-%EC%95%A1%EC%84%B8%EC%8A%A4-%ED%86%A0%ED%81%B0%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83-%EC%97%86%EB%8A%94-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80)
    - [(1) 고민: 로그인 상태를 어떻게 안정적으로 유지할 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%95%88%EC%A0%95%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%9C%A0%EC%A7%80%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 자동 로그인 흐름과 쿠키 기반 상태 유지](#2-%EA%B5%AC%ED%98%84-%EC%9E%90%EB%8F%99-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9D%90%EB%A6%84%EA%B3%BC-%EC%BF%A0%ED%82%A4-%EA%B8%B0%EB%B0%98-%EC%83%81%ED%83%9C-%EC%9C%A0%EC%A7%80)
    - [(3) 결과: 로그인 상태가 유지되어 서비스 흐름이 끊기지 않습니다.](#3-%EA%B2%B0%EA%B3%BC-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C%EA%B0%80-%EC%9C%A0%EC%A7%80%EB%90%98%EC%96%B4-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%9D%90%EB%A6%84%EC%9D%B4-%EB%81%8A%EA%B8%B0%EC%A7%80-%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4)
- [4. 프로젝트의 정보](#4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%A0%95%EB%B3%B4)
  - [4-1. 기술 스택](#4-1-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  - [4-2. 프로젝트의 구조](#4-2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EA%B5%AC%EC%A1%B0)
    - [(1) Zustand를 활용한 전역 상태 관리](#1-zustand%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC)
    - [(2) 코드 효율성을 위한 공통 컴포넌트 설계](#2-%EC%BD%94%EB%93%9C-%ED%9A%A8%EC%9C%A8%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B3%B5%ED%86%B5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%84%A4%EA%B3%84)
    - [(3) 관심사 분리 원칙(Separation of Concerns, SoC)에 입각한 커스텀 훅 구성](#3-%EA%B4%80%EC%8B%AC%EC%82%AC-%EB%B6%84%EB%A6%AC-%EC%9B%90%EC%B9%99separation-of-concerns-soc%EC%97%90-%EC%9E%85%EA%B0%81%ED%95%9C-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%9B%85-%EA%B5%AC%EC%84%B1)
    - [(4) 중복을 줄이기 위한 중첩 라우팅을 활용한 공통 UI 구성](#4-%EC%A4%91%EB%B3%B5%EC%9D%84-%EC%A4%84%EC%9D%B4%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%A4%91%EC%B2%A9-%EB%9D%BC%EC%9A%B0%ED%8C%85%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EA%B3%B5%ED%86%B5-ui-%EA%B5%AC%EC%84%B1)
    - [(5) 컴포넌트 구조의 가독성을 높이는 S-dot 네이밍 컨벤션 적용](#5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%EC%A1%B0%EC%9D%98-%EA%B0%80%EB%8F%85%EC%84%B1%EC%9D%84-%EB%86%92%EC%9D%B4%EB%8A%94-s-dot-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%A0%81%EC%9A%A9)
- [5. 회고](#5-%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

# 1. 프로젝트의 동기

학부 시절, 8개월간 광역자치단체에서 청년 복지 이슈를 분석하고, 시정에 맞는 정책을 제안한 경험이 있습니다.  
그 과정에서 일부 청년들이 소득 등을 위조해 전세자금 등의 복지 혜택을 부정취득하고,  
이로 인해 정작 도움이 필요한 청년들이 지원에서 배제되고 있다는 현실을 경험한 적이 있습니다.

이 경험을 통해 공문서 및 사문서 위조의 심각성을 인식하게 되었고,  
“누구든지 문서의 진위와 원본 소유자를 쉽게 확인할 수 있다면 어떨까?”  
라는 이 작은 질문에 대한 해답을 찾고자, 본 프로젝트를 시작하게 되었습니다.

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

# 2. 프로젝트의 핵심 기능 소개

## 스마트에디터 기능

<div align="center">
  <img width="600px" alt="스마트에디터 시연" src="https://github.com/user-attachments/assets/064a0efd-7191-41cc-a4d9-9d0da256e39c" />
</div>

<br>


- "/" 키 입력 또는 드래그 버튼 클릭으로 슬래시 명령어 메뉴를 열 수 있습니다.
  - /h1, /h2, /h3, /img 명령을 직접 입력해 텍스트 변환 또는 이미지 첨부가 가능하며, 메뉴 클릭으로도 선택할 수 있습니다.
  - 메뉴는 ArrowUp, ArrowDown 방향키 또는 마우스 클릭으로 조작할 수 있으며, ESC 키로 닫을 수 있습니다.
- 자동 저장 기능이 내장되어, 저장 버튼 없이도 실시간으로 편집 내용이 저장됩니다.
- 노트는 블록 단위로 작성되며, Enter 키로 새 블록 추가, Shift + Enter 키로 줄바꿈을 할 수 있습니다.
- Backspace 키로 내용이 없는 블록을 삭제할 수 있으며, 내용이 있는 블록은 삭제되지 않습니다.
- ArrowUp, ArrowDown 방향키로 블록 간 포커스를 이동할 수 있으며, 드래그 버튼으로 블록 위치를 자유롭게 재배치할 수 있습니다.

<br>

## 노트 뷰어 기능

<div align="center">
  <img width="600px" alt="노트 뷰어 시연" src="https://github.com/user-attachments/assets/797ebc03-4b74-4e1b-8b29-47d2fae87681" />
</div>

<br>

- 에디터 페이지로 이동하지 않아도, 노트 뷰어 기능을 통해 사용자가 작성한 내용을 미리볼 수 있습니다.
- 생성일, 마지막 수정일, 생성자, 수정자, 공유 여부 등을 확인 할 수 있습니다.
- 케밥 메뉴 버튼을 통해 노트 공유, 내보내기, 삭제 등의 기능을 사용할 수 있습니다.

<br>

## 노트 내보내기 및 가져오기 기능

<div align="center">
  <img width="600px" alt="노트 내보내기 및 가져오기 시연" src="https://github.com/user-attachments/assets/c33885c8-502e-48eb-8cf1-d4757ea96ce0" />
</div>

<br>

- 노트는 .tar 파일 형태로 로컬로 내보낼 수 있습니다.
  - 이때 마크다운 본문, 첨부 이미지, 생성자/노트 ID 등의 메타데이터가 함께 저장됩니다.
  - 메타데이터는 xattr 확장 속성을 통해 안전하게 보존됩니다.
- 사용자는 .tar 파일을 Notable Block 서비스에 다시 가져와 노트를 등록할 수 있습니다.
- 가져온 노트가 블록체인에 등록된 적이 있는 원본 노트일 경우, 해당 노트가 “원본이 있는 노트”임을 사용자에게 알림으로 표시합니다.
  - 이때, 원본 노트를 생성한 사용자에게도 해당 노트가 가져와졌다는 사실이 알림으로 전달되어, 이를 인지할 수 있습니다.
- 하나의 .tar 파일에 여러 개의 마크다운 파일이 포함되어 있어도 문제없이 업로드할 수 있습니다.
- 파일을 선택하여 업로드하는 방식 외에도, 드래그 앤 드롭을 통해 간편하게 가져올 수 있습니다.

<br>

## 마크다운 및 이미지 파일 .tar 아카이브 기능

<div align="center">
  <img width="600px" alt=".tar 아카이브 시연" src="https://github.com/user-attachments/assets/9b06eead-de0f-473f-87a5-6febd509da07" />
</div>

- 사용자는 외부 프로그램 없이, Notable Block 서비스 내 기능만으로 마크다운 파일과 이미지를 .tar 파일 형식으로 아카이브할 수 있습니다.
- 이미지가 포함된 경우, 내부 assets/ 폴더에 자동으로 정리되어 함께 저장됩니다.
- 여러 마크다운 파일도 하나의 .tar 파일로 묶어, 추후 가져오기 시 편리하게 업로드할 수 있습니다.
- 파일 선택 외에도 드래그 앤 드롭하여 간편하게 아카이브할 수 있습니다.

<br>

## 실시간 알림 및 알림허브 기능

<div align="center">
  <img width="600px" alt="실시간 알림 및 알림허브 기능 시연" src="https://github.com/user-attachments/assets/2e3969fd-a676-40ab-a31f-0d4b194fc85d" />
</div>

<br>

- 사용자 본인의 노트를 생성, 공유, 삭제했을 경우 실시간 알림을 수신합니다.
  - 공유 알림에는 해당 노트로 바로 이동할 수 있는 링크 버튼도 함께 제공됩니다.
- 다른 사용자가 사용자의 노트를 복사했거나 로컬에서 가져온 경우에도 알림을 받을 수 있습니다.
- 알림 허브를 통해 그동안 수신한 알림을 확인할 수 있고 알림을 전체 삭제하거나 개별 삭제할 수 있습니다.

<br>

## 노트 트리차트 기능

<div align="center">
  <img width="600px" alt="노트 트리차트 시연" src="https://github.com/user-attachments/assets/1766851c-8fd6-4eab-9f3e-1fe4ce99706c" />
</div>

<br>

- 사용자의 노트가 어디에서 파생되고, 어디로 확산 및 공유되었는지를 트리 구조로 시각화하여, 이력을 한눈에 확인할 수 있도록 제공합니다.
- 트리 차트 상단에는 사용자의 이해를 돕기 위해 간단한 이용 방법이 함께 제공됩니다.
- 사용자는 마우스 조작을 통해 다음 기능을 사용할 수 있습니다.
  - 휠: 화면 확대/축소
  - 드래그: 화면 이동
  - 호버: 노트 정보 표시
  - 클릭: 해당 노트 상세 페이지로 이동

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

# 3. 핵심 기능 구현 과정

## 3-1. 블록 기반 스마트에디터 구현

### (1) 고민: 자유롭게 작성하면서도 구조화된 노트를 만들 수 있을까?

단순한 텍스트 입력을 넘어서, 사용자가 텍스트와 이미지를 블록 단위로 자유롭게 편집하고 구성할 수 있는 에디터가 필요하다고 판단했습니다.  
예를 들어, 단축키만으로 블록을 추가하거나, 블록의 타입을 전환할 수 있는 직관적인 상호작용을 제공해 사용자 경험을 개선하고자 했습니다.

초기에는 HTML의 기본 속성인 `contentEditable`을 직접 활용해 구현을 시도했으나, 곧 몇 가지 중요한 예외 사항을 맞닥뜨리게 되었습니다.

- 리액트의 가상 DOM과 실제 DOM 간의 충돌
- 사용자 입력과 관련된 동기화 문제
- 렌더링 시 `children` 노드가 예고 없이 덮어씌워지는 현상

이러한 예외 사항을 해결하면서도 안정적인 개발을 이어가기 위해, 리액트 환경에 적합한 경량 라이브러리인 **react-contenteditable**을 도입하게 되었습니다.  
이 라이브러리는 텍스트 입력, 커서 이동, 선택 영역 처리 등 기본적인 콘텐츠 편집 기능만을 제공하면서도, 리액트와의 높은 호환성을 유지해 복잡한 DOM 제어 없이 에디터 기능을 구현할 수 있도록 도와주는 라이브러리입니다.

하지만 라이브러리를 도입한다고 해서 모든 예외 사항이 해결되는 건 아니었습니다.  
에디터의 핵심 상호작용인 키보드 이벤트 제어도 새롭게 정의해야 했습니다.

- **Enter** 키는 단순 줄바꿈이 아니라 새로운 블록 생성으로 동작해야 했습니다.
- **Backspace** 키는 입력 내용이 비어 있을 경우에만 블록 삭제가 이뤄지도록 조건부 처리되어야 했습니다.
- **ArrowUp/ArrowDown 방향키** 역시 문장 내 커서 이동이 아닌, 블록 간 포커스 전환이라는 새로운 동작으로 재설계되어야 했습니다.

<br>

이 과정에서 가장 까다로웠던 부분은 커서 위치 제어였습니다.
슬래시 명령 메뉴를 띄우거나, 새로운 블록으로 포커스를 이동할 때,  
기존의 브라우저 기본 동작을 제어하면서도 사용자의 기대에 부합하는 위치에 정확히 커서를 유지하는 것이 필수적이었습니다.

이러한 고민들을 하나씩 풀어가며, 단순히 작동하는 에디터를 넘어서
입력 흐름과 블록 구조가 자연스럽게 이어지는 **사용자 중심 에디터**를 구현했습니다.

<br>

### (2) 구현: 블록 단위로 구성된 직관적이고 유연한 에디터

각 블록은 `{ id, html, tag, imageUrl }` 구조를 가지며, 전체 노트는 이 블록들의 배열로 표현됩니다.  
사용자는 키보드만으로도 블록을 생성하고 삭제하며, 위 아래 방향키로 자유롭게 포커스를 전환할 수 있습니다.

#### 1. 블록 생성과 자동 포커싱

사용자가 Enter 키를 입력하면, 현재 커서가 위치한 블록 바로 아래에 새로운 블록이 생성됩니다.  
이때 `useState`의 상태 갱신 함수에 콜백을 전달하여 현재 블록 위치를 기준으로 새로운 블록을 삽입합니다.

```jsx
setBlocks((prevBlocks) => {
  const currentBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlock.id);
  const newBlock = { ...initialBlock, id: uuidv4(), tag: "p" };

  return [
    ...prevBlocks.slice(0, currentBlockIndex + 1),
    newBlock,
    ...prevBlocks.slice(currentBlockIndex + 1),
  ];
});
```

이와 동시에 커서가 새로 생성된 블록으로 이동되도록 `currentBlockId` 상태를 업데이트하며,  
이후 `focusNextBlock()` 또는 `focusPrevBlock()` 함수에서 이 `id`를 기준으로 커서가 자동 전환됩니다.

이 과정에서 변경 전 블록 배열을 추적하기 위해 `usePrevBlocks` 커스텀 훅을 사용합니다.  
이 훅은 `useRef`를 활용하여 렌더링 전의 `blocks` 상태를 저장하며, 블록 수가 변경되었는지를 감지하는 데 활용됩니다.  
예를 들어 `prevBlocks.length + 1 === blocks.length`이면 새 블록이 추가된 것이고,
`prevBlocks.length - 1 === blocks.length`이면 블록이 삭제되었음을 의미합니다.

```js
const usePrevBlocks = (blocks) => {
  const prevBlocksRef = useRef([]);

  useEffect(() => {
    prevBlocksRef.current = blocks;
  }, [blocks]);

  return prevBlocksRef.current;
};
```

#### 2. 방향키에 따른 커서 이동 제어

사용자가 텍스트를 입력하는 도중 ArrowUp/ArrowDown 방향키를 누르면, 커서가 현재 블록을 기준으로 이전 또는 다음 블록으로 이동됩니다.  
이때 중요한 점은 이미지 블록은 건너뛰고, 텍스트 블록만 포커싱 대상이 되어야 한다는 점입니다.

이를 위해 `handleFocusBlockByArrowKey` 함수는 현재 포커싱된 블록의 ID를 기준으로 다음 텍스트 블록을 탐색하며,  
이미지 블록은 건너뛰도록 구성했습니다.  
커서 이동이 가능한 블록이 발견되면, `moveCaretToEnd()` 유틸 함수를 통해 해당 블록의 끝으로 커서를 정확히 이동시킵니다.

```jsx
const handleFocusBlockByArrowKey = (currentBlock, arrowKey) => {
  const currentIndex = blocks.findIndex((b) => b.id === currentBlock.id);
  let targetIndex = arrowKey === "ArrowUp" ? currentIndex - 1 : currentIndex + 1;

  while (blocks[targetIndex]?.tag === "img") {
    targetIndex += arrowKey === "ArrowUp" ? -1 : 1;
  }

  const targetBlock = blocksRef.current[blocks[targetIndex]?.id];
  if (targetBlock) {
    moveCaretToEnd(targetBlock);
    targetBlock.focus();
  }
};
```

<br>

커서를 정확히 제어하기 위해 DOM 레벨의 `Range`, `Selection API`를 직접 활용했습니다.  
커서를 블록의 끝으로 이동시키는 유틸 함수인 `moveCaretToEnd`는 다음과 같이 구성되어 있습니다.

```js
const range = document.createRange();
range.selectNodeContents(element);
range.collapse(false);
selection.removeAllRanges();
selection.addRange(range);
```

#### 3. 블록 상태의 자동 저장과 동기화

사용자가 입력하거나 블록을 추가, 삭제, 변경할 때마다 매번 저장 버튼을 누르게 하는 방식은 번거롭고 직관적이지 않다고 판단했습니다.  
따라서 모든 블록의 상태는 자동으로 저장되고 동기화되는 방식으로 구현했습니다.

이를 위해 각 블록의 상태는 `blocks`라는 전역 상태 배열로 관리되며,
상태가 변할 때마다 `useEffect`를 통해 서버에 저장 요청을 보냅니다.  
하지만 불필요한 네트워크 요청을 줄이기 위해, 이전 블록 상태(`prevBlocks`)와 현재 상태를 비교한 뒤,
변경된 경우에만 저장 요청이 전송되도록 최적화했습니다.

```jsx
useEffect(() => {
  if (JSON.stringify(prevBlocks) === JSON.stringify(blocks)) return;
  updateNoteOnServer(blocks, onSaveStatus, noteId);
}, [blocks]);
```

#### 4. 슬래시 명령과 커서 좌표 기반 UI 제어

사용자가 슬래시(/) 키를 입력하면, 현재 커서 위치를 기준으로 명령어 메뉴가 화면에 표시됩니다.  
이때 메뉴는 마우스 클릭이 아닌 커서의 실제 좌표에 정확히 위치해야 하므로,  
`getClientRects()` 유틸 함수를 활용해 현재 커서의 `x, y` 좌표를 계산하고, 해당 좌표를 기준으로 메뉴를 배치하였습니다.

```js
const coordinate = getCaretCoordinates(); // Selection과 Range API를 활용한 유틸 함수입니다.
setSelectMenuPosition({ x: coordinate.x, y: coordinate.y });
```

입력된 "/" 뒤로 사용자가 입력하는 문자열은 내부적으로 `command` 상태에 저장되며,  
이 값은 `match-sorter` 라이브러리를 이용해 메뉴 항목 중 해당 문자열과 가장 유사한 항목을 실시간으로 필터링합니다.

이후 ArrowUp/ArrowDown 방향키로 메뉴 항목을 탐색할 수 있고, Enter 키로 선택하면 해당 블록의 태그가 전환됩니다.
선택된 값이 "img"인 경우에는 자동으로 파일 선택창이 열리고,
그 외의 텍스트 태그인 경우에는 기존의 텍스트를 유지한 채 블록의 tag 속성만 전환됩니다.

또한 메뉴는 ESC 키 또는 Backspace 키로 닫을 수 있으며,
`document.addEventListener("click", ...)`를 통해 포커스가 외부로 나갈 경우 자동으로 닫히는 처리도 함께 포함되어 있습니다

```jsx
case "Enter":
  event.preventDefault();
  onSelect(items[selectionIndex].tag); // 선택된 tag로 블록이 전환됩니다.

case "ArrowDown":
  setSelectionIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
```

#### 5. 이미지 업로드와 서버 연동

사용자가 슬래시 명령 메뉴에서 "이미지"를 선택하면 파일 선택창이 자동으로 열리며,  
선택된 파일은 `multipart/form-data` 형태로 서버에 전송됩니다.

```jsx
const formData = new FormData();
formData.append("image", imageFile);
const uploadedUrl = await uploadNoteImage(noteId, formData);
setImageUrl(uploadedUrl);
```

서버는 이미지를 수신한 뒤 리사이징을 진행하고, 업로드된 이미지의 URL을 클라이언트에 반환합니다.  
에디터는 이 URL을 해당 블록의 `imageUrl` 속성으로 저장하여 렌더링에 활용합니다.

또한 사용자가 이미지 블록을 제거하면 서버 측에서도 해당 파일을 자동으로 삭제하도록 구성했습니다.  
서버에서 `fs.unlink`를 통해 구현했으며, 이를 통해 불필요한 이미지 자원도 남지 않게 처리했습니다.

```js
const clearImage = (imageName) => {
  const imagePath = path.join(__dirname, "..", "uploads", "images", imageName);
  fs.unlink(imagePath, (err) => console.log(err));
};
```

<br>

### (3) 결과: 단축키로 빠르게, 블록 단위로 유연하게 작성할 수 있습니다.

블록 단위 에디터를 구현함으로써 사용자는 글을 블록 단위로 시각화하여, 제목, 본문, 이미지 등을 명확하게 구분해 구성할 수 있습니다.
각 블록의 생성, 삭제, 이동이 키보드 입력만으로 자연스럽게 이뤄지는 마우스를 거의 사용하지 않아도 작성 흐름이 이어집니다.
또한 슬래시 명령으로 블록 유형을 빠르게 전환하고, 이미지 첨부도 흐름을 끊지 않으면서 이어지도록 설계하여, 유연한 사용감을 제공했습니다.
자동 저장과 이미지 정리 기능을 통해 별도의 저장 버튼 없이도 안정적으로 작업을 이어갈 수 있으며, 불필요한 리소스 누적도 방지했습니다.

<br>

<div align="center">
  <img width="600px" alt="노트 에디터 시연" src="https://github.com/user-attachments/assets/4f59ab6d-9725-4ac1-a122-b73e181351b8" />
  <p><em>텍스트 작성, 블록 추가, 이미지 삽입, 방향키 커서 이동 등의 전체 흐름</em></p>
</div>

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

## 3-2. 노트 내용을 미리볼 수 있는 노트 뷰어 기능

### (1) 고민: 에디터 페이지까지 가지 않고도 노트의 내용을 미리 볼 수 있을까?

노트의 내용을 확인하기 위해 항상 에디터 페이지로 이동해야 한다면, 사용자는 번거로운 페이지 전환을 반복하게 되며,
이는 사용자 경험을 저하시킵니다. 따라서 노트의 내용을 별도의 페이지 진입 없이 바로 확인할 수 있는, 간결하고 읽기 전용에 최적화된 인터페이스가 필요하다고 판단했습니다.

<br>

### (2) 구현: 읽기 전용 구조와 안전한 텍스트 렌더링 구조

노트 뷰어는 사용자의 빠른 읽기를 돕기 위해 이미지 블록은 렌더링에서 제외하고 텍스트 블록만 필터링하여 본문 내용을 간결하게 보여줍니다.
각 블록은 본문 내 HTML을 그대로 렌더링하지만, 안전한 출력만 허용하도록 XSS 방지 라이브러리인 `DOMPurify`를 통해 정제된 상태로 출력됩니다.
이를 통해 보안성을 유지하면서도, 노트의 구조와 스타일을 최대한 원본 그대로 유지할 수 있도록 했습니다.

```jsx
const HTMLTag = block.tag;
const html = DOMPurify.sanitize(block.html);

return <HTMLTag key={block.id} dangerouslySetInnerHTML={{ __html: html }} />;
```

노트 뷰어 헤더 부분에는 우측 상단에 소위 “케밥 버튼”이라 불리는 옵션 메뉴를 배치하여, 클릭한 위치를 기준으로 메뉴가 나타나도록 설계했습니다. 이 메뉴는 메뉴의 외부 영역을 다시 클릭하면 자동으로 닫히도록 설계해, 편리하게 조작할 수 있습니다.
이 기능은 `useOnClickOutside`라는 커스텀 훅을 이용하여 사용자 경험을 세심하게 고려해 구현했습니다.

<br>

### (3) 결과: 페이지 이동 없이 노트의 내용을 미리 볼 수 있습니다.

노트 뷰어 기능을 통해 사용자는 에디터 페이지로 이동하는 번거로움 없이, 노트 내용을 편리하게 확인할 수 있습니다.  
노트의 내용을 빠르고 간편하게 미리보기 형태로 확인할 수 있어, 전체적인 서비스 이용 흐름을 크게 개선했습니다.  
더불어 노트 뷰어에는 노트의 생성일과 마지막 수정일, 작성자 및 최근 수정자의 정보, 그리고 공유 여부까지 한눈에 확인할 수 있도록 표시되어, 노트의 관리와 정보 파악을 보다 편리하게 할 수 있습니다.

<br>

<div align="center">
  <img width="800px" alt="노트 뷰어 시연" src="https://github.com/user-attachments/assets/ee817e1a-4bb4-4115-95ab-20dfb4202026" />
  <p><em>노트 수정 후 노트 뷰어에서 내용을 확인하는 모습</em></p>
</div>

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

## 3-3.xattr 기반 메타데이터 설계 및 블록체인 연동

### (1) 고민: 노트의 출처를 안전하게 저장하고 복원할 수 있을까?

Notable Block 서비스는 사용자가 노트를 로컬로 내보내거나(마크다운 파일로 저장) 다시 가져오는 기능을 지원합니다.  
하지만 단순히 마크다운 파일을 저장하는 것만으로는 누가 생성한 노트인지, 그것이 원본인지 명확히 알 수 없는 문제가 있었습니다.

서비스 내부에서는 MongoDB에 저장된 생성자 ID와 노트 ID 등의 메타데이터를 통해 출처를 명확히 식별할 수 있지만,  
로컬 파일로 내보내는 순간부터 이러한 출처 정보가 쉽게 손실되거나 위변조될 가능성이 존재했습니다.  
결과적으로 노트를 다시 업로드할 때 서비스에서 이 노트를 완전히 새로운 문서로 잘못 인식하는 문제가 발생할 수 있었습니다.

처음 이 문제를 해결하기 위해, 본문에 보이지 않는 유니코드 문자인 Zero Width Character(ZWC) 를 사용하여 메타데이터를 숨기는 방식을 시도했습니다. 하지만 이 방법은 줄바꿈이나 복사 및 붙여넣기 과정에서 숨겨진 메타데이터가 쉽게 손상되거나 손실될 가능성이 컸고, 외부 마크다운 에디터마다 처리 방식이 달라 신뢰성이 떨어진다는 점에서 사용성과 안정성 측면에서 적합하지 않다는 결론에 이르렀습니다.

<br>

<div align="center">
  <img width="800px" alt="마크다운 내부에 ZWC가 포함된 모습" src="https://github.com/user-attachments/assets/e2f118a7-08d0-4f92-bdc5-2b374bc70086" />
  <p><em>마크다운 내부에 메타데이터가 숨겨져 있어 사용성이 저하되고 쉽게 사라질 수 있는 상황</em></p>
</div>

<br>

이러한 한계를 극복하기 위해 블록체인의 불변성(immutability)에 주목했습니다.  
블록체인에 기록된 데이터는 수정하거나 삭제할 수 없다는 특성을 활용하면, 노트의 메타데이터를 안정적이고 신뢰할 수 있게 보관할 수 있습니다. 즉, 블록체인에 노트의 생성자와 노트 ID를 등록하면, 사용자가 로컬에서 다시 가져온 노트의 출처가 실제로 등록된 적 있는 원본인지 명확히 검증할 수 있게 됩니다.

최종적으로는 .tar 아카이브와 xattr 메타데이터, 그리고 Solidity로 작성된 스마트 컨트랙트를 결합하여 출처 정보를 안전하게 보관하고 복원할 수 있는 현재의 설계를 채택했습니다.

<br>

### (2) 구현: .tar 아카이브와 xattr 메타데이터, 블록체인을 통한 원본 검증

메타데이터를 효과적으로 보존하고 복원하기 위해, 파일의 외부 확장 속성(xattr)을 활용했습니다.  
macOS와 일부 Linux 파일 시스템에서는 파일의 추가 정보를 외부 속성으로 저장할 수 있는 xattr 기능을 지원하는데,  
이를 통해 마크다운 내용과는 별도로 생성자 ID와 노트 ID를 안전하게 저장할 수 있었습니다.

단순히 마크다운 파일만 저장하면 노트에 포함된 이미지 파일은 함께 보존되지 않는 문제가 있습니다.
이를 해결하기 위해, 마크다운 파일과 해당 노트에서 사용된 이미지 파일을 함께 아카이브하여 하나의 .tar 파일로 통합 저장하도록 구성했습니다.

노트를 내보낼 때는 서버에서 tar 명령어를 사용하여 본문과 리소스를 아카이브하고,
xattr 명령어로 작성자 ID와 노트 ID를 별도의 메타데이터로 삽입하도록 구현했습니다.
서버에서는 이를 `child_process`의 `spawn`을 이용한 커스텀 유틸 함수(`runCommand`)로 안전하게 실행할 수 있도록 처리했습니다.

```js
await runCommand("tar", ["-cf", "note.tar", "note.md", "assets"]);
await runCommand("/usr/bin/xattr", ["-w", "user.creatorId", creatorId, "note.md"]);
```

또한, 노트의 원본 검증을 위해 Solidity로 작성된 스마트 컨트랙트 `NoteDataRegistry`를 Binance Smart Chain에 배포하여 노트의 생성자와 노트 ID를 블록체인에 등록할 수 있도록 구성했습니다.

노트를 다시 가져올 때는 아카이브를 풀고 추출한 메타데이터를 스마트 컨트랙트와 비교해 실제로 등록된 적이 있는 노트인지 여부를 확인할 수 있습니다. 이렇게 하면 사용자가 업로드한 노트가 원본인지에 대한 명확한 출처 검증이 가능합니다.

```solidity
function addNoteData(bytes32 _creatorId, bytes32 _noteId) public onlyOwner {
  require(noteData[_creatorId][_noteId].noteId == 0x0);
  noteData[_creatorId][_noteId] = NoteData({ creatorId: _creatorId, noteId: _noteId });
}
```

가져온 파일에서 xattr로 추출된 메타데이터는 다시 바이트 형태로 변환되어 스마트 컨트랙트의 `getNoteData()` 함수를 통해
실제로 블록체인에 등록된 적이 있는 데이터인지 확인할 수 있습니다.

이 과정을 통해, 가져온 노트가 블록체인에 등록된 노트인지 식별해 사용자에게 알려줄 수 있습니다.

<br>

### (3) 결과: 노트를 누가 만들었는지 검증할 수 있습니다.

이러한 방식을 통해 사용자는 노트를 로컬로 안전하게 내보내고, 다시 Notable Block 서비스에 가져올 때 출처 정보가 손실되지 않고 정확하게 복원됩니다.

xattr 메타데이터는 마크다운 본문에 영향을 주지 않으면서도 안정적으로 노트의 출처 정보를 보관하며, 블록체인을 통해 검증되어 노트가 원본인지 여부도 명확히 식별할 수 있습니다.

시스템은 로컬에서 가져온 노트의 메타데이터를 블록체인에 이미 등록된 데이터와 대조하여 일치 여부를 사용자에게 즉시 알려줌으로써, 신뢰할 수 있는 노트 관리 환경을 제공할 수 있게 되었습니다.

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

## 3-4. .tar 아카이브 기능 지원

### (1) 고민: 외부 프로그램 없이 .tar 파일로 아카이브 할 수 있을까?

Notable Block 서비스에서는 마크다운과 이미지 파일을 .tar 파일로 아카이브하는 기능을 제공합니다. 이는 노트를 가져올 때 .tar 형식의 파일만 지원하기 때문입니다.

.tar 형식만을 지원하게 된 데에는 기술적인 이유가 있었습니다. .tar는 단순히 여러 파일을 하나로 묶는 데 최적화된 포맷으로, macOS와 Linux 계열에서 지원하는 xattr 확장 속성을 손실 없이 보존할 수 있는 장점이 있습니다.  
반면 .zip을 포함한 대부분의 일반적인 압축 형식(.7z, .rar 등)은 압축 과정에서 이러한 메타데이터를 유실시키는 특성이 있어,
노트의 출처 정보를 저장하는 데 필수적인 xattr 속성을 온전히 담을 수 없었습니다. 이러한 이유로 .tar 파일을 선택하게 되었습니다.

하지만 .tar 파일은 대부분의 운영체제에서 기본적으로 지원되지 않아, 사용자가 직접 터미널 명령어를 입력하거나 외부 프로그램을 사용해야만 생성할 수 있습니다. 이처럼 별도 프로그램에 의존해야 하는 방식은 사용자 경험을 저하시킬 수 있다고 판단했고,
따라서 Notable Block 서비스 내부에서 .tar 파일을 직접 아카이브해 생성할 수 있도록 기능을 구현했습니다.

<br>

> **아카이브(Archiving)와 압축(Compression)의 차이**
>
> - **아카이브:** 여러 개의 파일이나 폴더를 하나의 파일로 묶는 작업입니다. 용량이 감소하지 않습니다.
> - **압축:** 파일의 크기를 특정 알고리즘으로 줄이는 작업입니다. 일반적으로 용량 감소를 목적으로 하며,  
>   이 과정에서 **xattr(확장 속성) 같은 파일 메타데이터가 유실될 수 있습니다.**

<br>

### (2) 구현: 서버에서 .tar 파일을 만들고 바로 다운로드 되도록 구성

서버는 사용자가 업로드한 마크다운과 이미지 파일을 바탕으로 .tar 파일을 생성하고,
해당 .tar 파일을 클라이언트가 즉시 다운로드할 수 있도록 응답을 구성했습니다.

먼저 `os.tmpdir()` 경로를 기반으로 임시 디렉토리를 생성해
.tar 파일을 일시적으로 저장할 공간을 마련하고,
아카이브 대상이 되는 마크다운과 이미지 파일들은 사용자의 기본 다운로드 폴더에서 조회합니다.
`req.files` 배열을 기반으로 파일명을 정리하고, 아카이브의 제목은 .md 확장자를 가진 파일에서 추출한 이름으로 설정됩니다.

파일 존재 여부를 확인한 뒤, `runCommand` 유틸 함수를 실행해 아카이브를 수행합니다.
이때 `-C` 옵션을 활용해 기준 경로를 설정함으로써, .tar 내부의 파일 경로가 간결하게 유지되도록 처리했습니다.

```js
await runCommand("tar", [
  "-cf",
  tarArchivePath,
  "-C",
  downloadDirectory,
  ...filesData.map(({ name }) => name),
]);
```

- `-c`: 새 아카이브를 생성(create)한다는 의미입니다.
- `-f`: 출력할 아카이브 파일명을 지정할 때 사용하는 옵션입니다. 이 경우 `tarArchivePath`가 해당됩니다.
- `-C`: 기준 디렉토리를 설정하는 옵션으로, 이후 명시된 파일들은 이 기준 경로를 기준으로 상대 경로로 아카이브됩니다.

아키이브가 완료되면 서버는 `Content-Disposition`과 `Content-Type` 헤더를 설정하여
브라우저에서 다운로드가 자동으로 시작되도록 응답을 반환합니다.
전송이 끝난 후에는 .tar 파일과 업로드된 원본 파일들을 삭제하여 리소스를 정리합니다.

과정 중 마크다운이 누락되었거나, 파일이 존재하지 않거나, 아카이브 또는 전송 단계에서 오류가 발생한 경우
각 상황에 맞게 예외 메시지와 상태 코드를 포함한 에러 응답이 반환되도록 설계되어 있습니다.

<br>

### (3) 결과: 클릭 한 번으로 .tar 파일로 아카이브할 수 있습니다.

이 기능을 통해 사용자는 별도의 외부 프로그램이나 터미널 명령어 없이도,
작성한 마크다운과 이미지 파일을 하나의 .tar 파일로 간편하게 아카이브할 수 있게 되었습니다.

모든 아카이브 작업은 서버에서 자동으로 처리되기 때문에,
사용자는 기술적인 지식이 없더라도 복잡한 과정 없이 파일 업로드 한 번으로
.tar 파일을 다운로드 받을 수 있습니다.

특히 여러 개의 마크다운 파일과 각각의 이미지 파일이 함께 있는 경우에도,
이들을 모두 하나의 .tar 파일로 안정적으로 아카이브할 수 있도록 설계되어 있어
향후 가져오기 시 여러 노트를 한 번에 업로드하는 데에도 유용하게 활용됩니다.

<br>

<div align="center">
  <img width="600px" alt=".tar 아카이브 시연" src="https://github.com/user-attachments/assets/9b06eead-de0f-473f-87a5-6febd509da07" />
  <p><em>사용자가 외부 프로그램 없이 마크다운과 이미지 파일을 .tar 파일로 아카이브하는 모습</em></p>
</div>

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

## 3-5. 라이브러리 없이 구현한 SSE 기반 실시간 알림 시스템

### (1) 고민: 사용자에게 알림은 언제, 왜 필요할까?

Notable Block 서비스는 단순한 개인용 에디터가 아니라, 노트가 생성된 이후 공유되거나 복사되고 재업로드되는 흐름이 있어 사용자는 자신의 노트가 어떤 흐름을 거치는지 파악할 수 있도록 알림 기능을 함께 설계했습니다.

만약 알림 기능이 없다면 사용자는 자신의 노트가 다른 사용자에 의해 수정되어 재공유된 사실을 알 수 없고,
노트의 생성, 삭제 흐름 역시 직접 페이지에 방문하지 않고는 확인할 수 없습니다.

결과적으로 노트의 변화에 대한 피드백이 즉각적으로 제공되지 않아 사용자가 서비스에서 불편함을 느낄 가능성이 높았습니다.
이러한 문제를 해결하기 위해 실시간으로 사용자가 노트의 변화를 인지할 수 있도록 알림 기능 도입을 결정하게 되었습니다.

<br>

### (2) 구현: MongoDB Change Stream과 SSE를 활용한 실시간 알림 시스템

알림 기능을 구현하기 위해 다음 네 가지 통신 방식을 검토했습니다.

| 방식         | 특징                              | 한계점                                   |
| ------------ | --------------------------------- | ---------------------------------------- |
| Polling      | 일정 주기로 서버에 요청           | 과도한 HTTP 요청 → 서버 부하 및 지연     |
| Long Polling | 요청 유지 후 재요청               | Polling과 유사, 반복적인 연결 비용       |
| WebSocket    | 양방향 통신                       | 단방향 알림 기능엔 과한 리소스           |
| **SSE**      | **서버 → 클라이언트 단방향 통신** | **필요한 기능만 제공하며 가볍고 효율적** |

최종적으로 서버에서 클라이언트로 데이터를 단방향으로 전달하는 **Server-Sent Events(SSE)** 를 선택했습니다.

<br>

구체적으로 알림이 생성되는 시점은 MongoDB의 Change Stream 기능을 사용해 `Notification` 컬렉션에 새로 삽입된 문서를 감지하는 방식으로 구현했습니다. 이때 특정 사용자에게만 관련된 알림이 스트리밍될 수 있도록 필터링 조건을 적용했습니다

```js
const notificationFilter = [{ $match: { "fullDocument.recipientId": user._id } }];
const notificationStream = Notification.watch(notificationFilter);

notificationStream.on("change", (change) => {
  res.write(`data: ${JSON.stringify(change)}\n\n`);
});
```

<br>

클라이언트에서는 `EventSource` 객체를 활용하여 서버에서 전송된 알림을 실시간으로 수신할 수 있도록 구성했습니다.  
수신된 알림 데이터는 즉시 화면에 토스트 알림으로 표시되어, 사용자가 즉각적으로 상황을 인지할 수 있습니다.

```js
const eventSource = new EventSource("/notification/live", { withCredentials: true });

eventSource.onmessage = (event) => {
  const { fullDocument } = JSON.parse(event.data);
  setToast([fullDocument]);
  setIsToastVisible(true);
};
```

알림의 위치나 지속적인 재확인 편의를 위해, 별도의 알림 허브(`NotificationHub`)를 통해 받은 알림들을 한 번에 모아 볼 수 있도록 설계했습니다. 이를 통해, 사용자는 놓친 알림도 언제든 다시 확인할 수 있고, 특정 알림을 클릭하면 바로 해당 노트로 이동하여 상세 내용을 확인할 수 있게 됩니다.

<br>

### (3) 결과: 사용자는 노트의 흐름을 실시간으로 추적하고, 놓친 알림도 다시 확인할 수 있습니다.

실시간 알림 시스템을 도입하면서 사용자는 더 이상 노트의 복사, 공유, 삭제 같은 중요한 흐름을 놓치지 않게 되었습니다.  
알림은 즉시 화면에 표시되어 빠른 피드백을 제공하고, 토스트 알림을 놓쳤더라도 알림 허브(`NotificationHub`) 를 통해 언제든 다시 확인할 수 있습니다.
경우에 따라 알림은 해당 노트로 이동할 수 있는 링크를 포함하고 있어, 사용자는 클릭 한 번으로 노트의 내용을 확인할 수 있습니다.

<br>

<div align="center">
  <img width="600px" alt="노트 알림이동 시연" src="https://github.com/user-attachments/assets/138b56c3-6be0-4c1b-8d98-10914a8e69a5" />
  <p><em>사용자의 노트가 수정 후 재공유 되었다는 알림을 받고 해당 노트로 이동하는 모습</em></p>
</div>

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

## 3-6. 트리 차트를 활용한 노트 구조 시각화

### (1) 고민: 사용자에게 어떻게 노트가 파생되었는지 편리하게 보여줄 수 있을까?

Notable Block 서비스는 노트가 단순히 작성되고 끝나는 것이 아니라, 공유되고 복사되며 다시 파생되는 과정이 핵심인 서비스입니다.
따라서 사용자가 작성한 노트가 어떤 사용자에의해 공유되었고, 어떻게 파생되었는지를 명확히 보여주는 것이 사용자 경험에 중요하다고 판단했습니다.
하지만 노트 간의 복잡한 관계와 흐름을 알림 기능과 노트 뷰어의 생성자 정보만으로는 한눈에 파악하기 어려워 사용자가 직관적으로 알기는 어렵다고 판단했습니다.

이에 따라 노트 간의 관계를 시각적으로 직관적으로 표현할 수 있는 트리 형태의 시각화 기능 도입을 결정했습니다.  
특히 각 노트 간의 상속 관계(`baseNote`)를 중심으로 노트의 생성과 복제, 공유 흐름을 명확히 보여주는 것이 핵심 목표였습니다.

<br>

### (2) 구현: 노트 데이터를 트리 구조로 변환하고 D3.js를 활용한 시각화

서버에서 불러온 노트 리스트는 본래 단순한 배열 구조로 되어 있어 트리 시각화에 바로 사용할 수 없었습니다.  
이를 해결하기 위해 우선 노트 데이터를 부모-자식 관계를 표현할 수 있도록 가공하여 트리 구조로 변환했습니다.  
 각 노트 데이터를 순회하며 중간 자료구조인 `noteMap`을 구성하여, 모든 노트에 자식 노드를 연결할 수 있는 공간을 마련했습니다.

```js
const noteMap = new Map();

noteData.forEach(({ _id, title, baseNote, ... }) => {
  noteMap.set(_id, { ...note, children: [] });
});
```

이후 노트를 다시 순회하면서 각 노트의 부모 노드(`baseNote`)가 존재할 경우 그 부모 노드의 `children` 배열에 추가하고,
부모가 없는 경우 루트 노드로 설정했습니다. 이를 통해 사용자의 노트 데이터가 계층적으로 연결된 명확한 트리 구조로 변환했습니다.

```js
const noteTree = { userId, name, children: [] };

noteData.forEach(({ _id, baseNote }) => {
  const node = noteMap.get(_id);
  if (baseNote && noteMap.has(baseNote)) {
    noteMap.get(baseNote).children.push(node);
  } else {
    noteTree.children.push(node);
  }
});
```

<div align="center">
  <img width="600px" alt="noteData 값 → noteTree 값 변환 예시" src="https://github.com/user-attachments/assets/5f6f3cbc-78ca-463b-8a74-7715d6b812df" />
  </div>

<div align="center">
  <img width="600px" alt="noteTree 결과 도식화" src="https://github.com/user-attachments/assets/18ba1a33-9ece-441b-83e9-9fe068ed9f09" />
</div>

트리 형태로 변환된 데이터를 시각화하기 위해서는 `D3.js`를 활용했습니다. `d3.hierarchy()`로 트리 데이터를 정의하고,
`d3.tree()` 메서드를 통해 각 노드의 좌표를 계산한 뒤 SVG 요소로 렌더링하여 최종적으로 시각적인 트리 구조를 구현했습니다.

노드 간의 연결은 `d3.linkHorizontal()`을 이용하여 자연스러운 연결선을 그렸고, 노드를 클릭하면 자신의 노트일 경우 상세 페이지로 이동하거나 공유 노트의 경우 해당 공유 페이지로 이동하도록 구현했습니다.
추가로 노드 위에 마우스를 올리면 노트의 제목, 생성자, 수정자 등 중요한 정보를 툴팁으로 표시하여 사용자 편의를 높였습니다.

<br>

### (3) 결과: 노트의 파생과 관계를 한눈에 이해할 수 있습니다.

노트가 복사되고 공유되며 파생되는 구조를 한눈에 파악할 수 있도록, 트리 차트를 인터페이스에 도입했습니다.
이를 통해, 사용자는 자신이 작성한 노트가 어떤 사용자에 의해 복사되고 확산되었는지를 시각적으로 확인할 수 있습니다.

트리 차트 기반 UI는 단순한 알림이나 생성자 정보보다 훨씬 더 명확하고 직관적인 흐름 표현을 가능하게 했고,
노트 간의 관계를 구조적으로 파악할 수 있게 도와줬습니다. 결과적으로 사용자는 노트의 현재 상태와 활용 상황을 빠르고 정확하게 이해할 수 있어, 서비스의 사용성과 몰입도 모두 향상되는 효과를 얻었습니다.

<div align="center">
  <img width="600px" alt="트리차트 시연" src="https://github.com/user-attachments/assets/4eeb0e89-1fa6-4a6a-a29e-a4e66522ddf1" />
  <p><em>트리 차트를 통해 사용자가 노트의 파생과 관계를 확인하고, 특정 노트를 클릭해 에디터로 이동하는 모습</em></p>
</div>

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

## 3-7. 리프레쉬 토큰, 액세스 토큰을 활용한 로그아웃 없는 로그인 유지

### (1) 고민: 로그인 상태를 어떻게 안정적으로 유지할 수 있을까?

사용자에게 로그인 후에도 서비스를 끊김 없이 사용할 수 있는 환경을 제공하고 싶었습니다. 하지만 일반적인 OAuth2 인증은 액세스 토큰이 만료되면 로그인 상태가 해제되고, 사용자는 다시 수동으로 로그인을 해야만 했습니다.

특히 노트 작성 중 새로고침하거나, 일정 시간이 지나 토큰이 만료되면 작성하던 흐름이 끊기고 다시 로그인해야 하는 불편함이 발생했습니다. 이를 해결하기 위해, 사용자가 직접 로그인하지 않아도 자동으로 토큰을 갱신하고 인증 상태를 복원하는 구조를 설계했습니다.

<br>

### (2) 구현: 자동 로그인 흐름과 쿠키 기반 상태 유지

#### 1. 로그인 시 토큰과 사용자 정보를 쿠키에 저장

`/login` 엔드포인트에서는 Google OAuth 인증을 통해 받은 액세스 토큰과 리프레쉬 토콘을 이용해 사용자를 인증하고,  
이 정보를 안전하게 쿠키에 저장합니다.
이때 액세스 토큰은 `httpOnly`, `secure`, `sameSite=strict` 옵션으로 설정해 보안성을 유지했습니다.

```js
res.cookie("access_token", access_token, {
  domain: process.env.COOKIE_DOMAIN,
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
```

#### 2. 요청 시 토큰 검증 → 만료되었으면 자동 갱신

API 요청에는 항상 인증 미들웨어 `isAuthenticated`가 사용되며,
이 미들웨어에서는 액세스 토큰의 유효성을 확인하고, 만료되었을 경우 `autoLogin()`을 통해 refresh_token으로 자동 로그인을 시도합니다.

```js
await oauth2Client.getTokenInfo(access_token); // access_token의 만료 여부를 확인합니다.
```

만약 액세스 토큰이 만료되었더라도, 사용자의 쿠키에 저장된 리프레쉬 토큰으로 새 액세스 토큰을 요청하고,  
갱신된 토큰은 다시 쿠키에 저장되어 다음 요청에도 인증이 유지됩니다.

#### 3. 사용자 정보까지 자동 설정

토큰이 유효하거나, 자동 갱신이 완료된 경우에는 Google OAuth를 통해 사용자 정보를 불러오고 DB에서 해당 사용자 정보를 찾아
`req.user`에 주입하여 하위 라우터에서 사용자 정보에 접근할 수 있도록 구성했습니다.

#### 4. 로그아웃 시 리프레쉬 토큰 무효화

사용자가 `/logout` 엔드포인트 요청을 보내면,
서버에서는 해당 사용자의 DB에 저장된 `refresh_token` 값을 제거하여 더 이상 자동 로그인이 불가능하게 만듭니다.

```js
await User.findByIdAndUpdate(userId, { refresh_token: "" });
```

즉, 리프레쉬 토큰을 서버에만 보관하고, 로그아웃 시 이를 명확히 제거함으로써  
세션 탈취, 무단 자동 로그인 등의 보안 위협을 예방할 수 있도록 설계하였습니다.

<br>

### (3) 결과: 로그인 상태가 유지되어 서비스 흐름이 끊기지 않습니다.

사용자는 한 번 로그인한 이후, 새로고침하거나 브라우저를 닫았다가 다시 열더라도 로그인이 유지되는 것은  
물론 토큰 만료 시에도 백그라운드에서 자동으로 액세스 토큰을 갱신해 재로그인 없이 인증 상태를 복원할 수 있습니다.  
리프레쉬 토큰이 노출되지 않도록 서버(DB)에서만 관리하며, 사용자 측에는 저장하지 않아 보안도 유지됩니다.

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

# 4. 프로젝트의 정보

## 4-1. 기술 스택

### 클라이언트

![React](https://img.shields.io/badge/react-%23404d59.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23404d59.svg?style=for-the-badge&logo=vite&logoColor=w)
![Axios](https://img.shields.io/badge/axios-%23404d59.svg?style=for-the-badge&logo=axios&logoColor=w)
![Zustand](https://img.shields.io/badge/zustand-%23404d59.svg?style=for-the-badge&logo=react&logoColor=black)
![D3](https://img.shields.io/badge/D3-404d59.svg?style=for-the-badge&logo=d3&logoColor=F9A03C)
![Styled-components](https://img.shields.io/badge/styled_components-404d59.svg?style=for-the-badge&logo=styledcomponents&logoColor=DB7093)

### 서버

![NodeJS](https://img.shields.io/badge/node.js-404d59?style=for-the-badge&logo=node.js&logoColor=6DA55F)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%23404d59.svg?style=for-the-badge&logo=mongodb&logoColor=w)
![Ethers](https://img.shields.io/badge/ethers-%23404d59.svg?style=for-the-badge&logo=ethers&)

### 블록체인

![Solidity](https://img.shields.io/badge/solidity-%23404d59?style=for-the-badge&logo=solidity&logoColor=white)
![Hardhat](https://img.shields.io/badge/hardhat-%23404d59?style=for-the-badge&logo&logoColor=white)

### 배포

![Amazon Web Service](https://img.shields.io/badge/amazon%20web%20service-%23404d59.svg?style=for-the-badge&logo=amazon&logoColor=b)
![Binance Smart Chain](https://img.shields.io/badge/Binance%20Smart%20Chain-%23404d59.svg?style=for-the-badge&logo=binance&logoColor=b)

### 테스트

![Playwright](https://img.shields.io/badge/playwright-%23404d59.svg?style=for-the-badge&logo=playwright&logoColor=sd)
![Jest](https://img.shields.io/badge/jest-%23404d59.svg?style=for-the-badge&logo=jest&logoColor=sd)

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

## 4-2. 프로젝트의 구조

### (1) Zustand를 활용한 전역 상태 관리

컴포넌트 간의 상태 전달이 반복(Props Drilling)되거나, 여러 컴포넌트에서 동일한 데이터를 참조해야 하는 경우에는 상태 관리가 복잡해지고 컴포넌트간 의존성이 커지기 쉽습니다.  
이런 구조적 문제를 해결하기 위해, Zustand를 도입하여 일부 상태를 전역으로 분리해 관리했습니다.

```jsx
  🗂️ stores
   ㄴ 📁 useNotificationStore.tsx : 토스트 알림, 전체 알림 등 알림 관련 상태 관리
   ㄴ 📁 useSelectionStore.tsx    : 선택 메뉴 항목과 인덱스 상태 전역 관리
   ㄴ 📁 useUserStore.tsx         : 로그인된 사용자 정보 및 인증 상태 관리
```

<p align="center"><em>컴포넌트간 의존성을 줄여준 전역 상태의 디렉토리</em></p>

결과적으로, Zustand 도입을 통해 상태 전달의 복잡성을 줄이고, 각 컴포넌트에서 직접 상태를 제어할 수 있도록 하여 의존도를 낮출 수 있었습니다.

<br>

### (2) 코드 효율성을 위한 공통 컴포넌트 설계

```jsx
  🗂️ common
   ㄴ 📁 Button.tsx
   ㄴ 📁 Form.tsx
   ㄴ 📁 /* ... */
```

<p align="center"><em>재사용 가능한 UI 요소들을 분리해 구성한 공통 컴포넌트의 디렉토리</em></p>

UI 전반에서 반복적으로 사용되는 요소들을 컴포넌트 단위로 분리해 추상화함으로써, 중복 코드를 줄이고 더 유연하게 활용할 수 있도록 구성했습니다.
각 컴포넌트는 props를 전달받아 다양한 상황에 맞게 동작하며, 필요한 경우 내부 state를 통해 사용자 상호작용에 따라 UI가 자연스럽게 반응할 수 있도록 설계했습니다.

<br>

```jsx
function Button({ image, onClick }) {
  /* ... */
  return (
    <S.Layout onClick={onClick}>
      <S.Icon $image={image} />
    </S.Layout>
  );
}
```

<p align="center"><em>알림, 케밥 메뉴, ⊕ 메뉴 등 다양한 UI 요소에 재사용되는 버튼 컴포넌트</em></p>

이처럼 버튼 하나도 재사용 가능한 형태로 분리함으로써, 동일한 UI 패턴을 반복 작성하는 수고를 줄였고,  
변경이 필요할 경우 하나의 컴포넌트만 수정하면 되기 때문에 유지보수 역시 수월하게 관리할 수 있었습니다.

<br>

### (3) 관심사 분리 원칙(Separation of Concerns, SoC)에 입각한 커스텀 훅 구성

컴포넌트 외부로 로직을 분리해 각 기능의 책임을 명확히 나누고, 재사용성과 가독성을 높이기 위해 커스텀 훅들을 설계했습니다.
파일명만으로도 역할이 직관적으로 드러나도록 네이밍을 구성했으며, UI 동작과 내부 상태 관리를 각각의 훅에 분리해 독립적으로 처리할 수 있도록 설계했습니다.

```jsx
  🗂️ hooks
   ㄴ 📁 useDragDrop.tsx       : 노트의 블록 이동 및 파일 업로드 드래그 앤 드롭 처리
   ㄴ 📁 usePrevBlocks.tsx     : 노트의 이전 블록 상태를 기억해 변화 여부 감지
   ㄴ 📁 useOnClickOutside.tsx : 바깥 영역 클릭 시 모달 닫기 처리
   ㄴ 📁 /* ... */
```

<p align="center"><em>컴포넌트 외부로 로직을 분리한, 관심사 기반 커스텀 훅 설계</em></p>

<br>

### (4) 중복을 줄이기 위한 중첩 라우팅을 활용한 공통 UI 구성

페이지마다 중복되는 UI 요소를 따로 중복 렌더링하지 않기 위해, React Router의 중첩 라우팅(`Outlet`) 기능을 활용했습니다.  
공통 UI는 `<Layout />` 컴포넌트에서 한 번만 정의하고, 각 페이지는 `<Outlet />` 위치를 통해 동적으로 전환됩니다.

네비게이션 바, 알림 버튼, 토스트 알림 등은 전역적으로 고정되어 있으며,
페이지별 세부 UI만 `Outlet`을 통해 교체되도록 구성되어 있습니다.

<br>

```jsx
<Route path="/" element={<Layout />}>
  <Route path="/notes" element={<Outlet />}>
    <Route path="" element={<MyNotePage />} />
    <Route path=":noteId" element={<NoteEditingPage />} />
  </Route>
  /* ... */
</Route>
```

<p align="center"><em>Outlet을 통해 개별 페이지 컴포넌트만 변경되는 구조</em></p>

<br>

```jsx
<S.Layout>
  <NavBar />
  <Outlet />
  <Toast />
  <Form>
    <NotificationHub />
  </Form>
  <Button />
</S.Layout>
```

<p align="center"><em>공통 UI를 한 곳에 모은 Layout 컴포넌트의 구조</em></p>

<br>

이 방식 덕분에, 각 페이지가 중복 없이 공통 UI를 렌더링할 수 있었으며,  
공통 UI를 반복해서 `import`하거나 별도 렌더링할 필요 없이, 라우팅 구조만으로 관리할 수 있었습니다.

<br>

### (5) 컴포넌트 구조의 가독성을 높이는 S-dot 네이밍 컨벤션 적용

코드의 가독성과 재사용성을 향상시키기 위해, 스타일드 컴포넌트를 S-dot 네이밍 컨벤션에 따라 관리되도록 구현하였습니다.  
해당 방식은 스타일 컴포넌트들을 `S`라는 단일 객체로 묶어 `import`하고, 내부에서는 `S.이름` 형태로 접근할 수 있도록 구성되어 있습니다.

<br>

```jsx
import { Layout, Status, Item } from "styles/pages/NoteEditingPageStyle";

<Layout>
  <Status />
  <NoteEditor />
  <Item>
    <SelectMenu />
    <Button />
  </Item>
</Layout>;
```

<p align="center"><em>일반적으로 많이 사용되는 네이밍 방식</em></p>

<br>

```jsx
import * as S from "styles/pages/NoteEditingPageStyle";

<S.Layout>
  <S.Status />
  <NoteEditor />
  <S.Item>
    <SelectMenu />
    <Button />
  </S.Item>
</S.Layout>;
```

<p align="center"><em>S-dot 네이밍이 적용된 방식</em></p>

<br>

일반적인 방식에서는 스타일 컴포넌트와 일반 컴포넌트가 동일한 방식으로 사용되기 때문에
구조 파악에 시간이 걸리고, 이름 충돌 가능성도 존재합니다.

반면, S-dot 방식은 스타일 컴포넌트를 `S.` 접두어로 명확히 구분할 수 있어
컴포넌트의 구조 파악이 더 쉬워졌고, 자동완성 기능으로 작업 속도도 향상되었습니다.  
또한 스타일 파일 내 정의가 많아지더라도 한 줄로 정리가 가능해
유지보수 시 `import` 구문이 복잡해지는 문제도 줄일 수 있었습니다.

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>

# 5. 회고

2024년 대한민국 인터넷이용실태조사에 따르면, 만 6세 이상 인터넷 이용자의 97.7%가 텍스트 기반 애플리케이션을 사용한다고 합니다.
그만큼 텍스트를 입력하고 편집하는 경험은 사용자에게 너무도 자연스럽고 익숙한 경험이며,
이번 프로젝트는 그 익숙함을 방해하지 않으면서도 더 유연한 편집 환경을 제공하고, 사용자가 직접 생성한 노트임을 명확하게 입증할 수 있도록 설계하는 데에 중점을 두었습니다.

프로젝트를 진행하며 가장 중요하게 여긴 점을 꼽으라면, 단순히 기능을 구현하는 데서 그치는 것이 아니라 “사용자가 편리하게 사용하기 위해선 어떤 기능이 필요할까?”, “지금 내가 작성하고 있는 이 코드는 왜 필요한 걸까?“ 같은 질문을 끊임없이 스스로에게 던지는 일이었습니다. 이 질문들이 프로젝트 전체에 일관된 기준이 되어줬고, 사용자 중심의 설계와 구현으로 자연스럽게 이어졌습니다.

더불어, 사용자가 직접 생성한 노트임을 입증할 수 있도록 검증 과정을 설계하는 데 익숙하지 않은 기술들을 처음부터 직접 다뤄야 했습니다. 파일에 메타데이터를 기록하기 위해 터미널 명령어를 활용해 확장 속성(xattr)을 삽입하고, 블록체인 기술을 접목해 생성자ID와 노트ID의 정보를 등록 및 검증하며, 마크다운과 이미지를 자동으로 아카이빙하는 로직까지 처음부터 차근차근 다뤄야 했습니다. 기술적 낯설음보다는 “사용자가 서비스를 이용하면서 가질 기대에 부응하려면 어떻게 해야할까?“라는 질문에 충실하기 위해 익숙하지 않은 기술에도 도전했고, 그 과정에서 시행착오를 통해 구조를 개선해나갈 수 있었습니다.

이 경험을 통해 기술을 선택할 때 무엇을 구현할 수 있는가보다 왜 그것이 필요한가를 먼저 고민해야 한다는 점을 입체적으로 이해할 수 있었고, 단순히 작동하는 코드를 만드는 것을 넘어서 사용자와 기술 사이의 접점을 설계하는 개발자가 되고 싶다는 방향성도 더욱 분명해졌습니다.

마지막으로, 이번 프로젝트는 제가 불확실성과 마주했을 때에도 끝까지 이유를 찾아가며 구조화해나갈 수 있는 사람이라는 것을 스스로 증명한 경험이기도 합니다. 앞으로도 기술적인 도전을 두려워하지 않고, 사용자에게 진심으로 도움이 되는 결과물을 만들어내는 개발자로 성장하고 싶습니다.

<br>

#### <p align="right"><a href="#index">목차👆🏻</a></p>

<br>
