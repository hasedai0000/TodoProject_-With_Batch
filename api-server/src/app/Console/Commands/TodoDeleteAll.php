<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;

class TodoDeleteAll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:todo-delete-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all todos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $todoDeleteAll = app()->make('App\Http\Controllers\Api\TodoController');
        $todoDeleteAll->deleteAll();
        return $this->info('Delete all todos');
    }
}
