<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    private ?string $role;
    private string $package;

    public function __construct() {
        $this->role = DetectRole();
        if (empty($this->role)) {
            $this->package = '';
        } else {
            $camel = Str::camel($this->role);
            $camel[0] = strtoupper($camel[0]);
            $this->package =$camel;
        }
    }

    public function route($route): string
    {
        if (empty($this->role)) {
            return $route;
        }
        return $this->role . '.' . $route;
    }

    public function resource($path): string
    {
        if (empty($this->role)) {
            return $path;
        }
        return $this->package . '/' . $path;
    }

    public function modelName() {
        if (empty($this->role)) {
            return User::class;
        }
        return '\\App\\Models\\' . $this->package;
    }
}