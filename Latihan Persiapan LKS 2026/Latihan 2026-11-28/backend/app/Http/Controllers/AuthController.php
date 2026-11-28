<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    static public function notFound()
    {
        return response([
            'message' => 'User not found'
        ], 404);
    }

    // Auth (Login)
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|valid:email,address',
            'password' => 'required|min:5'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user && password_verify($request->password, $user->password)) {
            return response([
                'message' => 'Login success',
                'user' => $user
            ], 200);
        }

        return response([
            'message' => 'Email or password incorrect'
        ], 401);
    }

    // Auth (Logout)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'Logout success'
        ], 200);
    }
}
