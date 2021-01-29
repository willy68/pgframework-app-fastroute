<?php

use Framework\Environnement\Environnement;
use Middlewares\Whoops;
use Symfony\Component\Dotenv\Dotenv;

if (!class_exists(Dotenv::class)) {
    throw new Exception("le library symfony/dotenv est pas installée, lancez composer symfony/dotenv!");
}

if (!isset($basePath)) {
    $basePath = dirname(dirname(__DIR__));
}

$dotenv = new Dotenv();
$dotenv->loadEnv($basePath . '/.env');

$bootstrap = require 'App.php';

$app = (new Framework\App($bootstrap['config']))
    ->addModules($bootstrap['modules']);

if (Environnement::getEnv('APP_ENV', 'production') === 'dev') {
    $app->pipe(Whoops::class);
}

$app->middlewares($bootstrap['middlewares']);

return $app;
