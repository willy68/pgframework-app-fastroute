<?php

namespace App\Blog\Actions;

use Mezzio\Router\RouterInterface;
use App\Blog\Models\Posts;
use GuzzleHttp\Psr7\Response;
use App\Blog\Models\Categories;
use Framework\Actions\RouterAwareAction;
use Framework\Renderer\RendererInterface;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * Undocumented class
 */
class CategoryShowAction
{
    /**
     *
     */
    use RouterAwareAction;

    /**
     * Undocumented variable
     *
     * @var RendererInterface
     */
    private $renderer;

    /**
     * Undocumented variable
     *
     * @var RouterInterface
     */
    private $router;

    /**
     * Undocumented function
     *
     * @param RendererInterface $renderer
     */
    public function __construct(
        RendererInterface $renderer,
        RouterInterface $router
    ) {
        $this->renderer = $renderer;
        $this->router = $router;
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function __invoke(Request $request)
    {
        $category = Categories::find_by_slug($request->getAttribute('slug'));
        if ($category) {
            $params = $request->getQueryParams();
            // Init Query
            $posts = Posts::setPaginatedQuery(Posts::findPublicForCategory($category->id))
                ::paginate(12, $params['p'] ?? 1);
            $categories = Categories::find('all');
            $page = $params['p'] ?? 1;

            return $this->renderer->render('@blog/index', compact('posts', 'categories', 'category', 'page'));
        }
        else {
            return new Response(404, [], $this->renderer->render(
                'error404',
                ['message' => 'Impossible de trouver cette categorie: ' . $request->getAttribute('slug')])
            );
        }
    }
}
