<?php

namespace Tests\Feature\Http\Controllers\Auth;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\DataProvider;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    private const TEST_USER = [
        'name' => 'test',
        'email' => 'test@example.com',
        'password' => 'password',
    ];

    private const REGISTER_PARAMS = [
        'name' => 'testRegister',
        'email' => 'testRegister@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create([
            'name' => self::TEST_USER['name'],
            'email' => self::TEST_USER['email'],
            'password' => Hash::make(self::TEST_USER['password']),
        ]);
    }

    private function assertSuccessResponse(array $response, string $name, string $message): void
    {
        $this->assertTrue($response['success']);
        $this->assertEquals($name, $response['data']['user']['name']);
        $this->assertMatchesRegularExpression('/^\d+\|[A-Za-z0-9]+$/', $response['data']['token']);
        $this->assertEquals($message, $response['message']);
    }

    private function assertSuccessAuthenticationResponse(array $response, string $name, string $message): void
    {
        $this->assertTrue($response['success']);
        $this->assertEquals($name, $response['data']['user']['name']);
        $this->assertEquals($message, $response['message']);
    }

    private function assertErrorResponse(array $response, string $message): void
    {
        $this->assertFalse($response['success']);
        $this->assertEquals($message, $response['message']);
    }

    #[Test]
    public function testRegisterSuccess(): void
    {
        $response = $this->postJson('/api/register', self::REGISTER_PARAMS)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['user', 'token'],
                'message'
            ]);

        $this->assertSuccessResponse(
            $response->json(),
            self::REGISTER_PARAMS['name'],
            'User register successfully.'
        );
    }

    #[Test]
    #[DataProvider('validationDataProvider')]
    public function testRegisterValidation(
        array $params,
        array $expectedErrors,
        string $expectedMessage
    ): void {
        $this->postJson('/api/register', $params)
            ->assertStatus(422)
            ->assertJson([
                'message' => $expectedMessage,
                'errors' => $expectedErrors,
            ]);
    }

    public static function validationDataProvider(): array
    {
        return [
            'required' => [
                'params' => [
                    'name' => '',
                    'email' => '',
                    'password' => '',
                    'password_confirmation' => '',
                ],
                'expectedErrors' => [
                    'name' => ['The name field is required.'],
                    'email' => ['The email field is required.'],
                    'password' => ['The password field is required.'],
                    'password_confirmation' => ['The password confirmation field is required.'],
                ],
                'expectedMessage' => 'The name field is required. (and 3 more errors)',
            ],
            'email' => [
                'params' => array_merge(self::REGISTER_PARAMS, ['email' => 'test.example.com']),
                'expectedErrors' => [
                    'email' => ['The email field must be a valid email address.'],
                ],
                'expectedMessage' => 'The email field must be a valid email address.',
            ],
            'unique' => [
                'params' => array_merge(self::REGISTER_PARAMS, ['email' => self::TEST_USER['email']]),
                'expectedErrors' => [
                    'email' => ['The email has already been taken.'],
                ],
                'expectedMessage' => 'The email has already been taken.',
            ],
            'password_confirmation' => [
                'params' => array_merge(self::REGISTER_PARAMS, [
                    'password_confirmation' => 'wrong_password'
                ]),
                'expectedErrors' => [
                    'password_confirmation' => ['The password confirmation field must match password.'],
                ],
                'expectedMessage' => 'The password confirmation field must match password.',
            ],
        ];
    }

    #[Test]
    public function testLoginSuccess(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => self::TEST_USER['email'],
            'password' => self::TEST_USER['password'],
        ])
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['user', 'token'],
                'message'
            ]);

        $this->assertSuccessResponse(
            $response->json(),
            self::TEST_USER['name'],
            'User login successfully.'
        );
    }

    #[Test]
    public function testLoginUnauthorized(): void
    {
        $this->postJson('/api/login', [
            'email' => 'wrong@example.com',
            'password' => 'wrong_password',
        ])
            ->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Unauthorized.',
                'data' => ['error' => 'Unauthorized.']
            ]);
    }

    #[Test]
    public function testLogoutSuccess(): void
    {
        $token = $this->user->createToken('AccessToken')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/logout')
            ->assertStatus(200)
            ->assertJson(['message' => 'User logout successfully.']);
    }

    #[Test]
    public function testLogoutUnauthorized(): void
    {
        $this->postJson('/api/logout')
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    #[Test]
    public function testAuthenticationSuccess(): void
    {
        $token = $this->user->createToken('AccessToken')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/authentication')
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['user'],
                'message'
            ]);

        $this->assertSuccessAuthenticationResponse(
            $response->json(),
            self::TEST_USER['name'],
            'User authenticated successfully.'
        );
    }

    #[Test]
    public function testAuthenticationUnauthorized(): void
    {
        $this->getJson('/api/authentication')
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    }
}
