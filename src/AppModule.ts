import {Module} from '@nestjs/common';
import {RenderModule} from 'nest-next';
import {ReactNextModule} from '@server/modules/reactNext/ReactNextModule';
import {HelloWorldContentService} from '@server/services/HelloWorldContentService';
import {HealthCheckModule} from '@server/modules/healthCheck/HealthCheckModule';
import {ServeStaticModule} from '@server/modules/serveStatic/ServeStaticMiddleware';

@Module({
    imports: [
        ReactNextModule,
        RenderModule,
        HealthCheckModule,
        ServeStaticModule,
    ],
    controllers: [],
    providers: [HelloWorldContentService],
})
export class AppModule {}
