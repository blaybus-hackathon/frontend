# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Prettier 설정

Prettier 코드 포맷터 설치 가이드
설정 시 추후 파일을 저장할 때마다 자동으로 포맷이 적용됩니다.

### 설치

Extensions에 있는 Prettier 설치, 또는 npm install --save-dev prettier

### Format on Save

1. Vscode 설정의 'Preferences' > 'Setting' 이동
2. 'Format On Save' 옵션 체크
3. 'Editor: Default Formatter'에서 Prettier 설정

### 설정 파일 추가

프로젝트 루트에 '.prettierrc' 파일 생성 후 다음을 복사 붙여넣기
{
"semi": true,
"tabWidth": 2,
"printWidth": 100,
"singleQuote": true,
"trailingComma": "all",
"jsxSingleQuote": true,
"bracketSpacing": true,
"arrowParens": "always"
}
