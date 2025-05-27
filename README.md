<br>
<div align="center">

**Notable Block** 은 **블록체인과 파일 확장 속성을 통해 문서의 출처를 보존하는 블록형 스마트에디터 및 공유 플랫폼** 입니다.

<br>
<a target="blank" href="https://notable-block.com/login">
  <img width="450px" alt="project icon" src=https://github.com/user-attachments/assets/2dbb0ee3-9cda-4f71-b444-05604a0f2ddb>
</a>

<br>
<br>

[<img alt="배포 입장 버튼" src=https://github.com/user-attachments/assets/1a5ab70f-05cc-4c63-9004-28158e712085>](https://notable-block.com/login)

<br>

_블록체인 기술을 활용해 작성된 마크다운 문서의 위·변조를 방지하고,
문서 원본의 무결성과 이력을 투명하게 추적할 수 있도록 돕는 플랫폼입니다.
개인 콘텐츠의 신뢰성과 소유권 보호를 목표로 합니다._

[서버 레포지토리](https://github.com/notableBlock/notableBlock-server) |
[블록체인 레포지토리](https://github.com/notableBlock/notableBlock-blockchain)

</div>

<div>

</div>

## 목차

<!-- toc -->

- [1. 프로젝트의 동기](#1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EB%8F%99%EA%B8%B0)
- [2. 프로젝트의 핵심 기능 소개](#2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)
- [3. 핵심 기능 구현 과정](#3-%EC%A3%BC%EC%9A%94-%ED%95%B5%EC%8B%AC%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%EA%B3%BC%EC%A0%95)
  - [3-1. 블록 기반 스마트 에디터 구현](#3-1-%EB%B8%94%EB%A1%9D-%EA%B8%B0%EB%B0%98-%EC%8A%A4%EB%A7%88%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0-%EA%B5%AC%ED%98%84)
    - [(1) 고민: 자유롭게 작성하면서도 구조화된 노트를 만들 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%9E%90%EC%9C%A0%EB%A1%AD%EA%B2%8C-%EC%9E%91%EC%84%B1%ED%95%98%EB%A9%B4%EC%84%9C%EB%8F%84-%EA%B5%AC%EC%A1%B0%ED%99%94%EB%90%9C-%EB%85%B8%ED%8A%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 블록 단위로 구성된 직관적이고 유연한 에디터](#2-%EA%B5%AC%ED%98%84-%EB%B8%94%EB%A1%9D-%EB%8B%A8%EC%9C%84%EB%A1%9C-%EA%B5%AC%EC%84%B1%EB%90%9C-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9D%B4%EA%B3%A0-%EC%9C%A0%EC%97%B0%ED%95%9C-%EC%97%90%EB%94%94%ED%84%B0)
    - [(3) 결과: 단축키로 빠르게, 블록 단위로 유연하게 작성할 수 있어요](#3-%EA%B2%B0%EA%B3%BC-%EB%8B%A8%EC%B6%95%ED%82%A4%EB%A1%9C-%EB%B9%A0%EB%A5%B4%EA%B2%8C-%EB%B8%94%EB%A1%9D-%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%9C%A0%EC%97%B0%ED%95%98%EA%B2%8C-%EC%9E%91%EC%84%B1%ED%95%A0-%EC%88%98-%EC%9E%88%EC%96%B4%EC%9A%94)
  - [3-2. 노트 내용을 미리볼 수 있는 노트 뷰어 기능](#3-2-%EB%85%B8%ED%8A%B8-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%AF%B8%EB%A6%AC%EB%B3%BC-%EC%88%98-%EC%9E%88%EB%8A%94-%EB%85%B8%ED%8A%B8-%EB%B7%B0%EC%96%B4-%EA%B8%B0%EB%8A%A5)
    - [(1) 고민: 에디터 페이지까지 가지 않고도 노트의 내용을 미리 볼 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%97%90%EB%94%94%ED%84%B0-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B9%8C%EC%A7%80-%EA%B0%80%EC%A7%80-%EC%95%8A%EA%B3%A0%EB%8F%84-%EB%85%B8%ED%8A%B8%EC%9D%98-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%AF%B8%EB%A6%AC-%EB%B3%BC-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 읽기 전용 구조와 안전한 텍스트 렌더링 구조](#2-%EA%B5%AC%ED%98%84-%EC%9D%BD%EA%B8%B0-%EC%A0%84%EC%9A%A9-%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%95%88%EC%A0%84%ED%95%9C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B5%AC%EC%A1%B0)
    - [(3) 결과: 페이지 이동 없이 노트의 내용을 미리 볼 수 있어요](#3-%EA%B2%B0%EA%B3%BC-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99-%EC%97%86%EC%9D%B4-%EB%85%B8%ED%8A%B8%EC%9D%98-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%AF%B8%EB%A6%AC-%EB%B3%BC-%EC%88%98-%EC%9E%88%EC%96%B4%EC%9A%94)
  - [3-3.xattr 기반 메타데이터 설계 및 블록체인 연동](#3-3xattr-%EA%B8%B0%EB%B0%98-%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%84%A4%EA%B3%84-%EB%B0%8F-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%97%B0%EB%8F%99)
    - [(1) 고민: 노트의 출처를 안전하게 저장하고 복원할 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EB%85%B8%ED%8A%B8%EC%9D%98-%EC%B6%9C%EC%B2%98%EB%A5%BC-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B3%A0-%EB%B3%B5%EC%9B%90%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: .tar 아카이브와 xattr 메타데이터, 블록체인을 통한 원본 검증](#2-%EA%B5%AC%ED%98%84-tar-%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B8%8C%EC%99%80-xattr-%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%9B%90%EB%B3%B8-%EA%B2%80%EC%A6%9D)
    - [(3) 결과: 노트는 누가 만들었는지 확실히 증명될 수 있어요](#3-%EA%B2%B0%EA%B3%BC-%EB%85%B8%ED%8A%B8%EB%8A%94-%EB%88%84%EA%B0%80-%EB%A7%8C%EB%93%A4%EC%97%88%EB%8A%94%EC%A7%80-%ED%99%95%EC%8B%A4%ED%9E%88-%EC%A6%9D%EB%AA%85%EB%90%A0-%EC%88%98-%EC%9E%88%EC%96%B4%EC%9A%94)
  - [3-4. 라이브러리 없이 구현한 SSE 기반 실시간 알림 시스템](#3-4-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-%EA%B5%AC%ED%98%84%ED%95%9C-sse-%EA%B8%B0%EB%B0%98-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC-%EC%8B%9C%EC%8A%A4%ED%85%9C)
    - [(1) 고민: 사용자에게 알림은 언제, 왜 필요할까?](#1-%EA%B3%A0%EB%AF%BC-%EC%82%AC%EC%9A%A9%EC%9E%90%EC%97%90%EA%B2%8C-%EC%95%8C%EB%A6%BC%EC%9D%80-%EC%96%B8%EC%A0%9C-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%A0%EA%B9%8C)
    - [(2) 구현: MongoDB Change Stream과 SS를 활용한 실시간 알림 시스템](#2-%EA%B5%AC%ED%98%84-mongodb-change-stream%EA%B3%BC-ss%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC-%EC%8B%9C%EC%8A%A4%ED%85%9C)
    - [(3) 결과: 사용자는 노트의 흐름을 실시간으로 추적하고, 놓친 알림도 다시 확인할 수 있습니다.](#3-%EA%B2%B0%EA%B3%BC-%EC%82%AC%EC%9A%A9%EC%9E%90%EB%8A%94-%EB%85%B8%ED%8A%B8%EC%9D%98-%ED%9D%90%EB%A6%84%EC%9D%84-%EC%8B%A4%EC%8B%9C%EA%B0%84%EC%9C%BC%EB%A1%9C-%EC%B6%94%EC%A0%81%ED%95%98%EA%B3%A0-%EB%86%93%EC%B9%9C-%EC%95%8C%EB%A6%BC%EB%8F%84-%EB%8B%A4%EC%8B%9C-%ED%99%95%EC%9D%B8%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
  - [3-5. 트리 차트를 활용한 노트 구조 시각화](#3-5-%ED%8A%B8%EB%A6%AC-%EC%B0%A8%ED%8A%B8%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%85%B8%ED%8A%B8-%EA%B5%AC%EC%A1%B0-%EC%8B%9C%EA%B0%81%ED%99%94)
    - [(1) 고민: 사용자에게 어떻게 노트가 파생되었는지 편리하게 보여줄 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EC%82%AC%EC%9A%A9%EC%9E%90%EC%97%90%EA%B2%8C-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%85%B8%ED%8A%B8%EA%B0%80-%ED%8C%8C%EC%83%9D%EB%90%98%EC%97%88%EB%8A%94%EC%A7%80-%ED%8E%B8%EB%A6%AC%ED%95%98%EA%B2%8C-%EB%B3%B4%EC%97%AC%EC%A4%84-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 노트 데이터를 트리 구조로 변환하고 D3.js를 활용한 시각화](#2-%EA%B5%AC%ED%98%84-%EB%85%B8%ED%8A%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%ED%8A%B8%EB%A6%AC-%EA%B5%AC%EC%A1%B0%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EA%B3%A0-d3js%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8B%9C%EA%B0%81%ED%99%94)
    - [(3) 결과: 노트의 파생과 관계를 한눈에 이해할 수 있어요](#3-%EA%B2%B0%EA%B3%BC-%EB%85%B8%ED%8A%B8%EC%9D%98-%ED%8C%8C%EC%83%9D%EA%B3%BC-%EA%B4%80%EA%B3%84%EB%A5%BC-%ED%95%9C%EB%88%88%EC%97%90-%EC%9D%B4%ED%95%B4%ED%95%A0-%EC%88%98-%EC%9E%88%EC%96%B4%EC%9A%94)
  - [3-6. 리프레쉬 토큰, 액세스 토큰을 활용한 로그아웃 없는 로그인 유지](#3-6-%EB%A6%AC%ED%94%84%EB%A0%88%EC%89%AC-%ED%86%A0%ED%81%B0-%EC%95%A1%EC%84%B8%EC%8A%A4-%ED%86%A0%ED%81%B0%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83-%EC%97%86%EB%8A%94-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80)
    - [(1) 고민: 로그인 상태를 어떻게 안정적으로 유지할 수 있을까?](#1-%EA%B3%A0%EB%AF%BC-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%95%88%EC%A0%95%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%9C%A0%EC%A7%80%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    - [(2) 구현: 자동 로그인 흐름과 쿠키 기반 상태 유지](#2-%EA%B5%AC%ED%98%84-%EC%9E%90%EB%8F%99-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9D%90%EB%A6%84%EA%B3%BC-%EC%BF%A0%ED%82%A4-%EA%B8%B0%EB%B0%98-%EC%83%81%ED%83%9C-%EC%9C%A0%EC%A7%80)
    - [(3) 결과: 로그인 상태가 유지되어 서비스 흐름이 끊기지 않아요](#3-%EA%B2%B0%EA%B3%BC-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%83%81%ED%83%9C%EA%B0%80-%EC%9C%A0%EC%A7%80%EB%90%98%EC%96%B4-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%9D%90%EB%A6%84%EC%9D%B4-%EB%81%8A%EA%B8%B0%EC%A7%80-%EC%95%8A%EC%95%84%EC%9A%94)
- [4. 프로젝트의 정보](#4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%A0%95%EB%B3%B4)
  - [4-1. 기술 스택](#4-1-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  - [4-2. 프로젝트 구조](#4-2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)
- [5. 회고](#5-%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

## 1. 프로젝트의 동기

학부 시절, 8개월간 광역자치단체에서 청년 복지 이슈를 분석하고, 시정에 맞는 정책을 제안한 경험이 있습니다.
그 과정에서 일부 청년들이 소득 등을 위조해 전세자금 등의 복지 혜택을 부정취득하고, 이로 인해 정작 도움이 필요한 청년들이 지원에서 배제되고 있다는 현실을 알게 되었습니다.

이 경험을 통해 공문서 및 사문서 위조의 심각성을 인식하게 되었고,
_“누구든지 문서의 원본 소유자와 원본의 형태를 쉽게 확인할 수 있다면 어떨까?”_
라는 이 작은 질문에 대한 해답을 찾고자, 본 프로젝트를 시작하게 되었습니다.

<br>

## 2. 프로젝트의 핵심 기능 소개

### 스마트 에디터 기능

- **"/"** 입력 또는 드래그 버튼 클릭으로 선택 메뉴를 열 수 있습니다.
- **h1**, **h2**, **h3**, **p** 태그로 변환하거나 이미지를 첨부할 수 있습니다.
  - /h1, /h2, /h3, /img 명령을 직접 입력해 변환도 가능하며, 메뉴 클릭으로도 선택할 수 있습니다.
  - 메뉴는 방향키 또는 마우스 클릭으로 조작할 수 있으며, ESC 키로 닫을 수 있습니다.
- 자동 저장 기능이 제공되어, 별도의 저장 버튼 없이 실시간으로 편집 내용이 저장됩니다.
- 드래그 버튼을 사용해 블록 간 위치를 자유롭게 이동할 수 있습니다.
- 방향키로 블록 간 이동이 가능합니다.
- Backspace로 블록을 삭제할 수 있으며, 내용이 있는 블록은 삭제되지 않습니다.
- Enter로 새 블록을 추가하고, Shift + Enter로 한 블록 내에서 줄바꿈을 할 수 있습니다.

### 뷰어 기능

- 노트 페이지를 직접 방문하지 않아도 뷰어 기능을 통해 사용자가 작성한 내용을 미리볼 수 있습니다.
- 생성일, 마지막 수정일, 생성자, 수정자, 공유 여부 등을 확인 할 수 있습니다.
- 케밥 버튼을 통해 노트를 공유하거나 내보내거나 삭제할 수 있습니다.

### 노트 내보내기 및 가져오기

- 해당 노트 뷰어의 케밥 버튼을 선택하거나 해당 노트 에디터 페이지에서 + 버튼을 선택해 노트를 로컬로 내보낼 수 있습니다.
  - 이때 사용자의 메타데이터를 노트에 저장하기 위해 .TAR 형태로 압축되어 내보내집니다.
  - 파일의 메타데이터에 ZeroWidthCharacter 기능을 적용한 노트의 메타데이터를 저장합니다.
  - 이미지도 노트에 첨부되었다면 함께 내보내집니다.
- 1개 이상의 TAR 파일도 Notable Block에 가져올 수 있습니다
- 가져올 경우 누군가가 생성한 노트라면 생성자에게 알림이 갑니다.

### 알림 확인 및 이동 기능

- 사용자 본인의 노트를 생성, 공유, 삭제했을 경우 동시에 알림을 받을 수 있습니다.
  - 공유 기능의 경우 공유된 노트로 이동 가능한 버튼 기능도 제공됩니다.
- 타 사용자가 나의 노트를 자기의 노트로 가져갔거나 로컬에서 가져왔을 경우 알림을 받을 수 있습니다.
- 수신한 알림을 전체 삭제하거나 개별 삭제할 수 있습니다.

### 노트 트리차트 기능

- 나의 노트와 나의 노트를 가져간 사람의 노트의 현황을 트리 기능을 통해 이력을 알 수 있습니다.
- 사용자의 이해를 돕기위해 사용법이 명시되어있습니다.
- 노트의 공유 상태를 확인할 수 있습니다.
- 마우스 휠, 드래그, 호버, 클릭을 통해 세부 기능을 사용할 수 있습니다.
  - 휠: 화면 확대 및 축소
  - 드래그: 화면 이동
  - 호버: 노트 정보 표시
  - 클릭: 노트 이동 기준에 따라 해당 노트 페이지로 이동됩니다.

<br>

# 3. 핵심 기능 구현 과정

## 3-1. 블록 기반 스마트 에디터 구현

### (1) 고민: 자유롭게 작성하면서도 구조화된 노트를 만들 수 있을까?

단순한 텍스트 입력을 넘어서, 사용자가 텍스트와 이미지를 블록 단위로 자유롭게 편집하고 구성할 수 있는 에디터가 필요하다고 판단했습니다.  
특히 단축키만으로 블록을 추가하거나, 블록의 타입을 전환할 수 있는 직관적인 상호작용을 통해 사용자 경험을 개선하고자 했습니다.

초기에는 HTML의 기본 속성인 `contentEditable`을 직접 활용해 구현을 시도했으나, 곧 몇 가지 중요한 문제에 직면했습니다.

- 리액트의 가상 DOM과 실제 DOM 간의 충돌
- 사용자 입력과 관련된 동기화 문제
- 렌더링 시 `children` 노드가 예고 없이 덮어씌워지는 현상

이러한 문제를 해결하면서도 안정적인 개발을 이어가기 위해, 리액트 환경에 적합한 경량 라이브러리인 **react-contenteditable**을 도입하게 되었습니다.  
이 라이브러리는 최소한의 기능만 제공하면서도 리액트와의 호환성을 보장해주고, 복잡한 DOM 제어 없이 에디터 기능을 구현할 수 있도록 도와줍니다.

하지만 라이브러리를 도입한다고 해서 모든 문제가 해결되는 건 아니었습니다.  
에디터의 핵심 상호작용인 키보드 이벤트 제어도 새롭게 정의해야 했습니다.

- **Enter** 키는 단순 줄바꿈이 아니라 새로운 블록 생성으로 동작해야 했습니다.
- **Backspace** 키는 입력 내용이 비어 있을 경우에만 블록 삭제가 이뤄지도록 조건부 처리되어야 했습니다.
- **위 아래 방향키(↑↓)** 역시 문장 내 커서 이동이 아닌, 블록 간 포커스 전환이라는 새로운 동작으로 재설계되어야 했습니다.

<br>

이 과정에서 가장 까다로웠던 부분은 커서 위치 제어였습니다.
슬래시 명령 메뉴를 띄우거나, 새로운 블록으로 포커스를 이동할 때,  
기존의 브라우저 기본 동작을 제어하면서도 사용자의 기대에 부합하는 위치에 정확히 커서를 유지하는 것이 필수적이었습니다.

이러한 고민들을 하나씩 풀어가며, 단순히 작동하는 에디터를 넘어서
입력 흐름과 블록 구조가 자연스럽게 이어지는 **사용자 중심 에디터**를 구현하고자 했습니다.

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
  const newBlock = { ...initialBlock, id: objectId(), tag: "p" };

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

사용자가 텍스트를 입력하는 도중 위 아래 방향키를 누르면, 커서가 현재 블록을 기준으로 이전 또는 다음 블록으로 이동됩니다.  
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

이후 위 아래 방향키로 메뉴 항목을 탐색할 수 있고, Enter 키로 선택하면 해당 블록의 태그가 전환됩니다.
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

사용자가 슬래시 명령 메뉴에서 "이미지"를 선택하면 파일 입력창이 자동으로 열리며,  
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

### (3) 결과: 단축키로 빠르게, 블록 단위로 유연하게 작성할 수 있어요

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

## 3-2. 노트 내용을 미리볼 수 있는 노트 뷰어 기능

### (1) 고민: 에디터 페이지까지 가지 않고도 노트의 내용을 미리 볼 수 있을까?

노트의 내용을 확인하기 위해 항상 에디터 페이지로 이동해야 한다면, 사용자는 번거로운 페이지 전환을 반복하게 되며,
이는 사용자 경험을 저하시킵니다.  
따라서 노트의 내용을 별도의 페이지 진입 없이 바로 확인할 수 있는, 간결하고 읽기 전용에 최적화된 인터페이스가 필요하다고 판단했습니다.

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

노트 뷰어 헤더 부분에는 우측 상단에 소위 “케밥 버튼”이라 불리는 옵션 메뉴를 배치하여, 클릭한 위치를 기준으로 메뉴가 나타나도록 설계했습니다.  
이 메뉴는 클릭한 영역 외부를 다시 클릭하면 자동으로 닫히도록 구성되어 있어, 자연스럽게 조작할 수 있습니다.  
이 기능은 `useOnClickOutside`라는 커스텀 훅을 이용하여 사용자 경험을 세심하게 고려해 구현했습니다.

<br>

### (3) 결과: 페이지 이동 없이 노트의 내용을 미리 볼 수 있어요

노트 뷰어의 도입으로 사용자는 더 이상 내용을 확인하기 위해 에디터 페이지로 이동할 필요가 없습니다.  
노트의 내용을 빠르고 간편하게 미리보기 형태로 확인할 수 있어, 전체적인 서비스 이용 흐름이 크게 개선했습니다.  
더불어 노트 뷰어 화면에는 노트의 생성일과 마지막 수정일, 작성자 및 최근 수정자의 정보, 그리고 공유 여부까지 한눈에 확인할 수 있도록 표시되어,
노트의 관리와 정보 파악을 보다 편리하게 이용할 수 있습니다.

<div align="center">
  <img width="800px" alt="노트 뷰어 시연" src="https://github.com/user-attachments/assets/ee817e1a-4bb4-4115-95ab-20dfb4202026" />
  <p><em>노트 수정 후 노트 뷰어에서 내용을 확인하는 모습</em></p>
</div>

<br>

## 3-3.xattr 기반 메타데이터 설계 및 블록체인 연동

### (1) 고민: 노트의 출처를 안전하게 저장하고 복원할 수 있을까?

Notable Block은 사용자가 노트를 로컬로 내보내거나(마크다운 파일로 저장) 다시 가져오는 기능을 지원합니다.  
하지만 단순히 마크다운 파일을 저장하는 것만으로는 누가 작성한 노트인지, 그것이 원본인지 명확히 알 수 없는 문제가 있었습니다.

서비스 내부에서는 MongoDB에 저장된 생성자 ID와 노트 ID 등의 메타데이터를 통해 출처를 명확히 식별할 수 있지만,  
로컬 파일로 내보내는 순간부터 이러한 출처 정보가 쉽게 손실되거나 위변조될 가능성이 존재했습니다.  
결과적으로 노트를 다시 업로드할 때 서비스가 이 노트를 완전히 새로운 문서로 잘못 인식하는 문제가 발생할 수 있었습니다.

처음 이 문제를 해결하기 위해, 본문에 보이지 않는 유니코드 문자인 **Zero Width Character(ZWC)** 를 사용하여 메타데이터를 숨기는 방식을 시도했습니다.  
하지만 이 방법은 줄바꿈이나 복사 및 붙여넣기 과정에서 숨겨진 메타데이터가 쉽게 손상되거나 손실될 가능성이 컸고,  
외부 마크다운 에디터마다 처리 방식이 달라 신뢰성이 떨어진다는 점에서 사용성과 안정성 측면에서 적합하지 않다는 결론에 이르렀습니다.

<div align="center">
  <img width="800px" alt="마크다운 내부에 ZWC가 포함된 모습" src="https://github.com/user-attachments/assets/e2f118a7-08d0-4f92-bdc5-2b374bc70086" />
  <p><em>마크다운 내부에 메타데이터가 숨겨져 있어 사용성이 저하되고 쉽게 사라질 수 있는 상황</em></p>
</div>

<br>

이러한 한계를 극복하기 위해 블록체인의 **불변성(immutability)** 에 주목했습니다.  
블록체인에 기록된 데이터는 수정하거나 삭제할 수 없다는 특성을 활용하면, 노트의 메타데이터를 안정적이고 신뢰할 수 있게 보관할 수 있습니다.  
즉, 블록체인에 노트의 생성자와 노트 ID를 등록하면, 사용자가 로컬에서 다시 가져온 노트의 출처가 실제로 등록된 적 있는 원본인지 명확히 검증할 수 있게 됩니다.

최종적으로는 .tar 아카이브와 xattr 메타데이터, 그리고 Solidity로 작성된 스마트 컨트랙트를 결합하여 출처 정보를 안전하게 보관하고 복원할 수 있는 현재의 설계를 채택했습니다.

<br>

### (2) 구현: .tar 아카이브와 xattr 메타데이터, 블록체인을 통한 원본 검증

메타데이터를 효과적으로 보존하고 복원하기 위해, 파일의 외부 확장 속성(xattr)을 활용했습니다.  
macOS와 일부 리눅스 파일 시스템에서는 파일의 추가 정보를 외부 속성으로 저장할 수 있는 xattr 기능을 지원하는데,  
이를 통해 마크다운 내용과는 별도로 생성자 ID와 노트 ID를 안전하게 저장할 수 있었습니다.

단순히 마크다운 파일만 저장하면 노트에 포함된 이미지 파일은 함께 보존되지 않는 문제가 있습니다.
이를 해결하기 위해, 마크다운 파일과 해당 노트에서 사용된 이미지 파일을 함께 .tar 아카이브로 압축하여 하나의 파일로 통합 저장하도록 구성했습니다.

노트를 내보낼 때는 서버에서 tar 명령어를 사용하여 본문과 리소스를 아카이브하고,  
xattr 명령어로 작성자 ID와 노트 ID를 별도의 메타데이터로 삽입하도록 구현했습니다.  
서버에서는 이를 `child_process`의 spawn을 이용한 커스텀 유틸 함수(runCommand)로 안전하게 실행할 수 있도록 처리했습니다.

```js
await runCommand("tar", ["-cf", "note.tar", "note.md", "assets"]);
await runCommand("/usr/bin/xattr", ["-w", "user.creatorId", creatorId, "note.md"]);
```

또한, 노트의 원본 검증을 위해 Solidity로 작성된 스마트 컨트랙트 `NoteDataRegistry를` Binance Smart Chain에 배포하여 노트의 생성자와 노트 ID를 블록체인에 등록할 수 있도록 구성했습니다.  
 노트를 다시 가져올 때는 아카이브를 풀고 추출한 메타데이터를 스마트 컨트랙트와 비교해 실제로 등록된 적이 있는 노트인지 여부를 확인할 수 있습니다.  
 이렇게 하면 사용자가 업로드한 노트가 원본인지에 대한 명확한 출처 검증이 가능합니다.

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

### (3) 결과: 노트는 누가 만들었는지 확실히 증명될 수 있어요

이러한 방식을 통해 사용자는 노트를 로컬로 안전하게 내보내고, 다시 서비스에 가져올 때 출처 정보가 손실되지 않고 정확하게 복원됩니다.  
xattr 메타데이터는 마크다운 본문에 영향을 주지 않으면서도 안정적으로 노트의 출처 정보를 보관하며, 블록체인을 통해 검증되어 노트가 원본인지 여부도 명확히 식별할 수 있습니다.  
시스템은 로컬에서 가져온 노트의 메타데이터를 블록체인에 이미 등록된 데이터와 대조하여 일치 여부를 사용자에게 즉시 알려줌으로써,  
신뢰할 수 있는 노트 관리 환경을 제공할 수 있게 되었습니다.

<br>

## 3-4. 라이브러리 없이 구현한 SSE 기반 실시간 알림 시스템

### (1) 고민: 사용자에게 알림은 언제, 왜 필요할까?

Notable Block은 단순한 에디터가 아니라, 노트가 생성된 이후 공유되거나 복사되고 재업로드되는 과정을 정확히 추적할 필요가 있습니다.  
만약 알림 기능이 없다면 사용자는 자신의 노트가 누군가에 의해 수정되어 공유된 사실을 알 수 없고,  
노트의 생성, 삭제 흐름 역시 직접 페이지에 방문하지 않고는 확인할 수 없습니다.  
결과적으로 노트의 변화에 대한 피드백이 즉각적으로 제공되지 않아 사용자가 서비스에서 불편함을 느낄 가능성이 높았습니다.

이러한 문제를 해결하기 위해 실시간으로 사용자가 노트의 변화를 인지할 수 있도록 알림 기능 도입을 결정하게 되었습니다.

<br>

### (2) 구현: MongoDB Change Stream과 SS를 활용한 실시간 알림 시스템

알림 기능을 구현하기 위해 다음 네 가지 통신 방식을 검토했습니다.

| 방식         | 특징                              | 한계점                                   |
| ------------ | --------------------------------- | ---------------------------------------- |
| Polling      | 일정 주기로 서버에 요청           | 과도한 HTTP 요청 → 서버 부하 및 지연     |
| Long Polling | 요청 유지 후 재요청               | Polling과 유사, 반복적인 연결 비용       |
| WebSocket    | 양방향 통신                       | 단방향 알림 기능엔 과한 리소스           |
| **SSE**      | **서버 → 클라이언트 단방향 통신** | **필요한 기능만 제공하며 가볍고 효율적** |

최종적으로 서버에서 클라이언트로 데이터를 단방향으로 전달하는 **Server-Sent Events(SSE)** 를 선택했습니다.

<br>

구체적으로 알림이 생성되는 시점은 MongoDB의 Change Stream 기능을 사용해 `Notification` 컬렉션에 새로 삽입된 문서를 감지하는 방식으로 구현되었습니다. 이 때 특정 사용자에게만 관련된 알림이 스트리밍될 수 있도록 필터링 조건을 적용했습니다

```js
const notificationFilter = [{ $match: { "fullDocument.recipientId": user._id } }];
const notificationStream = Notification.watch(notificationFilter);

notificationStream.on("change", (change) => {
  res.write(`data: ${JSON.stringify(change)}\n\n`);
});
```

클라이언트에서는 `EventSource` 객체를 활용하여 서버에서 전송된 알림을 실시간으로 수신할 수 있도록 구성했습니다.  
수신된 알림 데이터는 즉시 화면에 토스트 형태로 표시되어, 사용자가 즉각적으로 상황을 인지할 수 있습니다.

```js
const eventSource = new EventSource("/notification/live", { withCredentials: true });

eventSource.onmessage = (event) => {
  const { fullDocument } = JSON.parse(event.data);
  setToast([fullDocument]);
  setIsToastVisible(true);
};
```

알림의 위치나 지속적인 재확인 편의를 위해, 별도의 알림 허브(`NotificationHub`)를 통해 받은 알림들을 한 번에 모아 볼 수 있도록 설계했습니다.  
사용자는 놓친 알림도 언제든 다시 확인할 수 있고, 특정 알림을 클릭하면 바로 해당 노트로 이동하여 상세 내용을 확인할 수 있게 됩니다.

<br>

### (3) 결과: 사용자는 노트의 흐름을 실시간으로 추적하고, 놓친 알림도 다시 확인할 수 있습니다.

실시간 알림 시스템을 도입하면서 사용자는 더 이상 노트의 복사, 공유, 삭제 같은 중요한 흐름을 놓치지 않게 되었습니다.  
알림은 즉시 화면에 표시되어 빠른 피드백을 제공하고, 토스트를 놓쳤더라도 알림 허브(NotificationHub) 를 통해 언제든 다시 확인할 수 있습니다.  
경우에 따라 알림은 해당 노트로 이동할 수 있는 링크를 포함하고 있어, 사용자는 클릭 한 번으로 노트의 내용을 확인할 수 있습니다.

<div align="center">
  <img width="600px" src="" />
  <p><em>복사해간 내 노트를 다른 사용자에 의해 수정되고 다시 공유되었을 때, 실시간 알림을 통해 이를 즉시 인지하고 해당 노트로 이동하는 흐름</em></p>
</div>

<br>

## 3-5. 트리 차트를 활용한 노트 구조 시각화

### (1) 고민: 사용자에게 어떻게 노트가 파생되었는지 편리하게 보여줄 수 있을까?

Notable Block은 노트가 단순히 작성되고 끝나는 것이 아니라, 공유되고 복사되며 다시 파생되는 과정이 핵심인 서비스입니다.  
따라서 사용자가 작성한 노트가 어떤 경로로 공유되고, 어떻게 확산되었는지를 명확히 보여주는 것이 중요합니다.  
하지만 노트 간의 복잡한 관계와 흐름을 한눈에 파악하기 어려워 사용자에게 직관적인 경험을 제공하기 어렵다고 판단했습니다.

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

### (3) 결과: 노트의 파생과 관계를 한눈에 이해할 수 있어요

트리 차트를 도입한 결과, 사용자는 작성한 노트가 누구에 의해 복사되고 어떻게 공유되어 확산되었는지, 한눈에 직관적으로 확인할 수 있게 되었습니다.  
노트의 흐름을 명확히 보여주는 인터페이스 덕분에 노트 간의 관계를 더욱 쉽게 파악할 수 있고, 이를 통해 사용자는 보다 빠르고 정확하게 노트의 현재 상태와 활용 상황을 이해할 수 있습니다. 사용자 경험이 전반적으로 향상되어 서비스의 사용성 또한 높였습니다.

<div align="center">
  <img width="600px" alt="트리차트 시연" src="https://github.com/user-attachments/assets/4eeb0e89-1fa6-4a6a-a29e-a4e66522ddf1" />
  <p><em>트리 차트를 통해 사용자가 노트의 파생과 관계를 확인하고, 특정 노트를 클릭해 에디터로 이동하는 모습</em></p>
</div>

<br>

## 3-6. 리프레쉬 토큰, 액세스 토큰을 활용한 로그아웃 없는 로그인 유지

### (1) 고민: 로그인 상태를 어떻게 안정적으로 유지할 수 있을까?

사용자에게 로그인 후에도 **서비스를 끊김 없이 사용할 수 있는 환경**을 제공하고 싶었습니다.  
하지만 일반적인 OAuth2 인증은 **액세스 토큰이 만료되면 로그인 상태가 해제**되고,  
사용자는 다시 수동으로 로그인을 해야만 했습니다.

특히 노트 작성 중 새로고침하거나, 일정 시간이 지나 토큰이 만료되면 작성하던 흐름이 끊기고 다시 로그인해야 하는 불편함이 발생했습니다.  
이를 해결하기 위해, **사용자가 직접 로그인하지 않아도 자동으로 토큰을 갱신하고 인증 상태를 복원하는 구조**를 설계했습니다.

<br>

### (2) 구현: 자동 로그인 흐름과 쿠키 기반 상태 유지

#### 1. 로그인 시 토큰과 사용자 정보를 쿠키에 저장

`/login` 엔드포인트에서는 Google OAuth 인증을 통해 받은 액세스 토큰과 리프레쉬 토콘을 이용해 사용자를 인증하고,  
이 정보를 안전하게 쿠키에 저장합니다.
이때 액세스 토큰은 `httpOnly`, `secure`, `sameSite=strict` 옵션으로 설정되어 보안성을 유지했습니다.

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

### (3) 결과: 로그인 상태가 유지되어 서비스 흐름이 끊기지 않아요

사용자는 한 번 로그인한 이후, 새로고침하거나 브라우저를 닫았다가 다시 열더라도 로그인이 유지되는 것은  
물론 토큰 만료 시에도 백그라운드에서 **자동으로 액세스 토큰을 갱신해 재로그인 없이 인증 상태를 복원**할 수 있습니다.  
리프레쉬 토큰이 노출되지 않도록 서버(DB)에서만 관리하며, 사용자 측에는 저장하지 않아 보안도 유지됩니다.

<br>

# 4. 프로젝트의 정보

## 4-1. 기술 스택

### 클라이언트

![React](https://img.shields.io/badge/react-%23404d59.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23404d59.svg?style=for-the-badge&logo=vite&logoColor=w)
![Axios](https://img.shields.io/badge/axios-%23404d59.svg?style=for-the-badge&logo=axios&logoColor=w)
![Zustand](https://img.shields.io/badge/zustand-%23404d59.svg?style=for-the-badge&logo=react&logoColor=black)
![D3](https://img.shields.io/badge/D3-404d59.svg?style=for-the-badge&logo=d3&logoColor=F9A03C)
![Styled-components](https://img.shields.io/badge/styled_component-404d59.svg?style=for-the-badge&logo=styledcomponents&logoColor=DB7093)

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

## 4-2. 프로젝트 구조

- 공통 컴포넌트의 사용, 커스텀 훅(모달 등) 사용함 등 작성
- 테스트 코드 적용
- 스타일드 컴포넌트 S. 네이밍 적용

# 5. 회고

개발자가 편한 서비스가 아닌 사용자가 편한 서비스를 만들기 위해 노력했습니다.
