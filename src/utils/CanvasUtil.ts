import CalcUtil from "src/utils/CalcUtil";

class CanvasUtil {
  calc: CalcUtil;
  constructor() {
    this.calc = new CalcUtil();
  }

  /**
   *
   * @description 캔버스 도구와 엘리먼트를 리턴해준다.
   * @param {string} selector
   * @returns {ICanvasMaterial}
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CanvasUtil
   */
  canvasReturn(selector: string): ICanvasMaterial {
    const $canvasElem: HTMLCanvasElement | null = document.querySelector(selector);

    if (!$canvasElem) throw new Error(`element to have ${selector} don't find `);

    const ctx = $canvasElem.getContext("2d");

    if (!ctx) throw new Error(`this Element is not Canvas Element`);

    return {
      $canvasElem,
      ctx,
    };
  }

  /**
   *
   * @description 색상환 원을 그릴 켄버스 엘리먼트를 넣어주면 원을 그려준다.
   * @param {string} selector
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CanvasUtil
   */
  draw(selector: string): void {
    const { $canvasElem, ctx } = this.canvasReturn(selector);

    const centerPoint = $canvasElem.clientWidth / 2;

    for (let x = 0; x < $canvasElem.clientWidth; x++) {
      for (let y = 0; y < $canvasElem.clientHeight; y++) {
        const S = (this.calc.circleEquation(centerPoint, [x, y]) / centerPoint) * 100;
        const H = this.calc.calculateAngleByDistance(centerPoint, [x, y]);

        ctx.fillStyle = `hsl(${H}, ${S}, 50%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  /**
   *
   * @description 밝기바 그려주는 메서드
   * @param {string} selector
   * @param {number} H (Hue)
   * @param {number} S (Saturation)
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CanvasUtil
   */
  lightNessDraw(selector: string, H: number, S: number): void {
    const { $canvasElem, ctx } = this.canvasReturn(selector);

    for (let x = 0; x <= $canvasElem.clientWidth; x++) {
      ctx.fillStyle = `hsl(${H}, ${S}, ${(x / $canvasElem.clientWidth) * 100}%)`;
      ctx.fillRect(x, 0, 1, $canvasElem.clientHeight);
    }
  }
}

export default CanvasUtil;
