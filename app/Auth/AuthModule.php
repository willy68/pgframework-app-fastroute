<?php

namespace App\Auth;

use Framework\Module;
use App\Auth\Actions\LoginAction;
use Mezzio\Router\FastRouteRouter;
use Mezzio\Router\RouterInterface;
use Psr\Container\ContainerInterface;
use App\Auth\Actions\LoginAttemptAction;
use Framework\Renderer\RendererInterface;
use Framework\Auth\Middleware\CookieLogoutMiddleware;
use Mezzio\Router\RouteCollector;

class AuthModule extends Module
{
    public const DEFINITIONS = __DIR__ . '/config.php';

    public const MIGRATIONS = __DIR__ . '/db/migrations';

    public const SEEDS = __DIR__ . '/db/seeds';

    public const ANNOTATIONS = [
        __DIR__ . '/Actions'
    ];

    public function __construct(ContainerInterface $container)
    {
        $container->get(RendererInterface::class)->addPath('auth', __DIR__ . '/views');

        /** @var RouteCollector $collector */
        $collector = $container->get(RouteCollector::class);

        $routes = $collector->getRoutes();
        foreach($routes as $route) {
            if ($route->getName() === 'auth.logout') {
                $route->middleware(CookieLogoutMiddleware::class);
            }
        }

        /** @var FastRouteRouter $router */
        $router = $container->get(RouterInterface::class);
        $router->get($container->get('auth.login'), LoginAction::class, 'auth.login');
        $router->post($container->get('auth.login'), LoginAttemptAction::class);
        //$router->post('/logout', LogoutAction::class, 'auth.logout')
          //  ->middleware(CookieLogoutMiddleware::class);
    }
}
