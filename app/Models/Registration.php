<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'person_data_id',
        'memership_type',
        'has_knvb_affiliation',
        'club_name',
        'membership_end',
        'knvb_relation_number',
        'comments',
        'status',
    ];

    /**
     * A registration has one person data.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<PersonData, Registration>
     */
    public function personData()
    {
        return $this->belongsTo(PersonData::class);
    }
}
