# 📖 학습 가이드 - 초보자를 위한 코드 이해하기

이 문서는 코딩을 배운 지 3개월 된 초보자를 위한 학습 가이드입니다.

## 🎯 이 프로젝트에서 배울 수 있는 것들

### 1. React 기본 개념

#### 컴포넌트 (Component)
컴포넌트는 화면의 작은 부분을 만드는 함수입니다.

```jsx
// 예시: Button 컴포넌트
export default function Button({ children }) {
  return <button>{children}</button>;
}
```

**어디서 볼 수 있나요?**
- `src/components/ui/Button.jsx` - 버튼 컴포넌트
- `src/components/movies/Card.jsx` - 영화 카드 컴포넌트

#### 상태 (State)
상태는 컴포넌트가 기억하는 데이터입니다. `useState`로 관리합니다.

```jsx
const [count, setCount] = useState(0);
// count: 현재 값
// setCount: 값을 바꾸는 함수
```

**어디서 볼 수 있나요?**
- `src/pages/LoginPage.jsx` - 이메일, 비밀번호 입력값 관리
- `src/auth/provider.jsx` - 로그인 상태 관리

#### Effect (부수 효과)
컴포넌트가 렌더링될 때 실행되는 코드입니다.

```jsx
useEffect(() => {
  // 여기서 API 호출, 타이머 설정 등을 합니다
}, [deps]); // deps가 바뀌면 다시 실행
```

**어디서 볼 수 있나요?**
- `src/hooks/useFetch.js` - API 호출
- `src/auth/provider.jsx` - 로그인 상태 확인

### 2. React Router (페이지 이동)

#### 라우팅이란?
URL에 따라 다른 페이지를 보여주는 것입니다.

```
/ → HomePage
/search → QueryPage
/movie/123 → DetailPage
/login → LoginPage
```

**어디서 볼 수 있나요?**
- `src/router/router.jsx` - 모든 라우트 설정

#### 페이지 이동하기
```jsx
const navigate = useNavigate();
navigate("/login"); // 로그인 페이지로 이동
```

**어디서 볼 수 있나요?**
- `src/pages/LoginPage.jsx` - 로그인 성공 후 이동

### 3. Context API (전역 상태 관리)

#### Context란?
여러 컴포넌트에서 공유하는 데이터를 관리하는 방법입니다.

```jsx
// Provider로 감싸기
<AuthProvider>
  <App />
</AuthProvider>

// 어디서든 사용하기
const { user, login } = useAuth();
```

**어디서 볼 수 있나요?**
- `src/auth/provider.jsx` - 인증 상태 관리
- `src/pages/LoginPage.jsx` - 로그인 기능 사용

### 4. 커스텀 훅 (Custom Hooks)

#### 훅이란?
반복되는 로직을 함수로 만들어 재사용하는 것입니다.

```jsx
// 공통 훅
const { data, loading, error } = useFetch(
  () => fetchData(),
  [id]
);
```

**어디서 볼 수 있나요?**
- `src/hooks/useFetch.js` - API 호출 공통 로직
- `src/hooks/movies/useDetail.js` - 영화 상세 정보 가져오기

## 📚 단계별 학습 순서

### 1단계: 기본 구조 이해하기
1. `src/main.jsx` 읽기 - 앱이 어떻게 시작되는지
2. `src/App.jsx` 읽기 - 라우터가 어떻게 작동하는지
3. `src/router/router.jsx` 읽기 - 어떤 페이지가 있는지

### 2단계: 컴포넌트 이해하기
1. `src/components/ui/Button.jsx` - 간단한 컴포넌트
2. `src/components/movies/Card.jsx` - props를 받는 컴포넌트
3. `src/pages/HomePage.jsx` - 여러 컴포넌트를 조합한 페이지

### 3단계: 상태 관리 이해하기
1. `src/pages/LoginPage.jsx` - useState 사용법
2. `src/auth/provider.jsx` - Context 사용법
3. `src/hooks/useFetch.js` - 커스텀 훅 만들기

### 4단계: API 호출 이해하기
1. `src/services/movie-database/movies.js` - API 호출 함수
2. `src/hooks/movies/useDetail.js` - 훅에서 API 사용
3. `src/pages/DetailPage.jsx` - 페이지에서 훅 사용

## 💡 자주 묻는 질문

### Q1. useState는 언제 사용하나요?
**A:** 컴포넌트 내부에서 변경되는 데이터가 있을 때 사용합니다.
- 예: 입력값, 체크박스 상태, 로딩 상태

### Q2. useEffect는 언제 사용하나요?
**A:** 컴포넌트가 렌더링될 때 실행되어야 하는 코드가 있을 때 사용합니다.
- 예: API 호출, 타이머 설정, 이벤트 리스너 등록

### Q3. Context는 언제 사용하나요?
**A:** 여러 컴포넌트에서 공유해야 하는 데이터가 있을 때 사용합니다.
- 예: 로그인 상태, 테마 설정

### Q4. 커스텀 훅은 왜 만들나요?
**A:** 반복되는 로직을 재사용하기 위해서입니다.
- 예: API 호출 로직이 여러 곳에서 비슷하게 사용될 때

## 🔍 코드 읽는 팁

1. **위에서 아래로 읽기**: 파일의 맨 위에서 시작해서 아래로 읽으세요
2. **주석 읽기**: 주석을 먼저 읽으면 코드의 목적을 이해하기 쉽습니다
3. **import 확인하기**: 어떤 것을 가져오는지 보면 파일의 역할을 알 수 있습니다
4. **함수 이름 보기**: 함수 이름만 봐도 무엇을 하는지 알 수 있습니다

## 🎓 다음 단계

이 프로젝트를 이해했다면:

1. **작은 기능 추가하기**
   - 버튼 클릭 시 알림 표시
   - 좋아요 기능 추가

2. **스타일 수정하기**
   - 색상 변경
   - 레이아웃 변경

3. **새로운 페이지 만들기**
   - About 페이지
   - Contact 페이지

4. **기능 개선하기**
   - 검색 결과에 페이지네이션 추가
   - 위시리스트 기능 구현

## 📝 학습 체크리스트

- [ ] main.jsx가 무엇을 하는지 이해했다
- [ ] 컴포넌트가 무엇인지 이해했다
- [ ] useState를 사용할 수 있다
- [ ] useEffect를 사용할 수 있다
- [ ] props를 전달할 수 있다
- [ ] 라우팅이 무엇인지 이해했다
- [ ] Context를 사용할 수 있다
- [ ] 커스텀 훅을 만들 수 있다
- [ ] API를 호출할 수 있다

각 항목을 체크하면서 학습해보세요!

