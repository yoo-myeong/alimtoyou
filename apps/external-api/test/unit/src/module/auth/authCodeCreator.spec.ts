import { AuthCodeCreator } from '../../../../../../../libs/common/src/domain/auth/authCodeCreator'

describe('AuthCodeCreator', () => {
  it('전달한 길이만큼의 숫자형 문자열을 생성합니다.', () => {
    const sut = new AuthCodeCreator()
    const length = 6

    const result = sut.createCode(length)

    expect(result.length).toBe(length)
  })
})
