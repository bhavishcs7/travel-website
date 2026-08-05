from PIL import Image

# Open image
img = Image.open('public/content_hunter_new_logo.jpg')

# The image is 1024x682.
# We want to crop out the text at the bottom. Let's crop it to a square focusing on the top part.
# A good guess for a horizontal layout with text at the bottom: 
# Let's just take a box from x=200, y=0 to x=824, y=550 (approx square aspect ratio)
# Let's crop the bottom 25% of the image first and then crop the sides to make it a square.

width, height = img.size

# Let's crop it to a square from the top middle
# left = (1024 - 550) / 2
left = 237
top = 50
right = 787
bottom = 600

# Crop image
cropped = img.crop((left, top, right, bottom))
cropped.save('public/content_hunter_new_logo.jpg')
print("Cropped successfully!")
