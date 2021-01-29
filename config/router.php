<?php

use App\Middleware\RecordNotFoundMiddleware;
use Framework\Middleware\ActiveRecordMiddleware;

/**
 * Add your own router middlewares
 */
return [
    'router.middlewares' => [
        ActiveRecordMiddleware::class,
        RecordNotFoundMiddleware::class
    ]
];