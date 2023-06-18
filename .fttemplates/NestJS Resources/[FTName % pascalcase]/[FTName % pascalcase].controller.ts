import { BaseEntity, FormBuilder } from "@fenix/model";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { BaseService } from "src/generic/base.service";

@Controller("<FTName | lowercase>")
export class <FTName | pascalcase>Controller<T extends BaseEntity> {
  constructor(private readonly BaseService: BaseService<T>) {}

  @Post("findAll")
  async findAll(): Promise<T[]> {
    return [];
  }

  @Post("find")
  async find(@Body() filtro: any): Promise<T[]> {
    return [];
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Param("table") table: string
  ): Promise<T> {
    if (id) {
      return this.BaseService.findOne(table, null, { id, visivel: true });
    } else {
      return null;
    }
  }

  @Delete(":id/:table")
  async delete(
    @Headers() headers,
    @Param("id", ParseIntPipe) id: number,
    @Param("table") table: string
  ) {
    this.BaseService.auth(headers.user_id);
    this.BaseService.delete(id, table);
  }

  @Post("/deleteByIdList")
  async deleteByIdList(@Headers() headers, @Body() ids: Array<number>) {
    this.BaseService.auth(headers.user_id);
    this.BaseService.deleteByIdList(ids, "table");
  }

  @Put("update")
  async update(
    @Headers() headers,
    @Body() entity: any,
    @Param("id", ParseIntPipe) id: number
  ): Promise<T> {
    this.BaseService.auth(headers.user_id);
    entity.id = id;
    return this.BaseService.update(entity, "table");
  }

  @Post("save/:id")
  async saveForm(@Body() builder: FormBuilder, @Param("id") id: number) {
    if (builder.table) {
      return this.BaseService.saveForm(builder, id);
    } else {
      throw new BadRequestException();
    }
  }

  @Get("test")
  async teste(@Headers() headers): Promise<any> {
    return "OK";
  }
}
