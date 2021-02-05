<?php

namespace App\Admin;

use Framework\Module;
use Mezzio\Router\RouterInterface;
use App\Blog\Actions\PostCrudAction;
use Framework\Renderer\TwigRenderer;
use Framework\Auth\LoggedInMiddleware;
use App\Blog\Actions\CategoryCrudAction;
use Framework\Renderer\RendererInterface;
use App\Auth\Middleware\ForbidenMiddleware;
use Mezzio\Router\FastRouteRouter as Router;
use Framework\Middleware\InvalidCsrfMiddleware;
use Framework\Middleware\CsrfGetCookieMiddleware;
use Framework\Auth\Middleware\CookieLoginMiddleware;

class AdminModule extends Module
{

    public const DEFINITIONS = __DIR__ . '/config.php';

    public const ANNOTATIONS = [
        __DIR__
    ];

    public function __construct(
        RendererInterface $renderer,
        AdminTwigExtension $adminTwigExtension,
        RouterInterface $router,
        string $prefix
    ) {
        $renderer->addPath('admin', __DIR__ . '/views');
        /** @var Router $router */
        $router->crud("$prefix/posts", PostCrudAction::class, 'blog.admin')
            ->middleware(ForbidenMiddleware::class)
            ->middleware(CookieLoginMiddleware::class)
            ->middleware(LoggedInMiddleware::class)
            ->middleware(InvalidCsrfMiddleware::class)
            ->middleware(CsrfGetCookieMiddleware::class);
        $router->crud("$prefix/categories", CategoryCrudAction::class, 'blog.admin.category')
            ->middleware(ForbidenMiddleware::class)
            ->middleware(CookieLoginMiddleware::class)
            ->middleware(LoggedInMiddleware::class)
            ->middleware(InvalidCsrfMiddleware::class)
            ->middleware(CsrfGetCookieMiddleware::class);
        if ($renderer instanceof TwigRenderer) {
            $renderer->getTwig()->addExtension($adminTwigExtension);
        }
    }
}
