<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    static public function notFound()
    {
        return response([
            'message' => 'User not found'
        ], 404);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required',
            'bio' => 'required:max:100',
            'username' => 'required:min:3|unique:users,username|regex:/^[a-zA-Z0-9._]+$/',
            'password' => 'required|min:6',
            'is_private' => 'boolean',
        ]);

        $user = User::create($validated);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'message' => 'Register success',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();

        if ($user && password_verify($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response([
                'message' => 'Login success',
                'token' => $token,
                'user' => $user
            ], 200);
        }

        return response([
            'message' => "Wrong username or password",
        ], 401);
    }

    public function logout(Request $request)
    {
        $user = auth()->user();

        $user->tokens()->delete();

        return response([
            'message' => "Logout success",
        ], 200);
    }

    public function follow(Request $request, User $user)
    {
        $fromUser = auth()->user();
        $toUser = $user;
        $status = true;

        // user follow herself
        if ($toUser->id === $fromUser->id) {
            return response([
                'message' => 'You are not allowed to follow yourself'
            ], 422);
        }

        $alreadyFollowed = $fromUser->followings()->where('following_id', $toUser->id)->first();
        if ($alreadyFollowed) {
            return response([
                'message' => 'You are already followed',
                'status' => $alreadyFollowed->is_accepted ? 'following' : 'requested'
            ], 422);
        }

        if ($toUser->is_private) {
            $status = false;
        }

        Follow::create([
            'follower_id' => $fromUser->id,
            'following_id' => $toUser->id,
            'is_accepted' => $status,
        ]);

        return response([
            'message' => 'Follow success',
            'status' => $status ? 'following' : 'requested'
        ], 200);
    }

    public function unfollow(Request $request, User $user)
    {
        $fromUser = auth()->user();
        $follow = $fromUser->followings->where('following_id', $user->id)->first();

        if ($follow) {
            $follow->delete();
            return response([], 204);
        }

        return response([
            'message' => 'You are not following the user'
        ], 422);
    }

    public function getFollowing(Request $request, User $user)
    {
        return response([
            'following' => $user->followingUsers->map(function ($user) {
                return [
                    ...$user->makeHidden(['pivot', 'password'])->toArray(),
                    'is_requested' => !$user->pivot->is_accepted,
                ];
            })
        ], 200);
    }

    public function getFollowers(Request $request, User $user)
    {
        return response([
            'followers' => $user->followerUsers->map(function ($user) {
                return [
                    ...$user->makeHidden(['pivot', 'password'])->toArray(),
                    'is_requested' => !$user->pivot->is_accepted,
                ];
            })
        ], 200);
    }

    public function accept(Request $request, User $user)
    {
        $targetUser = auth()->user()->followers()->where('follower_id', $user->id)->first();

        if ($targetUser && !$targetUser->is_accepted) {
            $targetUser->is_accepted = true;
            $targetUser->save();
            return response([
                'message' => 'Follow request accepted'
            ], 200);
        }

        if ($targetUser && $targetUser->is_accepted) {
            return response([
                'message' => 'Follow request is already accepted'
            ], 422);
        }

        return response([
            'message' => 'The user is not following you'
        ], 422);
    }

    public function getAll(Request $request)
    {
        $exceptId = auth()->user()->followings()->pluck('following_id')->toArray();
        $exceptId[] = auth()->user()->id;
        $user = User::all()->except($exceptId);
        return response([
            'users' => $user->makeHidden('password')
        ], 200);
    }

    public function getDetail(Request $request, User $user)
    {
        $isYourAccount = $user->id === auth()->user()->id;
        $followingStatus = 'not-following';
        $following = auth()->user()->followings()->where('following_id', $user->id)->first();
        if ($following && $following->is_accepted) {
            $followingStatus = 'following';
        } else if ($following && !$following->is_accepted) {
            $followingStatus = 'requested';
        }


        $extra = [];

        if ($followingStatus === 'following' || !$user->is_private || $isYourAccount) {
            $extra = [
                "posts" => $user->posts->load('attachments')
            ];
        }

        return response([
            ...$user->makeHidden(['password'])->toArray(),
            'is_your_account' => $isYourAccount,
            'following_status' => $followingStatus,
            'posts_count' => $user->posts()->count(),
            'followers_count' => $user->followers()->count(),
            'following_count' => $user->followings()->count(),
            ...$extra,
        ], 200);
    }
}
