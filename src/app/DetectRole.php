<?php
use Illuminate\Support\Str;
if (!function_exists('detectRole')) {
    function detectRole(): ?string
    {
        $current_uri = request()->path();
        $roles = ['staff'];

        foreach ($roles as $role) {
            if (Str::startsWith($current_uri, $role)) {
                return $role;
            }
        }
        return null;
    }
}