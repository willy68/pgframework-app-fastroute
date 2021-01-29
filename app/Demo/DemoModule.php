<?php

namespace App\Demo;

use Framework\Module;
use Mezzio\Router\FastRouteRouter;
use Mezzio\Router\RouterInterface;
use App\Demo\Controller\DemoController;
use Framework\Renderer\RendererInterface;

class DemoModule extends Module
{

    public function __construct(RouterInterface $router, RendererInterface $renderer)
    {
        $renderer->addPath('demo', __DIR__ . '/views');

        /** @var FastRouteRouter $router */
        $router->get('/', DemoController::class . '::index', 'demo.index');
    }
}
