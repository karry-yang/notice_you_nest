// import * as bcrypt from 'bcrypt';

// export class PasswordHelper {
//   // 生成盐
//   static async generateSalt(): Promise<string> {
//     return await bcrypt.genSalt(10);
//   }

//   // 加密密码（加盐混合）
//   static async hashPassword(password: string, salt: string): Promise<string> {
//     return await bcrypt.hash(password + salt, 10);
//   }

//   // // 验证密码是否匹配
//   // static async comparePassword(plainPassword: string, hashedPassword: string, salt: string): Promise<boolean> {
//   //   const hash = await this.hashPassword(plainPassword, salt);
//   //   return hash === hashedPassword;
//   // }
//    // 验证密码是否匹配
//    static async comparePassword(
//     plainPassword: string,
//     hashedPassword: string,
//     salt: string,
//   ): Promise<boolean> {
//     return await bcrypt.compare(plainPassword + salt, hashedPassword);
//   }
// }


import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  // 生成加密后的密码（bcrypt 自动生成盐并内嵌在 hash 中）
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;  // 推荐 10-12 之间
    return await bcrypt.hash(password, saltRounds);
  }

  // 验证密码是否匹配
  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
