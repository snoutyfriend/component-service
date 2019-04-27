import { ServeStaticMiddleware } from '@nest-middlewares/serve-static';
import {MiddlewareConsumer, Module} from '@nestjs/common';

@Module({

})
export class ServeStaticModule {
    configure(consumer: MiddlewareConsumer) {
        // IMPORTANT! Call Middleware.configure BEFORE using it for routes
        ServeStaticMiddleware.configure( './static/' );
        consumer.apply(ServeStaticMiddleware).forRoutes( '/' );
    }
}
