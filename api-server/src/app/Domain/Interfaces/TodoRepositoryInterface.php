<?php

namespace App\Domain\Interfaces;

use App\Domain\Entity\Todo as EntityTodo;

interface TodoRepositoryInterface
{
  public function findAll(): array;
  public function findById(int $id): ?EntityTodo;
  public function store(EntityTodo $todo): EntityTodo;
  public function update(EntityTodo $todo): EntityTodo;
  public function delete(EntityTodo $todo): EntityTodo;
}
