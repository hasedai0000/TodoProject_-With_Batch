<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends BaseController
{
  /**
   * Register api
   *
   * @return \Illuminate\Http\Response
   */
  public function register(RegisterRequest $request)
  {
    $input = $request->all();
    $input['password'] = bcrypt($input['password']);
    $user = User::create($input);
    $success['token'] =  $user->createToken('AccessToken')->plainTextToken;
    $success['user'] =  $user;

    return $this->sendResponse($success, 'User register successfully.');
  }

  /**
   * Login api
   *
   * @return \Illuminate\Http\Response
   */
  public function login(LoginRequest $request)
  {
    if (Auth::attempt([
      'email' => $request->email,
      'password' => $request->password
    ])) {
      /** @var \App\Models\User $user **/
      $user = Auth::user();
      $success['token'] = $user->createToken('AccessToken')->plainTextToken;
      $success['user'] = $user;

      return $this->sendResponse($success, 'User login successfully.');
    } else {
      return $this->sendError('Unauthorized.', ['error' => 'Unauthorized.']);
    }
  }

  /**
   * Logout api
   *
   * @return \Illuminate\Http\Response
   */
  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();
    return $this->sendResponse([], 'User logout successfully.');
  }

  /**
   * check authenticated user
   *
   * @return \Illuminate\Http\Response
   */
  public function authentication(Request $request)
  {
    if ($request->user() && Auth::check()) {
      $user = Auth::user();
      $success['user'] = $user;
      return $this->sendResponse($success, 'User authenticated successfully.');
    }
    return $this->sendError('User is not authenticated.', ['error' => 'Not authenticated.']);
  }
}
