<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->data['type'] ?? null,
            'message' => $this->data['message'] ?? null,
            'url' => $this->data['url'] ?? null,
            'read_at' => $this->read_at,
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
