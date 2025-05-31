<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;
use App\Traits\HasSlug;

class Role extends SpatieRole
{
    use HasSlug;
}
