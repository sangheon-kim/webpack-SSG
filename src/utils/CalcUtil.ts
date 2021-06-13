class CalcUtil {
  constructor() {}

  /**
   *
   * @description 360도 기준의 라디안 변형 공식
   * @param {number} degree
   * @returns {number}
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CalcUtil
   */
  degree2radian(degree: number): number {
    degree -= 90;
    return (Math.PI / 180) * degree;
  }

  /**
   *
   * @description radian값을 각도로 바꿔주는 함수
   * @param {number} radian (라디언 값 넣기)
   * @returns {number}
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CalcUtil
   */
  radian2degree(radian: number): number {
    return Math.abs((180 / Math.PI) * radian);
  }

  /**
   *
   * @description 원의 방정식 구하기 (중심점 기준으로 좌표값의 위치 파악)
   * @param {number} centerPoint 중심점
   * @param {Array<number>} offsetArray x,y 좌표 배열
   * @returns {number}
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CalcUtil
   */
  circleEquation(centerPoint: number, offsetArray: Array<number>): number {
    const [offsetX, offsetY] = offsetArray;

    // 중심점으로부터 x거리
    const xDistance = Math.floor(Math.pow(offsetX - centerPoint, 2));
    // 중심점으로부터 y거리
    const yDistance = Math.floor(Math.pow(offsetY - centerPoint, 2));
    // 결과값을 제곱근을 사용해서 결과값 도출 후 중심좌표에서 거리 계산
    const result = Math.floor(Math.sqrt(xDistance + yDistance));

    // 중심점보다 계산값이 클 경우 -를방지하기 위해 중심포인트를 리턴 아닌경우 결과값 리턴
    return result > centerPoint ? centerPoint : result;
  }

  /**
   *
   * @description 거리값과 중심좌표와 현재 좌표값을 이용하여, 각도 계산 함수
   * @param {number} centerPoint
   * @param {[number, number]} offsetArray [offsetX, offsetY]
   * @returns {number} distance
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CalcUtil
   */
  calculateAngleByDistance(centerPoint: number, offsetArray: [number, number]): number {
    const [offsetX, offsetY] = offsetArray;
    // 중심점에서 현재 원에서의 x좌표값
    const x = centerPoint - offsetX;
    // 중심점에서 현재 원에서의 y좌표값
    const y = centerPoint - offsetY;
    // radian 값 구하기
    let radian = Math.atan2(x, y);
    // radian 값 활용해서 각도 구하기
    const degree =
      offsetX < centerPoint
        ? Math.floor(360 - this.radian2degree(radian))
        : Math.floor(this.radian2degree(radian));

    return degree;
  }
}

export default CalcUtil;
