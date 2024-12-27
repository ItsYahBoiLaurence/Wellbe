import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export enum ComparisonType {
  LessThan,
  LessThanEqual,
  GreaterThan,
  GreaterThanEqual,
}

export function CompareNumberWith(
  property: string,
  comparisonType: ComparisonType,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CompareNumberWith',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          const isValid =
            (comparisonType === ComparisonType.LessThan &&
              value < relatedValue) ||
            (comparisonType === ComparisonType.LessThanEqual &&
              value <= relatedValue) ||
            (comparisonType === ComparisonType.GreaterThan &&
              value > relatedValue) ||
            (comparisonType === ComparisonType.GreaterThanEqual &&
              value >= relatedValue);

          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            isValid
          );
        },
      },
    });
  };
}
