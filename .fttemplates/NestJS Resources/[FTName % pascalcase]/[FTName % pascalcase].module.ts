import { Module } from '@nestjs/common';
import { [FTName]Controller } from './[FTName].controller';
import { [FTName]Service } from './[FTName].service';

@Module({
  controllers: [[FTName]Controller],
  providers: [[FTName]Service],
})
export class [FTName]Module {}