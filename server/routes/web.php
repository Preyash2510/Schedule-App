<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Models\Connection;
use App\Models\User;
use Illuminate\Http\Request,
    Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//Default route
$router->get('/', function () {
    return ['value' => 'Hello '];
});

//Group routes for login, signup and logout
$router->group(['prefix' => '/api'], function () use ($router) {
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');
    $router->post('/logout', 'AuthController@logout');
});

//Group routes using authentication for all request
$router->group(['prefix' => '/api', 'middleware' => 'auth'], function () use ($router) {
    $router->post('/all', 'UserController@getAll');
    $router->post('/update', 'UserController@update');
    $router->post('/connect', 'ConnectionController@connect');
    $router->post('/unconnect', 'ConnectionController@unconnect');
    $router->post('/schedule', 'ConnectionController@schedule');
    $router->post('/cancel', 'ConnectionController@cancel');
});
