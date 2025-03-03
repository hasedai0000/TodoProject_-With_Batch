<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('authentication', [AuthController::class, 'authentication'])->name('authentication');


    Route::controller(TodoController::class)->group(function () {
        Route::get('/todos', 'index')->name('todos.index');
        Route::post('/todos', 'store')->name('todos.store');
        Route::get('/todos/{id}', 'show')->name('todos.show')->where('id', '[0-9]+');
        Route::put('/todos/{id}', 'update')->name('todos.update')->where('id', '[0-9]+');
        Route::delete('/todos/{id}', 'delete')->name('todos.delete')->where('id', '[0-9]+');
    });
});
