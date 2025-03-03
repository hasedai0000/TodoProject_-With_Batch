<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\DataProvider;

class TodoControllerTest extends TestCase
{
  use RefreshDatabase;

  private const TEST_USER = [
    'id' => 1,
    'name' => 'test',
    'email' => 'test@example.com',
    'password' => 'password',
  ];

  private const TEST_TODO = [
    'id' => 1,
    'user_id' => 1,
    'title' => 'testTitle',
    'content' => 'testContent',
    'is_completed' => false,
  ];

  private User $user;
  private Todo $todo;

  protected function setUp(): void
  {
    parent::setUp();
    $this->user = User::factory()->create([
      'id' => self::TEST_USER['id'],
      'name' => self::TEST_USER['name'],
      'email' => self::TEST_USER['email'],
      'password' => Hash::make(self::TEST_USER['password']),
    ]);

    $this->todo = Todo::factory()->create([
      'id' => self::TEST_TODO['id'],
      'user_id' => $this->user->id,
      'title' => self::TEST_TODO['title'],
      'content' => self::TEST_TODO['content'],
      'is_completed' => self::TEST_TODO['is_completed'],
    ]);
  }

  private function assertSuccessResponse(array $response, array $data, string $message): void
  {
    $this->assertTrue($response['success']);
    $this->assertEquals($data, $response['data']);
    $this->assertEquals($message, $response['message']);
  }

  private function assertErrorResponse(array $response, string $message): void
  {
    $this->assertFalse($response['success']);
    $this->assertEquals($message, $response['message']);
  }

  #[Test]
  public function testIndexSuccess(): void
  {
    $token = $this->user->createToken('AccessToken')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
      ->getJson('/api/todos')
      ->assertStatus(200)
      ->assertJsonStructure([
        'success',
        'data' => ['todos'],
        'message'
      ]);

    $this->assertSuccessResponse(
      $response->json(),
      ['todos' => [self::TEST_TODO]],
      'Todos fetched successfully.'
    );
  }

  #[Test]
  public function testStoreSuccess(): void
  {
    $token = $this->user->createToken('AccessToken')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
      ->postJson('/api/todos', [
        'user_id' => $this->user->id,
        'title' => self::TEST_TODO['title'],
        'content' => self::TEST_TODO['content'],
      ])
      ->assertStatus(200)
      ->assertJsonStructure([
        'success',
        'data' => ['todo'],
        'message'
      ]);

    $responseData = $response->json()['data']['todo'];

    $this->assertSuccessResponse(
      $response->json(),
      ['todo' => [
        'id' => $responseData['id'],
        'user_id' => $this->user->id,
        'title' => self::TEST_TODO['title'],
        'content' => self::TEST_TODO['content'],
        'is_completed' => self::TEST_TODO['is_completed'],
      ]],
      'Todo created successfully.'
    );
  }

  #[Test]
  #[DataProvider('storeValidationDataProvider')]
  public function testStoreValidation(
    array $params,
    array $expectedErrors,
    string $expectedMessage
  ): void {
    $token = $this->user->createToken('AccessToken')->plainTextToken;

    $this->withHeader('Authorization', 'Bearer ' . $token)
      ->postJson('/api/todos', $params)
      ->assertStatus(422)
      ->assertJson([
        'message' => $expectedMessage,
        'errors' => $expectedErrors,
      ]);
  }

  public static function storeValidationDataProvider(): array
  {
    return [
      'required' => [
        'params' => [
          'user_id' => '',
          'title' => '',
          'content' => '',
        ],
        'expectedErrors' => [
          'user_id' => ['The user id field is required.'],
          'title' => ['The title field is required.'],
          'content' => ['The content field is required.'],
        ],
        'expectedMessage' => 'The user id field is required. (and 2 more errors)',
      ],
      'integer' => [
        'params' => [
          'user_id' => 'test',
          'title' => self::TEST_TODO['title'],
          'content' => self::TEST_TODO['content'],
        ],
        'expectedErrors' => [
          'user_id' => ['The user id field must be an integer.'],
        ],
        'expectedMessage' => 'The user id field must be an integer.',
      ],
      'exists' => [
        'params' => [
          'user_id' => '999',
          'title' => self::TEST_TODO['title'],
          'content' => self::TEST_TODO['content'],
        ],
        'expectedErrors' => [
          'user_id' => ['The selected user id is invalid.'],
        ],
        'expectedMessage' => 'The selected user id is invalid.',
      ],
      'string' => [
        'params' => [
          'user_id' => 1,
          'title' => 123,
          'content' => 123,
        ],
        'expectedErrors' => [
          'title' => ['The title field must be a string.'],
          'content' => ['The content field must be a string.'],
        ],
        'expectedMessage' => 'The title field must be a string. (and 1 more error)',
      ],
    ];
  }

  #[Test]
  public function testUpdateSuccess(): void
  {
    $token = $this->user->createToken('AccessToken')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
      ->putJson('/api/todos/' . $this->todo->id, [
        'title' => 'updatedTitle',
        'content' => 'updatedContent',
        'is_completed' => false,
      ])
      ->assertStatus(200)
      ->assertJsonStructure([
        'success',
        'data' => ['todo'],
        'message'
      ]);

    $responseData = $response->json()['data']['todo'];

    $this->assertSuccessResponse(
      $response->json(),
      ['todo' => [
        'id' => $responseData['id'],
        'user_id' => $this->user->id,
        'title' => 'updatedTitle',
        'content' => 'updatedContent',
        'is_completed' => self::TEST_TODO['is_completed'],
      ]],
      'Todo updated successfully.'
    );
  }

  #[Test]
  #[DataProvider('updateValidationDataProvider')]
  public function testUpdateValidation(
    array $params,
    array $expectedErrors,
    string $expectedMessage
  ): void {
    $token = $this->user->createToken('AccessToken')->plainTextToken;

    $this->withHeader('Authorization', 'Bearer ' . $token)
      ->putJson('/api/todos/' . $this->todo->id, $params)
      ->assertStatus(422)
      ->assertJson([
        'message' => $expectedMessage,
        'errors' => $expectedErrors,
      ]);
  }

  public static function updateValidationDataProvider(): array
  {
    return [
      'required' => [
        'params' => [
          'title' => '',
          'content' => '',
          'is_completed' => '',
        ],
        'expectedErrors' => [
          'title' => ['The title field is required.'],
          'content' => ['The content field is required.'],
          'is_completed' => ['The is completed field is required.'],
        ],
        'expectedMessage' => 'The title field is required. (and 2 more errors)',
      ],
      'string' => [
        'params' => [
          'title' => 123,
          'content' => 123,
          'is_completed' => true,
        ],
        'expectedErrors' => [
          'title' => ['The title field must be a string.'],
          'content' => ['The content field must be a string.'],
        ],
        'expectedMessage' => 'The title field must be a string. (and 1 more error)',
      ],
      'boolean' => [
        'params' => [
          'title' => 'testTitle',
          'content' => 'testContent',
          'is_completed' => 'true',
        ],
        'expectedErrors' => [
          'is_completed' => ['The is completed field must be true or false.'],
        ],
        'expectedMessage' => 'The is completed field must be true or false.',
      ],
    ];
  }

  #[Test]
  public function testDeleteSuccess(): void
  {
    $token = $this->user->createToken('AccessToken')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
      ->deleteJson('/api/todos/' . $this->todo->id)
      ->assertStatus(200)
      ->assertJsonStructure([
        'success',
        'data' => [],
        'message'
      ]);

    $this->assertSuccessResponse(
      $response->json(),
      [],
      'Todo deleted successfully.'
    );
  }
}
