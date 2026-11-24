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
            'message' => "Post not found",
        ], 404);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'caption' => 'required',
            'attachments' => 'required|array',
            'attachments.*' => 'required|file|mimes:jpeg,jpg,png,gif,webp',
        ]);

        $post = Post::create([
            'caption' => $request->caption,
            'user_id' => auth()->user()->id,
        ]);

        foreach ($request->attachments as $attachment) {
            PostAttachment::create([
                'post_id' => $post->id,
                'storage_path' => $attachment->store('posts', 'public'),
            ]);
        }

        return response([
            'message' => "Create post success",
        ], 201);
    }

    public function delete(Request $request, Post $post)
    {
        $post->delete();

        return response([], 204);
    }

    public function getAll(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1',
        ]);

        $page = $validated['page'] ?? 0;
        $size = $validated['size'] ?? 10;

        $posts = Post::with('user', 'attachments')->paginate($size, ['*'], 'page', $page + 1);

        return response([
            'page' => $page,
            'size' => $size,
            'posts' => $posts->items(),
        ], 200);
    }

    public function getAll2(Request $request)
    {
        $validated = $request->validate([
            'page' => 'integer|min:0',
            'size' => 'integer|min:1',
        ]);

        $page = $validated['page'] ?? 0;
        $size = $validated['size'] ?? 10;

        $postUsersId = auth()->user()->followings->pluck('id')->toArray();
        $postUsersId[] = auth()->user()->id;

        $posts = Post::with('user', 'attachments')->whereIn('user_id', $postUsersId)->orderByDesc('created_at')->paginate($size, ['*'], 'page', $page + 1);

        return response([
            'page' => $page,
            'size' => $size,
            'posts' => $posts->items(),
        ], 200);
    }
}
