from PIL import Image

def analyze_and_center_logo():
    img = Image.open('public/content_hunter_logo_transparent.png').convert("RGBA")
    width, height = img.size
    
    # Get bounding box of non-transparent pixels
    # getbbox() works on the alpha channel if we split it
    r, g, b, a = img.split()
    bbox = a.getbbox()
    
    if not bbox:
        print("Image is entirely transparent")
        return
        
    left, top, right, bottom = bbox
    print(f"Original size: {width}x{height}")
    print(f"Bounding box: left={left}, top={top}, right={right}, bottom={bottom}")
    
    bbox_width = right - left
    bbox_height = bottom - top
    
    # Let's crop it perfectly to the bounding box, then add equal padding to make it a square
    cropped = img.crop(bbox)
    
    # Find the max dimension to make a square
    max_dim = max(bbox_width, bbox_height)
    
    # Create a new transparent square image
    new_img = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))
    
    # Paste the cropped image into the exact center
    paste_x = (max_dim - bbox_width) // 2
    paste_y = (max_dim - bbox_height) // 2
    new_img.paste(cropped, (paste_x, paste_y))
    
    # Save the perfectly centered image
    new_img.save('public/content_hunter_logo_transparent_centered.png')
    print("Saved perfectly centered image to content_hunter_logo_transparent_centered.png")

analyze_and_center_logo()
