<?php

namespace Framework\Router\Loader;

use ReflectionMethod;
use Mezzio\Router\Route;
use Mezzio\Router\RouteGroup;
use Mezzio\Router\RouterInterface;
use Doctrine\Common\Annotations\Reader;
use Framework\Router\Parser\PhpTokenParser;

class FileLoader extends ClassLoader
{
    protected $router;

    public function __construct(
        RouterInterface $router,
        ?Reader $reader = null
    ) {
        if (!\function_exists('token_get_all')) {
            throw new \LogicException("Function token_get_all don't exists in this system");
        }

        parent::__construct($reader);
        $this->router = $router;
    }

    /**
     * Parse annotations @Route and add routes to the router
     *
     * @param string $file
     * @return RouteGroup[]|Route[]|null
     */
    public function load(string $file)
    {
        if (!is_file($file)) {
            return null;
        }

        $class = PhpTokenParser::findClass($file);
        if (!$class) {
            return null;
        }

        $reflectionClass = new \ReflectionClass($class);
        if ($reflectionClass->isAbstract()) {
            return null;
        }

        $classAnnotation = $this->getClassAnnotation($reflectionClass);

        $routes = [];
        foreach ($reflectionClass->getMethods() as $method) {
            foreach ($this->getMethodAnnotations($method) as $methodAnnotation) {
                $routes[] = $this->addRoute($methodAnnotation, $method, $classAnnotation);
            }
        }

        gc_mem_caches();
        return $routes;
    }

    /**
     * Add route to router
     *
     * @param object $methodAnnotation
     * @param \ReflectionMethod $method
     * @param object|null $classAnnotation
     * @return void
     */
    protected function addRoute(
        object $methodAnnotation,
        ReflectionMethod $method,
        ?object $classAnnotation
    ) {

        if ($classAnnotation) {
            return $this->router->group(
                $classAnnotation->getPath(),
                function (RouteGroup $routeGroup) use ($methodAnnotation, $method) {
                    $routeGroup->addRoute(new Route(
                        $methodAnnotation->getPath(),
                        $method->getDeclaringClass()->getName() . "::" . $method->getName(),
                        $methodAnnotation->getName(),
                        $methodAnnotation->getMethods()
                    ));
                }
            );
        } else {
            return $this->router->addRoute(new Route(
                $methodAnnotation->getPath(),
                $method->getDeclaringClass()->getName() . "::" . $method->getName(),
                $methodAnnotation->getName(),
                $methodAnnotation->getMethods()
            ));
        }
    }
}
