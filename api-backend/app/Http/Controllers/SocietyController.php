<?php

namespace App\Http\Controllers;

use App\Models\SocietyPhoto;
use App\Models\SocietyVideo;
use Illuminate\Http\Request;
use App\Models\Society;

class SocietyController extends Controller
{
    public function index()
    {
        $societies = Society::with(['photos', 'videos'])->get();

        $mapped = $societies->map(function ($society) {
            return [
                'id' => $society->id,
                'name' => $society->name,
                'description' => $society->description,
                'sortOrder' => $society->sortOrder,
                'images' => $society->photos->map(function ($photo) {
                    return asset("storage/" . $photo->file_path);
                }),

                'videos' => $society->videos->map(function ($video) {
                    return asset("storage/" . $video->file_path);
                })
            ];
        });


        return response()->json([
            'status' => true,
            'societies' => $mapped,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $society = Society::create($validated);

        // Save photos
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('society_photos', 'public');
                SocietyPhoto::create([
                    'society_id' => $society->id,
                    'file_path' => $path,
                ]);
            }
        }

        // Save videos
        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $video) {
                $path = $video->store('society_videos', 'public');
                SocietyVideo::create([
                    'society_id' => $society->id,
                    'file_path' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => 'Society created successfully',
            'data' => $society->load(['photos', 'videos']),
        ], 201);
    }
}
