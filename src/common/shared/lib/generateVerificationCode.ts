/**
 * @description 生成英文+数字混合的验证码
 * @param length 验证码长度，默认 6
 * @returns 验证码字符串
 */
export function generateVerificationCode(length = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  