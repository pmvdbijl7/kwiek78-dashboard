<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonData extends Model
{
    use HasFactory, HasSlug;

    protected array $slugSourceFields = [
        'firstname',
        'lastname',
    ];

    protected bool $updateSlugOnUpdate = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'gender',
        'initials',
        'firstname',
        'lastname',
        'date_of_birth',
        'nationality',
        'zip_code',
        'house_number',
        'street',
        'city',
        'country',
        'email',
        'phone',
        'iban',
        'bank_account_holder',
        'volunteer_roles',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'volunteer_roles' => 'array',
        ];
    }

    /**
     * Person data belongs to a user.
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<User, PersonData>
     */
    public function user()
    {
        return $this->hasOne(User::class);
    }

    /**
     * Person data belongs to a player.
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<Player, PersonData>
     */
    public function player()
    {
        return $this->hasOne(Player::class);
    }

    /**
     * Person data belongs to an invitation.
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<Invitation, PersonData>
     */
    public function invitation()
    {
        return $this->hasOne(Invitation::class);
    }

    /**
     * Person data belongs to a registration.
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<Registration, PersonData>
     */
    public function registration()
    {
        return $this->hasOne(Registration::class);
    }
}
