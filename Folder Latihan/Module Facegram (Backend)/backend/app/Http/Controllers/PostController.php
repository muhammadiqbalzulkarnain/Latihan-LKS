<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostAttachment;
use Illuminate\Http\Request;

class PostController extends Controller
{
    static public function notFound()
    {
        return response([
            'message' => 'Post not found'
        ], 404);
    }

    // Post (CREATE NEW POST)
    public function createPost(Request $request)
    {
        $validated = $request->validate([
            'caption' => 'required',
            'attachments' => 'required|array',
            'attachments.*' => 'required|file|mimes:jpg,jpeg,webp,png,gif',
        ]);

        $post = Post::create([
            'caption' => $validated['caption'],
            'user_id' => $request->user()?->id,
        ]);

        foreach ($validated['attachments'] as $attachment) {
            $path = $attachment->store('posts', 'public');

            PostAttachment::create([
                'post_id' => $post->id,
                'storage_path' => $path
            ]);
        }

        return response([
            'message' => 'Create post success'
        ], 201);
    }

    // Post (DELETE POST)
    public function deletePost(Post $post)
    {
        $post->delete();

        return response([], 204);
    }

    // Post (GET POST)
    public function getPost(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1'
        ]);

        $page = $validated['page'] ?? 0;
        $size = $validated['size'] ?? 10;

        $post = Post::with('user', 'attachments')->paginate($size, ['*'], 'page', $page + 1);

        return response([
            'page' => $validated['page'],
            'size' => $validated['size'],
            'post' => $post->items()
        ], 200);
    }

    // Post (GET POST FROM FOLLOWING USER)
    public function getPost2(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1'
        ]);

        $page = (int) ($validated['page'] ?? 0);
        $size = (int) ($validated['size'] ?? 10);

        $user = $request->user();

        $postUserId = $user?->followings()->pluck('id')->toArray() ?? [];
        if ($user?->id) {
            $postUserId[] = $user?->id;
        }

        $post = Post::with(['user', 'attachments'])
            ->whereIn('user_id', $postUserId)
            ->latest()
            ->paginate($size, ['*'], 'page', $page + 1);

        return response([
            'page' => $validated['page'],
            'size' => $validated['size'],
            'post' => $post->items()
        ], 200);
    }
}
