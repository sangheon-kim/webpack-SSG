class ConversionUtil {
  constructor() {}

  /**
   *
   * @description hsl Value -> rgb Value
   * @param {number} H hue 색조 (0 ~ 360)
   * @param {number} S saturation 채도 (0 ~ 100)
   * @param {number} L light 밝기 (0 ~ 100)
   * @returns {Array<number>} [R, G, B]
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof CalcUtil
   */
  hslToRgb(H: number, S: number, L: number): [number, number, number] {
    const C = (1 - Math.abs(2 * L - 1)) * S;
    const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
    const m = L - C / 2;

    let [R1, G1, B1] = [0, 0, 0];

    if (H >= 0 && H <= 60) {
      R1 = C;
      G1 = X;
      B1 = 0;
    } else if (H >= 60 && H < 120) {
      R1 = X;
      G1 = C;
      B1 = 0;
    } else if (H >= 120 && H < 180) {
      R1 = 0;
      G1 = C;
      B1 = X;
    } else if (H >= 180 && H < 240) {
      R1 = 0;
      G1 = X;
      B1 = C;
    } else if (H >= 240 && H < 300) {
      R1 = X;
      G1 = 0;
      B1 = C;
    } else {
      R1 = C;
      G1 = 0;
      B1 = X;
    }

    // ',' 기준으로 R, G, B
    return [Math.floor((R1 + m) * 255), Math.floor((G1 + m) * 255), Math.floor((B1 + m) * 255)];
  }

  /**
   *
   * @description RGB Value to HSL Value
   * @param {number} R (0 ~ 255)
   * @param {number} G (0 ~ 255)
   * @param {number} B (0 ~ 255)
   * @returns {[number, number, number]} [H, S, L]
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof ConversionUtil
   */
  rgbToHsl(R: number, G: number, B: number): [number, number, number] {
    let [H, S, L] = [0, 0, 0];

    // R`, G`, B` R` = R / 255, G` = G / 255, B` = B / 255
    const args = [R, G, B].map((color) => color / 255);
    const [R1, G1, B1] = args;
    const CMax = Math.max(...args);
    const CMin = Math.min(...args);
    const triangle = CMax - CMin;
    const maxIndex = args.lastIndexOf(CMax);

    L = (CMax + CMin) / 2;
    if (!!triangle) {
      switch (maxIndex) {
        case 0:
          H = ((G1 - B1) / triangle) % 6;
          break;
        case 1:
          H = (B1 - R1) / triangle + 2;
          break;
        case 2:
          H = (R1 - G1) / triangle + 4;
          break;
        default:
          break;
      }
      H *= 60;
      S = triangle / (1 - Math.abs(2 * L - 1));
    } else {
      H = 0;
      S = 0;
    }
    H = Math.floor(H);
    if (H < 0) H += 360;

    return [H, S, L];
  }

  /**
   *
   * @description RGB value to Hex Code
   * @param {number} R (0 ~ 255)
   * @param {number} G (0 ~ 255)
   * @param {number} B (0 ~ 255)
   * @returns {string} #000000 ~ #ffffff
   * @author Sangheon Kim ksj8367 (gmail)
   * @memberof ConversionUtil
   */
  rgbToHex(R: number, G: number, B: number): string {
    let Hex: string | number = R * 65536 + G * 256 + B;
    Hex = Hex.toString(16);
    let len = Hex.length;
    if (len < 6) for (let i = 0; i < 6 - len; i++) Hex = "0" + Hex;

    return Hex.toUpperCase();
  }
}

export default ConversionUtil;
