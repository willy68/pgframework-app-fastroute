<?php

namespace Framework\Middleware;

use Dflydev\FigCookies\SetCookie;
use Grafikart\Csrf\CsrfMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\MiddlewareInterface;
use Dflydev\FigCookies\FigResponseCookies;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CsrfGetCookieMiddleware implements MiddlewareInterface
{

    /**
     * Undocumented variable
     *
     * @var CsrfMiddleware
     */
    private $csrfMiddleware;

    /**
     * CsrfGetCookieMiddleware constructor.
     * @param CsrfMiddleware $csrfMiddleware
     */
    public function __construct(CsrfMiddleware $csrfMiddleware)
    {
        $this->csrfMiddleware = $csrfMiddleware;
    }

    /**
     * @param ServerRequestInterface $request
     * @param RequestHandlerInterface $handler
     * @return ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $method = $request->getMethod();
        if (\in_array($method, ['DELETE', 'PATCH', 'POST', 'PUT'], true)) {
            if (!$request->hasHeader('X-CSRF-TOKEN')) {
                return $handler->handle($request);
            }
                $params = $request->getParsedBody() ?: [];
                $token = $request->getHeader('X-CSRF-TOKEN')[0];
                $request = $request->withParsedBody(
                    array_merge($params, [$this->csrfMiddleware->getFormKey() => $token])
                );
                return $handler->handle($request);
        }

        if (\in_array($method, ['GET', 'HEAD'], true)) {
            $response = $handler->handle($request);
            if (!FigResponseCookies::get($response, 'XSRF-TOKEN')->getValue()) {
                $setCookie = SetCookie::create('XSRF-TOKEN')
                    ->withValue($this->csrfMiddleware->generateToken())
                    // ->withExpires(time() + 3600)
                    ->withPath('/')
                    ->withDomain(null)
                    ->withSecure(false)
                    ->withHttpOnly(false);
                $response = FigResponseCookies::set($response, $setCookie);
            }
            return $response;
        }
        return $handler->handle($request);
    }
}
