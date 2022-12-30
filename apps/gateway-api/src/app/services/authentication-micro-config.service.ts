import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProvider, ClientsModuleOptionsFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class AuthenticationMicroserviceConfig implements ClientsModuleOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    createClientOptions(): ClientProvider | Promise<ClientProvider> {
        const port = this.configService.get<number>('AUTH_MICRO_PORT');
        const host = this.configService.get<string>('AUTH_MICRO_HOST');
        return {
            transport: Transport.TCP,
            options: {
                port,
                host, 
            }
        }
    }
}