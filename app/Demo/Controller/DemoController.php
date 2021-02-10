<?php

namespace App\Demo\Controller;

use App\Auth\Models\User;
use Framework\Router\Annotation\Route;
use Framework\Renderer\RendererInterface;
use Psr\Http\Message\ServerRequestInterface;
use Framework\Validator\Validation\ValidationRules;
use Framework\Database\ActiveRecord\ActiveRecordQuery;

class DemoController
{

    /**
     * Montre l'index de l'application
     * $renderer est injecté automatiquement, comme toutes les classes
     * renseignées dans config/config.php
     * Il est possible d'injecter la ServerRequestInterface
     * et les paramètres de la route (ex. $id).
     * Ce type d'injection est possible avec \DI\Container de PHP-DI
     * 
     * @Route("/", name="demo.index", methods={"GET"})
     *
     * @param \Psr\Http\Message\ServerRequestInterface $request
     * @param \Framework\Renderer\RendererInterface $renderer
     * @param \PDO $pdo
     * @return string
     */
    public function index(
        ServerRequestInterface $request,
        RendererInterface $renderer,
        \PDO $pdo
    ): string {
        $validation = new ValidationRules('auteur', 'required|min:3|max:10|filter:trim');
        $validation->isValid('Willy ');
        $query = new ActiveRecordQuery();
        $query
            ->where('id = ?', 'user_id = ?')
            ->orWhere('created_at = now()')
            ->setWhereValue([2, 5, new \DateTime()]);
        /** @var \App\Auth\Models\User $user */
        $user = User::find_by_username(['username' => 'admin']);
        $user_array = $user->to_array();
        $mysql_ver = $pdo->getAttribute(\PDO::ATTR_SERVER_VERSION);
        $params = array_merge($request->getServerParams(), $user_array, [$mysql_ver], [$query->__toString()]);
        return $renderer->render('@demo/index', compact('params'));
    }

    /**
     * @Route("/react", name="demo.react", methods={"GET"})
     *
     * @param RendererInterface $renderer
     * @return string
     */
    public function demoReact(RendererInterface $renderer): string
    {
        $data = [
            [
                'code_client' => 'CL0009',
                'civilite' => '',
                'nom' => 'ASSOCIATION DES SANS CLAVIER',
                'email' => 'ass.sansclavier@free.fr',
                'adresses' => [
                    [
                        'adresse_1' => '8 rue du bout du monde',
                        'adresse_2' => '',
                        'adresse_3' => '',
                        'cp' => '78011',
                        'ville' => 'Loin en campagne',
                        'pays' => ''
                    ]
                ]
            ],
            [
                'code_client' => 'CL0010',
                'civilite' => 'Mr',
                'nom' => 'Dubois',
                'email' => 'dubois@gmail.com',
                'adresses' => [
                    [
                        'adresse_1' => '4, boulevard des capucines',
                        'adresse_2' => '',
                        'adresse_3' => '',
                        'cp' => '78009',
                        'ville' => 'FLEURI AUX BOIS',
                        'pays' => ''
                    ]
                ]
            ]
        ];
       /* $json = join(',', array_map(function ($record) {
            return json_encode($record);
        }, $data));
        $data = '[' . $json . ']';*/
        $data = json_encode($data);
        //dd($data);
        return $renderer->render('@demo/react', compact('data'));
    }
}
