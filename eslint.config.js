import js from '@eslint/js'; // 자바스크립트 기본 ESLint 규칙을 제공
import prettierConfig from 'eslint-config-prettier'; // ESLint와 Prettier 충돌 방지
import prettier from 'eslint-plugin-prettier'; // Prettier 포맷팅 규칙을 ESLint에 통합
import reactHooks from 'eslint-plugin-react-hooks'; // React의 Hooks 사용 규칙을 검사
import reactRefresh from 'eslint-plugin-react-refresh'; // React Fast Refresh 관련 규칙을 제공
import globals from 'globals'; // 브라우저, Node 등 다양한 환경의 전역 변수 정의를 제공
import tseslint from 'typescript-eslint'; // TypeScript 코드에 대한 ESLint 지원을 추가

// tseslint.config 함수로 ESLint 설정을 정의
export default tseslint.config(
  // dist 폴더는 빌드 결과물이므로 ESLint 검사에서 제외
  { ignores: ['dist'] },
  {
    // extends 옵션은 기본 자바스크립트 및 타입스크립트 권장 규칙을 확장
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    // 검사할 파일 확장자를 지정 (ts, tsx)
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 문법을 사용
      globals: globals.browser, // 브라우저 환경의 전역 변수를 사용
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks 규칙 플러그인 활성화
      'react-refresh': reactRefresh, // React Fast Refresh 규칙 플러그인 활성화
      prettier: prettier, // Prettier 포맷팅 규칙 플러그인 활성화
    },
    rules: {
      // react-hooks 규칙을 모두 활성화 (useEffect, useState 등 올바른 사용 검사)
      ...reactHooks.configs.recommended.rules,
      // 컴포넌트만 export 하도록 권장 (React Fast Refresh를 위한 규칙)
      'react-refresh/only-export-components': [
        'warn', // 위반 시 경고만 표시
        { allowConstantExport: true }, // 상수 export는 허용
      ],
      // 빈 구조 분해 패턴 허용 (예: const {} = obj)
      'no-empty-pattern': 'off',
      // any 타입 사용을 허용 (타입 안정성보다 유연성을 우선할 때 사용)
      '@typescript-eslint/no-explicit-any': 'off',
      // _로 시작하는 변수(예: _unused) 또는 _만 사용해도 경고/에러 없이 허용
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // short-circuit 표현식(예: observer && observer.disconnect()) 허용
      '@typescript-eslint/no-unused-expressions': 'off',
      // 선택적 체이닝과 non-null assertion 함께 사용 허용
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      // Prettier 포맷팅 규칙을 에러로 처리
      'prettier/prettier': 'error',
    },
  },
);
