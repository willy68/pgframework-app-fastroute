<?php

namespace App\Auth;

use Framework\Module;
use App\Auth\Actions\LoginAction;
use App\Auth\Actions\LogoutAction;
use Mezzio\Router\FastRouteRouter;
use Mezzio\Router\RouterInterface;
use Psr\Container\ContainerInterface;
use App\Auth\Actions\LoginAttemptAction;
use Framework\Renderer\RendererInterface;
use Framework\Auth\Middleware\CookieLogoutMiddleware;

class AuthModule extends Module
{
    public const DEFINITIONS = __DIR__ . '/config.php';

    public const MIGRATIONS = __DIR__ . '/db/migrations';

    public const SEEDS = __DIR__ . '/db/seeds';

    public function __construct(ContainerInterface $container)
    {
        $container->get(RendererInterface::class)->addPath('auth', __DIR__ . '/views');

        /** @var FastRouteRouter $router */
        $router = $container->get(RouterInterface::class);
        $router->get($container->get('auth.login'), LoginAction::class, 'auth.login');
        $router->post($container->get('auth.login'), LoginAttemptAction::class);
        $router->post('/logout', LogoutAction::class, 'auth.logout')
            ->middleware(CookieLogoutMiddleware::class);
    }
}
