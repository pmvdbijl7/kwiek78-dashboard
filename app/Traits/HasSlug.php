<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    /**
     * Boot the trait.
     *
     * @return void
     */
    public static function bootHasSlug()
    {
        static::creating(function ($model) {
            $model->generateSlugOnCreate();
        });

        static::updating(function ($model) {
            $model->generateSlugOnUpdate();
        });
    }

    /**
     * Generate a unique slug for the model.
     *
     * @return string
     */
    protected function generateSlugOnCreate(): string
    {
        if (empty($this->slug)) {
            $this->slug = $this->generateUniqueSlug();
        }

        return $this->slug;
    }

    /**
     * Generate a unique slug for the model on update.
     *
     * @return void
     */
    protected function generateSlugOnUpdate()
    {
        if ($this->shouldUpdateSlug() && $this->isSlugSourceDirty()) {
            $this->slug = $this->generateUniqueSlug();
        }
    }

    /**
     * Generate a unique slug for the model.
     *
     * @return string
     */
    protected function generateUniqueSlug(): string
    {
        $slugBase = $this->generateSlugBase();
        $slug = $slugBase;
        $counter = 2;

        while (
            static::where('slug', $slug)
                ->where('id', '!=', $this->id)
                ->exists()
        ) {
            $slug = $slugBase . '-' . $counter++;
        }

        return $slug;
    }

    /**
     * Generate the base slug from the model's fields.
     *
     * @return string
     */
    protected function generateSlugBase(): string
    {
        $fields = $this->getSlugSourceFields();

        if (is_array($fields)) {
            $parts = array_map(fn($field) => $this->{$field}, $fields);
            $slugBase = implode(' ', $parts);
        } else {
            $slugBase = $this->{$fields};
        }

        return Str::slug($slugBase);
    }

    /**
     * Check if the slug source fields are dirty.
     *
     * @return bool
     */
    protected function isSlugSourceDirty(): bool
    {
        $fields = (array) $this->getSlugSourceFields();

        foreach ($fields as $field) {
            if ($this->isDirty($field)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the slug source fields.
     *
     * @return array|string
     */
    protected function getSlugSourceFields(): array|string
    {
        return property_exists($this, 'slugSourceFields') ? $this->slugSourceFields : 'name';
    }

    /**
     * Determine if the slug should be updated on update.
     *
     * @return bool
     */
    protected function shouldUpdateSlug(): bool
    {
        // True betekent: bij update opnieuw slug maken als basisvelden wijzigen
        return property_exists($this, 'updateSlugOnUpdate') ? $this->updateSlugOnUpdate : false;
    }
}
