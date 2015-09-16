<?php

$app['debug'] = true;
$app['config.twig.cache']       = false;
$app['baseUrl']                 = '/';
$app['config.paths.base']       = 'http://test.myproject.com';

if (file_exists(PUBLIC_DIR . '/version.cache')) {
    $app['config.version'] = file_get_contents(PUBLIC_DIR . '/version.cache');
} else {
    $app['config.version'] = '0';
}

$app['config.availableLocales'] = array('de', 'en');
$app['config.locale']           = 'de';

// URL paths
$app['config.paths.home'] = '/index';
