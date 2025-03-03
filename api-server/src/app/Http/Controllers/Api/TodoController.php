<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Requests\Todo\TodoStoreRequest;
use App\Http\Requests\Todo\TodoUpdateRequest;
use App\Services\TodoService;
use Illuminate\Http\Request;

class TodoController extends BaseController
{
  private $service;

  public function __construct(
    TodoService $service
  ) {
    $this->service = $service;
  }

  public function index()
  {
    $todos = $this->service->getTodos();
    $success['todos'] = $todos;

    return $this->sendResponse($success, 'Todos fetched successfully.');
  }

  public function store(TodoStoreRequest $request)
  {
    $todo = $this->service->storeTodo(
      $request->user_id,
      $request->title,
      $request->content,
    );
    $success['todo'] = $todo;
    return $this->sendResponse($success, 'Todo created successfully.');
  }

  public function show(int $id)
  {
    $todo = $this->service->getTodo($id);
    $success['todo'] = $todo;
    return $this->sendResponse($success, 'Todo fetched successfully.');
  }

  public function update(TodoUpdateRequest $request, int $id)
  {
    $params = $request->only([
      'title',
      'content',
      // 'is_completed',
    ]);
    $todo = $this->service->updateTodo(
      $id,
      $params['title'],
      $params['content'],
      // $params['is_completed'],
    );
    $success['todo'] = $todo;
    return $this->sendResponse($success, 'Todo updated successfully.');
  }

  public function delete(int $id)
  {
    $todo = $this->service->deleteTodo($id);
    $success['todo'] = $todo;
    return $this->sendResponse($success, 'Todo deleted successfully.');
  }
}
