<?php

namespace App\Providers;

use App\Domain\Interfaces\TodoRepositoryInterface;
use App\Repository\TodoRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(
            TodoRepositoryInterface::class,
            TodoRepository::class
        );
    }
}
