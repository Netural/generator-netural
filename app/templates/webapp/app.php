<?php

use Symfony\Component\Intl\Intl;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->before(function() use ($app) {
    $app['globaldata'] = array('project' => 'xyz');
});

// Default route
$app->get('/', function() use($app) {
    return $app->redirect($app['config.locale'] . $app['config.paths.home']);
})->bind('home');

$app->mount('/{_locale}', new Custom\Controllers\Web());

$app->run();
