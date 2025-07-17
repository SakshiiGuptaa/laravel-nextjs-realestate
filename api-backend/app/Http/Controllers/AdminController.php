<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $admin = \App\Models\Admin::where('email', $validated['email'])->first();

        if (!$admin || !Hash::check($validated['password'], $admin->password)) {
            return response()->json(['message' => 'Invalid credentials! Try again.'], 401);
        }

        return response()->json([
            'message' => 'Admin logged in successfully.',
            'admin'   => $admin->only(['id', 'name', 'email', 'phone_number', 'role']),
        ]);
    }

    public function update(Request $request)
    {
        // Assuming you always have ONE admin with ID = 1
        $admin = \App\Models\Admin::findOrFail(1);

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|unique:admins,email,' . $admin->id,
            'phone_number' => 'nullable|string|max:20',
            'password'     => 'nullable|string|min:8|confirmed',
        ]);

        $admin->name         = $validated['name'];
        $admin->email        = $validated['email'];
        $admin->phone_number = $validated['phone_number'] ?? null;

        if (!empty($validated['password'])) {
            $admin->password = Hash::make($validated['password']);
        }

        $admin->save();

        return response()->json([
            'message' => 'Admin updated successfully.',
            'admin'   => $admin->only(['id', 'name', 'email', 'phone_number']),
        ]);
    }
    
}
