import { BaseService } from "src/generic/base.service";
import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from "nestjs-knex";
@Injectable()
export class exampleService extends BaseService<Classe> {
  constructor(@InjectKnex() public readonly knex: Knex) {
    super(knex);
  }
  last(): Promise<any[]> {
    try {
      return this.knex
        .select(["id"])
        .from<any[]>("example")
        .whereRaw(" visivel = 1")
        .orderBy("id", "DESC")
        .limit(1);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
