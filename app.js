import Fastify from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import fastifyCors from '@fastify/cors';
import path from 'path';
import { fileURLToPath } from 'url';

function app() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fastify = Fastify({
        logger: true
    });

    fastify.register(fastifyCors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    fastify.register(fastifyAutoload, {
        dir: path.join(__dirname, 'src/routes'),
        autoHooks: true, cascadeHooks: true
    }
    );

    return fastify;
}

export default app;