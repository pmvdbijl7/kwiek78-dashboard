<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->personData->slug,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'roles' => $this->roles,
            'permissions' => $this->permissions,
            'gender' => $this->personData->gender,
            'firstname' => $this->personData->firstname,
            'lastname' => $this->personData->lastname,
            'date_of_birth' => $this->personData->date_of_birth,
            'nationality' => $this->personData->nationality,
            'zip_code' => $this->personData->zip_code,
            'house_number' => $this->personData->house_number,
            'street' => $this->personData->street,
            'city' => $this->personData->city,
            'country' => $this->personData->country,
            'phone' => $this->personData->phone,
            'iban' => $this->personData->iban,
            'bank_account_holder' => $this->personData->bank_account_holder,
            'volunteer_roles' => $this->personData->volunteer_roles,
            'last_activity' => $this->last_activity,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'deleted_at' => $this->deleted_at,
        ];
    }

    /**
     * Prepare the resource for serialization.
     *
     * @return array<string, mixed>
     */
    public static function collection($resources)
    {
        $collection = parent::collection($resources);
        $collection->withoutWrapping();
        return $collection->toArray(request());
    }
}
