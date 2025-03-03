<?php

namespace App\Domain\Entity;

class Todo implements \JsonSerializable
{
  protected $id;
  protected $userId;
  protected $title;
  protected $content;
  protected $isCompleted;

  public function __construct(
    ?int $id,
    ?int $userId,
    ?string $title,
    ?string $content,
    ?bool $isCompleted
  ) {
    $this->id = $id;
    $this->userId = $userId;
    $this->title = $title;
    $this->content = $content;
    $this->isCompleted = $isCompleted;
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getUserId(): ?int
  {
    return $this->userId;
  }

  public function getTitle(): ?string
  {
    return $this->title;
  }

  public function getContent(): ?string
  {
    return $this->content;
  }

  public function getIsCompleted(): ?bool
  {
    return $this->isCompleted;
  }

  public function setTitle(string $title): void
  {
    $this->title = $title;
  }

  public function setContent(string $content): void
  {
    $this->content = $content;
  }

  public function setIsCompleted(bool $isCompleted): void
  {
    $this->isCompleted = $isCompleted;
  }

  public function jsonSerialize(): array
  {
    return [
      'id' => $this->getId(),
      'user_id' => $this->getUserId(),
      'title' => $this->getTitle(),
      'content' => $this->getContent(),
      'is_completed' => $this->getIsCompleted(),
    ];
  }
}
