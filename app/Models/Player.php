<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'slug',
        'firstname',
        'lastname',
        'gender',
        'date_of_birth',
        'street',
        'house_number',
        'postal_code',
        'city',
        'country',
        'position',
        'shirt_number',
        'foot',
        'status',
    ];

    /**
     * 
     * A player belongs to a user.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Player>
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
