<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TechnicianResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "user" => new UserResource($this->user),
            "skills" => $this->skills,
            "created_at" => $this->created_at->format('d M Y H:i'),
            "skill" => $this->skill,
            "skill_description" => str()->limit($this->skill_description, '40', '...')
        ];
    }
}
