<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
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
            'membership_type' => $this->membership_type,
            'has_knvb_affiliation' => $this->has_knvb_affiliation,
            'club_name' => $this->club_name,
            'membership_end' => $this->membership_end,
            'knvb_relation_number' => $this->knvb_relation_number,
            'slug' => $this->personData->slug,
            'initials' => $this->personData->initials,
            'firstname' => $this->personData->firstname,
            'lastname' => $this->personData->lastname,
            'gender' => $this->personData->gender,
            'date_of_birth' => $this->personData->date_of_birth,
            'nationality' => $this->personData->nationality,
            'zip_code' => $this->personData->zip_code,
            'house_number' => $this->personData->house_number,
            'street' => $this->personData->street,
            'city' => $this->personData->city,
            'country' => $this->personData->country,
            'email' => $this->personData->email,
            'phone' => $this->personData->phone,
            'iban' => $this->personData->iban,
            'bank_account_holder' => $this->personData->bank_account_holder,
            'volunteer_roles' => $this->personData->volunteer_roles,
            'comments' => $this->comments,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
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
