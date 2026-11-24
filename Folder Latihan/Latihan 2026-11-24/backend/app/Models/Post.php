<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'caption',
        'user_id',
    ];

    const UPDATED_AT = null;

    public function user() {
        return $this->belongTo(User::class);
    }

    public function attachments() {
        return $this->hasMany(PostAttachment::class);
    }
}
