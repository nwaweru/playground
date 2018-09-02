<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projects', 'ProjectController@index');
Route::post('projects', 'ProjectController@store');
Route::get('project/{id}', 'ProjectController@show');
Route::put('project/{project}', 'ProjectController@markAsCompleted');
Route::post('tasks', 'TaskController@store');
Route::put('task/{task}', 'TaskController@markAsCompleted');