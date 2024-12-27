import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLocation {
  @ApiProperty()
  @Prop()
  id?: String;

  @ApiProperty()
  @Prop()
  lat?: Number;

  @ApiProperty()
  @Prop()
  lng?: Number;

  @ApiProperty()
  @Prop()
  name?: String;

  @ApiProperty()
  @Prop()
  county?: String;

  @ApiProperty()
  @Prop()
  state?: String;

  @ApiProperty()
  @Prop()
  country?: String;
}
