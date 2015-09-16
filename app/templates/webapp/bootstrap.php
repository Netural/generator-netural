<?php

define('WEBAPP_DIR', realpath(__DIR__ . '/'));

require_once __DIR__ . '/vendor/autoload.php';

$app = new Silex\Application();

require_once __DIR__ . '/config.php';

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => WEBAPP_DIR . '/views',
    'twig.options' => array('strict_variables' => false, 'cache' => $app['config.twig.cache'])
));

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$app->boot();