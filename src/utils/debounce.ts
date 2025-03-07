// utils/debounce.ts
import { debounce } from "lodash";

/**
 * 디바운스된 함수 생성
 * @param callback - 실행할 함수
 * @param delay - 지연 시간 (기본값: 300ms)
 */
export const debounceFunction = <T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) => debounce(callback, delay);
