export function convertSecondsToTime(seconds: number) {
    if (isNaN(seconds) || seconds < 0) {
        return "유효하지 않은 입력입니다";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // 분과 초를 이용하여 시간 문자열을 생성
    const timeString = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;

    return timeString;
}
