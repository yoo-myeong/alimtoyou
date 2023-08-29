import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { BadRequestException } from '@nestjs/common'

export async function from<T extends object, V>(
  plain: ClassConstructor<T>,
  instance: V,
) {
  const result = plainToInstance<T, V>(plain, instance, {
    excludeExtraneousValues: true,
  })

  const validated = await validate(result)

  if (validated.length) {
    const message = validated
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((it) => Object.values(it.constraints!)[0])
      .join(', ')

    throw new BadRequestException(message)
  }

  return result
}
