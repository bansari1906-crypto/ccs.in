
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()

from blog.models import BlogPost

blog_posts = [
    {
        "title": "Modern Farming Techniques for Higher Yield in Cotton",
        "slug": "modern-farming-techniques-cotton",
        "content": """Cotton is one of India's most important cash crops, contributing significantly to the agricultural economy. To achieve higher yields and better quality cotton, farmers must adopt modern farming techniques that combine traditional wisdom with scientific advancements.

1. Soil Preparation and Nutrient Management
Proper soil preparation is the foundation of a successful cotton crop. Use deep plowing to break up compacted soil and improve water infiltration. Conduct soil testing to determine nutrient requirements and apply balanced fertilizers, including nitrogen, phosphorus, and potassium, along with essential micronutrients like zinc and boron.

2. High-Quality Seed Selection
Choose certified, high-yielding cotton varieties that are resistant to local pests and diseases. BT cotton varieties have proven effective against bollworms, reducing the need for excessive pesticide use.

3. Precision Planting
Plant cotton at the right time (usually May-June in most regions) with proper spacing. Use row spacing of 90-120 cm and plant-to-plant spacing of 30-45 cm to ensure adequate sunlight and air circulation for each plant.

4. Integrated Pest Management (IPM)
Implement an Integrated Pest Management approach that combines biological control, cultural practices, and judicious use of pesticides. Monitor pest populations regularly and only apply chemicals when economic threshold levels are reached.

5. Water Management
Use efficient irrigation methods like drip irrigation or sprinkler systems to conserve water and ensure uniform moisture distribution. Avoid overwatering, especially during the vegetative stage, as it can lead to excessive vegetative growth and reduced boll formation.

6. Weed Control
Effective weed control is crucial as weeds compete with cotton plants for nutrients, water, and sunlight. Use a combination of pre-emergence and post-emergence herbicides, along with manual weeding when necessary.

By following these modern farming techniques, cotton farmers can significantly increase their yields, improve fiber quality, and reduce production costs, leading to better economic returns.
""",
        "is_published": True
    },
    {
        "title": "जैविक खेती के फायदे और स्थायी कृषि प्रणाली",
        "slug": "organic-farming-benefits-sustainable-agriculture-hindi",
        "content": """जैविक खेती एक ऐसी कृषि प्रणाली है जो रासायनिक उर्वरकों और कीटनाशकों के बजाय प्राकृतिक संसाधनों का उपयोग करती है। यह मिट्टी की स्वास्थ्य को बनाए रखती है, पर्यावरण को बचाती है और स्वस्थ खाद्य उत्पादन करती है।

जैविक खेती के प्रमुख फायदे:

1. मिट्टी की स्वास्थ्य में सुधार
जैविक खेती में गobar, कम्पोस्ट, और हरी खाद का उपयोग किया जाता है जो मिट्टी में ह्यूमस की मात्रा को बढ़ाता है। इससे मिट्टी की पानी रोकने की क्षमता बढ़ती है, हवा का प्रवाह बेहतर होता है और मिट्टी के सूक्ष्मजीवों की गतिविधि बढ़ती है।

2. पानी की बचत
जैविक खेती में मिट्टी की संरचना बेहतर होती है जिससे पानी का रिसाव कम होता है और पानी की आवश्यकता कम होती है।

3. पर्यावरण की रक्षा
रासायनिक उर्वरकों और कीटनाशकों का उपयोग नहीं करने से भूमि, पानी और वायु का प्रदूषण कम होता है। जैविक खेती जैव-विविधता को भी बढ़ाती है।

4. स्वस्थ खाद्य उत्पादन
जैविक खेती से उत्पादित खाद्य पदार्थों में रासायनिक अवशेष नहीं होते हैं, जो स्वास्थ्य के लिए बेहतर होते हैं।

5. लागत में कमी
जैविक खेती में बाहर से रासायनिक उर्वरक और कीटनाशक खरीदने की आवश्यकता नहीं होती है, जिससे लागत में काफी कमी आती है।

स्थायी कृषि प्रणाली अपनाने के लिए कदम:
- फसल चक्र का पालन करें
- हरी खाद का उपयोग करें
- जैविक कीटनाशकों का उपयोग करें
- मृदा संरक्षण तकनीकों को अपनाएं

जैविक खेती न केवल आज के लिए बल्कि आने वाली पीढ़ियों के लिए भी स्वस्थ और समृद्ध भविष्य सुनिश्चित करती है।
""",
        "is_published": True
    }
]

for post_data in blog_posts:
    post, created = BlogPost.objects.get_or_create(
        slug=post_data["slug"],
        defaults=post_data
    )
    if created:
        print(f"Created blog post: {post.title}")
    else:
        print(f"Blog post already exists: {post.title}")

print("Blog posts populated successfully!")

