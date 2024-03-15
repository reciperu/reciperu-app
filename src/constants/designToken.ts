import { ColorData, ColorVariable } from '@/types/color';
import { RadiusData, RadiusVariable } from '@/types/radius';
import { SpacingData, SpacingVariable } from '@/types/spacing';

const colors = require('./styles/Color.json');
const radius = require('./styles/Radius.json');
const spacing = require('./styles/Spacing.json');

export class Constants {
  private static _colors = colors;
  private static _radius = radius;
  private static _spacing = spacing;

  static _rgbaToHex(r: number, g: number, b: number, a: number) {
    // RGBA値を0から255の範囲に変換
    const red = Math.round(r * 255);
    const green = Math.round(g * 255);
    const blue = Math.round(b * 255);
    const alpha = a;

    // 各チャンネルを16進数文字列に変換
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // アルファ値を16進数文字列に変換
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');

    // カラーコードを作成
    const colorCode = `#${redHex}${greenHex}${blueHex}${alphaHex}`;

    return colorCode;
  }

  static _getColors() {
    const colorsData = JSON.parse(JSON.stringify(this._colors));
    const variables = colorsData.variables;
    const colorObj: any = {};
    for (const variable of variables as ColorVariable[]) {
      const variableName = variable.name;
      const [category, name, shade] = variableName.split('/');
      const rgba = Object.values(variable.valuesByMode)[0];
      if (Object.keys(rgba).length) {
        colorObj[category] = {
          ...colorObj[category],
          [name]: {
            ...colorObj[category]?.[name],
            [shade]: this._rgbaToHex(rgba.r, rgba.g, rgba.b, rgba.a),
          },
        };
      }
    }
    return colorObj;
  }

  static _getRadius() {
    const radiusData = JSON.parse(JSON.stringify(this._radius));
    const variables = radiusData.variables;
    const radiusObj: any = {};
    for (const variable of variables as RadiusVariable[]) {
      const variableName = variable.name;
      const [category, name] = variableName.split('/');
      const value = Object.values(variable.valuesByMode)[0];
      if (typeof value === 'number') {
        radiusObj[category] = {
          ...radiusObj[category],
          [name]: value,
        };
      }
    }
    return radiusObj['radius'];
  }

  static _getSpacing() {
    const spacingData = JSON.parse(JSON.stringify(this._spacing));
    const variables = spacingData.variables;
    const spacingObj: any = {};
    for (const variable of variables as SpacingVariable[]) {
      const variableName = variable.name;
      const [category, name] = variableName.split('/');
      const value = Object.values(variable.valuesByMode)[0];
      if (typeof value === 'number') {
        spacingObj[category] = {
          ...spacingObj[category],
          [name]: value,
        };
      }
    }
    return spacingObj['spacing'];
  }

  static colors = this._getColors() as ColorData;
  static radius = this._getRadius() as RadiusData;
  static spacing = this._getSpacing() as SpacingData;
}
