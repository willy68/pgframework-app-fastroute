<?php

use App\Middleware\RecordNotFoundMiddleware;
use Framework\Middleware\ActiveRecordMiddleware;
use Framework\Middleware\CsrfGetCookieMiddleware;

/**
 * Add your own router middlewares
 */
return [
    'router.middlewares' => \DI\add([
        CsrfGetCookieMiddleware::class,
        ActiveRecordMiddleware::class,
        RecordNotFoundMiddleware::class,
    ])
];