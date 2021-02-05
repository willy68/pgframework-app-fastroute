<?php

use App\Middleware\RecordNotFoundMiddleware;
use Framework\Middleware\ActiveRecordMiddleware;
use Framework\Middleware\CsrfGetCookieMiddleware;

/**
 * Add your own router middlewares
 */
return [
    'router.middlewares' => \DI\add([
        ActiveRecordMiddleware::class,
        RecordNotFoundMiddleware::class,
    ])
];