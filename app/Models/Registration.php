<?php

namespace App\Models;

use App\Notifications\NewRegistrationNotification;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory, HasUuids;

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

    /**
     * Boot the model and set up event listeners.
     * @return void
     */
    protected static function booted()
    {
        // Listen for the "created" event on the Registration model
        static::created(function ($registration) {
            // Retrieve all "Ledenadministrateur" users
            $users = User::whereHas('roles', fn ($query) => $query->where('name', 'Ledenadministrateur'))->get();

            // Send notification to each user
            foreach ($users as $user) {
                $user->notify(new NewRegistrationNotification($registration));
            }
        });
    }
}
