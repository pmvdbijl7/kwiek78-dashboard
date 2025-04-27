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
        'person_data_id',
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

    /**
     * A player has one person data.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<PersonData, Player>
     */
    public function personData()
    {
        return $this->belongsTo(PersonData::class);
    }
}
