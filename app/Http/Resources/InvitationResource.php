<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
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
            'firstname' => $this->personData->firstname,
            'lastname' => $this->personData->lastname,
            'email' => $this->personData->email,
            'token' => $this->token,
            'roles' => $this->roles,
            'status' => $this->status,
            'sent_at' => $this->sent_at,
            'accepted_at' => $this->accepted_at,
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
