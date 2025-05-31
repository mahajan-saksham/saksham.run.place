#!/bin/bash

# Image Optimization Script for Portfolio
# This script helps optimize images for web performance

echo "🖼️  Portfolio Image Optimizer"
echo "============================"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   brew install imagemagick"
    exit 1
fi

# Create optimized directory if it doesn't exist
mkdir -p public/images/optimized
mkdir -p public/images/optimized/projects

# Function to optimize image
optimize_image() {
    local input=$1
    local output=$2
    local max_width=$3
    local quality=$4
    
    echo "Optimizing: $input -> $output"
    convert "$input" -resize "${max_width}>" -quality "$quality" -strip "$output"
}

# Optimize profile photo
if [ -f "public/images/saksham-avatar.jpg" ]; then
    optimize_image "public/images/saksham-avatar.jpg" \
                   "public/images/optimized/saksham-avatar.jpg" \
                   "400" "85"
fi

# Optimize project thumbnails (600px wide, 85% quality)
for img in public/images/projects/*-thumb.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        optimize_image "$img" \
                       "public/images/optimized/projects/$filename" \
                       "600" "85"
    fi
done
# Optimize project full images (1920px wide max, 85% quality)
for img in public/images/projects/*.jpg; do
    if [ -f "$img" ] && [[ ! "$img" == *"-thumb.jpg" ]]; then
        filename=$(basename "$img")
        optimize_image "$img" \
                       "public/images/optimized/projects/$filename" \
                       "1920" "85"
    fi
done

echo "✅ Image optimization complete!"
echo "Optimized images saved in: public/images/optimized/"

# Show file size comparison
echo -e "\n📊 File Size Comparison:"
echo "Original images:"
du -sh public/images/
echo "Optimized images:"
du -sh public/images/optimized/