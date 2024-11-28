/**
 * 기존 path.basename과 유사한 역할을 수행
 *
 * @param filePath 필요한 파일 주소
 * @param suffix 필요한 파일 주소
 * @return 파일의 이름을 규칙에 맞게 반환합니다
 *
 */
export const getBasename = (filePath: string, suffix?: string) => {
  const basename = filePath.split("/").pop() ?? "";
  if (suffix && basename.endsWith(suffix)) {
    return basename.slice(0, -suffix.length);
  }
  return basename;
};
// TODO: 테스트코드 작성 필요
