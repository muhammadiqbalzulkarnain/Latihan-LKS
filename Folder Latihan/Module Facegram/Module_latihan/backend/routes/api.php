<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->controller(\App\Http\Controllers\UserController::class)->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::post('logout', 'logout')->middleware('auth:sanctum');
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('posts')->controller(\App\Http\Controllers\PostController::class)->group(function () {
            Route::get('v2', 'getAll2');
            Route::post('', 'create');
            Route::get('', 'getAll');

            Route::middleware(\App\Http\Middleware\PostOwnerMiddleware::class)->missing([\App\Http\Controllers\PostController::class, 'notFound'])->group(function () {
                Route::delete('{post}', 'delete');
            });
        });

        Route::controller(\App\Http\Controllers\UserController::class)->group(function () {
            Route::prefix('users')->group(function () {
                Route::post('{user:username}/follow', 'follow');
                Route::delete('{user:username}/unfollow', 'unfollow');
                Route::get('{user:username}/following', 'getFollowing');
                Route::put('{user:username}/accept', 'accept');
                Route::get('{user:username}/followers', 'getFollowers');
                Route::get('', 'getAll');
                Route::get('{user:username}', 'getDetail');
            });

        });
    });
});
