<?php

namespace App\Http\Controllers;

use App\Models\DealerWebsite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DealerWebsiteController extends Controller
{
    /**
     * Get all websites for the authenticated dealer
     */
    public function index(Request $request)
    {
        $websites = DealerWebsite::where('user_id', $request->user()->id)
            ->get();

        return response()->json([
            'status' => true,
            'websites' => $websites
        ]);
    }

    /**
     * Store a newly created resource or update existing one
     */
    public function store(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Validation rules
            $rules = [
                'theme_id' => 'required|string',
                'branding' => 'required|array',
                'branding.title' => 'required|string|max:255',
                'subdomain' => 'required|string|max:50|regex:/^[a-zA-Z0-9-]+$/',
                'custom_domain' => 'nullable|string|max:255',
                'use_custom_domain' => 'boolean',
                'is_active' => 'boolean',
                'status' => 'required|string|in:draft,published',
                'id' => 'nullable|integer|exists:dealer_websites,id'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if this is an update (has ID in payload)
            if ($request->has('id') && $request->id) {
                return $this->updateWebsite($request, $user);
            } else {
                return $this->createWebsite($request, $user);
            }

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new website
     */
    private function createWebsite(Request $request, $user)
    {
        // Check if subdomain is already taken
        $existingWebsite = DealerWebsite::where('subdomain', $request->subdomain)
            ->where('user_id', '!=', $user->id)
            ->first();

        if ($existingWebsite) {
            return response()->json([
                'status' => false,
                'message' => 'The subdomain has already been taken.'
            ], 422);
        }

        // Check if user already has a website (update it instead)
        $userWebsite = DealerWebsite::where('user_id', $user->id)->first();
        if ($userWebsite) {
            // Update existing website instead of creating new one
            $request->merge(['id' => $userWebsite->id]);
            return $this->updateWebsite($request, $user);
        }

        // Create new website
        $website = DealerWebsite::create([
            'user_id' => $user->id,
            'theme_id' => $request->theme_id,
            'branding' => $request->branding,
            'subdomain' => $request->subdomain,
            'custom_domain' => $request->custom_domain,
            'use_custom_domain' => $request->use_custom_domain ?? false,
            'is_active' => $request->is_active ?? true,
            'status' => $request->status ?? 'published'
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Website published successfully',
            'website' => $website
        ], 201);
    }

    /**
     * Update an existing website
     */
    private function updateWebsite(Request $request, $user)
    {
        $website = DealerWebsite::where('id', $request->id)
            ->where('user_id', $user->id)
            ->first();

        if (!$website) {
            return response()->json([
                'status' => false,
                'message' => 'Website not found or you do not have permission to update it'
            ], 404);
        }

        // Check if subdomain is already taken by another user (excluding current website)
        $existingWebsite = DealerWebsite::where('subdomain', $request->subdomain)
            ->where('user_id', '!=', $user->id)
            ->where('id', '!=', $website->id)
            ->first();

        if ($existingWebsite) {
            return response()->json([
                'status' => false,
                'message' => 'The subdomain has already been taken.'
            ], 422);
        }

        // Update existing website
        $website->update([
            'theme_id' => $request->theme_id,
            'branding' => $request->branding,
            'subdomain' => $request->subdomain,
            'custom_domain' => $request->custom_domain,
            'use_custom_domain' => $request->use_custom_domain ?? false,
            'is_active' => $request->is_active ?? true,
            'status' => $request->status ?? 'published'
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Website updated successfully',
            'website' => $website
        ]);
    }

    /**
     * Update an existing website (for PUT requests)
     */
    public function update(Request $request, $id)
    {
        $website = DealerWebsite::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$website) {
            return response()->json([
                'status' => false,
                'message' => 'Website not found'
            ], 404);
        }

        $validated = $request->validate([
            'theme_id' => 'string',
            'branding' => 'array',
            'subdomain' => 'string|unique:dealer_websites,subdomain,' . $id,
            'custom_domain' => 'nullable|string',
            'use_custom_domain' => 'boolean',
            'is_active' => 'boolean',
            'status' => 'string|in:draft,published'
        ]);

        $website->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Website updated successfully',
            'website' => $website
        ]);
    }

    /**
     * Get a specific website
     */
    public function show(Request $request, $id)
    {
        $website = DealerWebsite::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$website) {
            return response()->json([
                'status' => false,
                'message' => 'Website not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'website' => $website
        ]);
    }

    /**
     * Delete a website
     */
    public function destroy(Request $request, $id)
    {
        $website = DealerWebsite::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$website) {
            return response()->json([
                'status' => false,
                'message' => 'Website not found'
            ], 404);
        }

        $website->delete();

        return response()->json([
            'status' => true,
            'message' => 'Website deleted successfully'
        ]);
    }
}