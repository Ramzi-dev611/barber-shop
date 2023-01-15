import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ConfigDbService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
          type: 'postgres',
          host: this.configService.get<string>('DB_HOST'),
          port: this.configService.get<number>('DB_PORT'),
          username: this.configService.get<string>('DB_USER'),
          password: this.configService.get<string>('DB_PASSWD'),
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
        };
    }

}