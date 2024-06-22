export function getLetterGrade(overall: number | null) {
  if (!overall) return null;

  if (overall >= 80 && overall <= 100) {
    return 'AP';
  } else if (overall >= 70 && overall < 80) {
    return 'AO';
  } else if (overall >= 60 && overall < 70) {
    return 'AM';
  } else if (overall >= 55 && overall < 60) {
    return 'BP';
  } else if (overall >= 50 && overall < 55) {
    return 'BO';
  } else if (overall >= 45 && overall < 50) {
    return 'BM';
  } else if (overall >= 41 && overall < 45) {
    return 'CP';
  } else if (overall >= 38 && overall < 41) {
    return 'CO';
  } else if (overall >= 35 && overall < 38) {
    return 'CM';
  } else {
    return 'FAIL';
  }
}
