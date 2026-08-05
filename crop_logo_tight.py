from PIL import Image

def crop_logo():
    # Load original image to analyze
    # Assuming original was in git or I can just crop the already cropped one more aggressively
    img = Image.open('public/content_hunter_new_logo.jpg')
    width, height = img.size
    
    # Let's crop exactly the center square. If it's a camera, it's central.
    # The current size is width=550, height=550
    # Let's crop it even tighter to the center, just in case text is at the bottom of this 550x550
    # Let's crop from y=50 to y=400
    
    left = width * 0.1
    top = height * 0.1
    right = width * 0.9
    bottom = height * 0.75 # Crop the bottom 25% where the text usually is
    
    cropped = img.crop((left, top, right, bottom))
    cropped.save('public/content_hunter_new_logo_fixed.jpg')

crop_logo()
print("Cropped tighter successfully!")
