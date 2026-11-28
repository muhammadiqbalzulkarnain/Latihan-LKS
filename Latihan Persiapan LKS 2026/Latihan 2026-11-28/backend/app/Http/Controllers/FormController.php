<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    static public function notFound()
    {
        return response([
            'message' => 'Form not found'
        ], 404);
    }

    // Form (Create A Form)
    public function createForm(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:users,username|regex:/^[a-zA-Z0-9.*]+$/',
            'allowed_domains' => 'array'
        ]);

        $form = Form::create([
            'name' => $validated['name'],
            'user_id' => $request->user()?->id
        ]);

        return response([
            'message' => 'Create form success',
            'form' => $form
        ], 200);
    }

    // Form (Get All Forms)
    public function getForm(Request $request)
    {
        $request->currentAccessToken();

        return response([
            'message' => 'Get all forms success',
            'forms' => Form::all()
        ], 200);
    }

    // Form (Detail Form)
    public function detailForm(Form $form)
    {
        $form = Form::with('questions')
            ->where('slug')
            ->firstOrFail();

        return response([
            'message' => 'Get form success',
            'form' => $form
        ], 200);
    }
}
