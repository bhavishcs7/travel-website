from PIL import Image, ImageDraw

def remove_text_below_logo():
    img = Image.open('public/content_hunter_new_logo.jpg').convert('RGB')
    width, height = img.size
    pixels = img.load()
    
    max_red_y = 0
    
    # Find the lowest red pixel
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            # Detect red (high red, low green/blue)
            if r > 150 and g < 100 and b < 100:
                if y > max_red_y:
                    max_red_y = y
                    
    print(f"Lowest red pixel is at Y: {max_red_y}")
    
    if max_red_y > 0:
        # Fill everything below the lowest red pixel (plus a small margin) with white
        draw = ImageDraw.Draw(img)
        # Margin of 10 pixels below the red icon
        erase_start_y = max_red_y + 10
        draw.rectangle([0, erase_start_y, width, height], fill=(255, 255, 255))
        
        img.save('public/content_hunter_new_logo.jpg')
        print("Text erased successfully!")
    else:
        print("Could not find red pixels!")

remove_text_below_logo()
