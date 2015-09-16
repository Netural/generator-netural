<?php

namespace Custom\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

class Web implements ControllerProviderInterface {

    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];

        $controllers->get('/{slug}', function (Request $request, $slug) use ($app) {
            $locale = $request->attributes->get('_locale');

            $data = json_decode(file_get_contents('data/'.$locale.'/'.$slug.'.json'), true);

            return $app['twig']->render('components/root.twig', $data);
        })->assert('_locale', '^('.implode('|', $app['config.availableLocales']).')?$')->assert('slug', '.*');

        return $controllers;
    }

}
