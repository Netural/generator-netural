<?php

$filename = __DIR__.preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']);
if (php_sapi_name() === 'cli-server' && is_file($filename)) {
    return false;
}

date_default_timezone_set('UTC');

define('PUBLIC_DIR', realpath(__DIR__ . '/'));

require_once __DIR__ . '/../webapp/bootstrap.php';
require_once __DIR__ . '/../webapp/app.php';