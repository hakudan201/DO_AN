<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => 'required|string|max:150',
            "email" => 'required|email|max:150',
            "password" => 'required|confirmed',
            "DOB" => 'required|date',
            "address" => 'required|string|max:150',
            "phone" => ['required', 'regex:/^0[0-9]{9}$/'],
            "library_id" => 'required',
            "due_membership" => 'required|date'
        ];
    }

    public function getData() {
        $data = $this->validated();
        $data['password'] = Hash::make($data['password']);
        return $data;
    }
}
