export class AuthCodeCreator {
  createCode(length: number) {
    let code = ''
    for (let i = 0; i < length; i++)
      code += Math.floor(Math.random() * 10).toString(10)

    return code
  }
}
