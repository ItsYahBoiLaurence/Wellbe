import { applyDecorators } from '@nestjs/common';
import { Type, TypeHelpOptions, TypeOptions } from 'class-transformer';
import { ValidateNested, ValidationOptions } from 'class-validator';

export function ValidateField(
  validationOptions?: ValidationOptions,
  typeFunction?: (type?: TypeHelpOptions) => Function,
  options?: TypeOptions
) {
  return applyDecorators(
    ValidateNested(validationOptions),
    Type(typeFunction, options)
  );
}
