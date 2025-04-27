<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'person_data_id',
        'token',
        'roles',
        'status',
        'sent_at',
        'accepted_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'roles' => 'array',
            'sent_at' => 'datetime',
            'accepted_at' => 'datetime',
        ];
    }

    /**
     * An invvitation has one person data.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<PersonData, Invitation>
     */
    public function personData()
    {
        return $this->belongsTo(PersonData::class);
    }
}
