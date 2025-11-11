# 🎬 Mini Movies - 영화 검색 앱

React를 배우는 초보자를 위한 영화 검색 프로젝트입니다.

## 📚 프로젝트 구조 설명

```
src/
├── main.jsx              # 앱의 시작점 (진입점)
├── App.jsx               # 메인 앱 컴포넌트 (라우터 설정)
│
├── auth/                 # 인증 관련
│   ├── context.js        # 인증 상태를 관리하는 Context
│   ├── provider.jsx     # 인증 Provider (로그인/회원가입 기능)
│   └── supabase.js      # Supabase 클라이언트 설정
│
├── router/               # 라우팅 (페이지 이동)
│   ├── router.jsx        # 라우트 설정 (어떤 URL에 어떤 페이지를 보여줄지)
│   ├── paths.js         # 라우트 경로 상수
│   └── RequireAuth.jsx  # 로그인이 필요한 페이지를 보호
│
├── pages/                # 페이지 컴포넌트
│   ├── HomePage.jsx      # 홈 페이지
│   ├── DetailPage.jsx   # 영화 상세 페이지
│   ├── QueryPage.jsx    # 검색 결과 페이지
│   ├── LoginPage.jsx     # 로그인 페이지
│   └── SignupPage.jsx    # 회원가입 페이지
│
├── components/           # 재사용 가능한 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트 (Header, Layout)
│   ├── movies/          # 영화 관련 컴포넌트 (Card, TopBanner)
│   └── ui/              # UI 컴포넌트 (Button, Input, Image 등)
│
├── hooks/                # 커스텀 훅 (재사용 가능한 로직)
│   ├── useFetch.js      # API 호출을 위한 공통 훅
│   └── movies/          # 영화 관련 훅들
│
├── services/             # API 서비스
│   └── tmdb/            # TMDB API 관련 (영화 데이터 가져오기)
│
└── utils/                # 유틸리티 함수
    ├── cn.js            # className 병합 함수
    └── format.js        # 날짜/시간 포맷팅 함수
```

## 🚀 시작하기

### 1. 환경 변수 설정

`.env` 파일에 다음 변수들을 설정하세요:

```env
VITE_TMDB_API_BASE=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_ACCESS_TOKEN=your_access_token

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 📖 주요 개념 설명

### 1. React Hooks
- `useState`: 상태(데이터)를 관리
- `useEffect`: 컴포넌트가 렌더링될 때 실행되는 함수
- `useNavigate`: 페이지 이동
- `useParams`: URL 파라미터 가져오기

### 2. Context API
- `AuthContext`: 로그인 상태를 전역으로 관리
- `useAuth`: 어디서든 로그인 상태를 사용할 수 있게 해주는 훅

### 3. React Router
- 페이지 간 이동을 관리
- `path`: URL 경로
- `element`: 해당 경로에서 보여줄 컴포넌트

### 4. 커스텀 훅 (Custom Hooks)
- 반복되는 로직을 함수로 만들어 재사용
- `useFetch`: API 호출 로직을 공통화
- `useDetail`, `usePopular`: 영화 데이터를 가져오는 훅

## 🎯 학습 포인트

1. **컴포넌트 구조**: 작은 컴포넌트를 만들어 조합하는 방식
2. **상태 관리**: useState와 Context를 사용한 상태 관리
3. **API 호출**: fetch를 사용한 데이터 가져오기
4. **라우팅**: React Router를 사용한 페이지 이동
5. **인증**: Supabase를 사용한 로그인/회원가입

## 💡 팁

- 각 폴더의 역할을 이해하면 코드를 찾기 쉬워집니다
- 컴포넌트는 작게 만들고 재사용하는 것이 좋습니다
- 주석을 읽으면 각 코드가 무엇을 하는지 이해할 수 있습니다
