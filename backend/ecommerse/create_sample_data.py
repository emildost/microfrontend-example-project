import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerse.settings')
django.setup()

from products.models import Category, Product, User

def create_sample_data():
    # Kategoriler oluştur
    categories = [
        {'name': 'Elektronik', 'description': 'Elektronik ürünler'},
        {'name': 'Giyim', 'description': 'Giyim ürünleri'},
        {'name': 'Kitap', 'description': 'Kitap ve dergiler'},
    ]
    
    for cat_data in categories:
        Category.objects.get_or_create(**cat_data)
    
    # Ürünler oluştur
    products = [
        {'name': 'iPhone 14', 'description': 'Apple iPhone 14', 'price': 999.99, 'category': Category.objects.get(name='Elektronik'), 'stock': 50},
        {'name': 'Samsung Galaxy S23', 'description': 'Samsung Galaxy S23', 'price': 899.99, 'category': Category.objects.get(name='Elektronik'), 'stock': 30},
        {'name': 'Nike Air Max', 'description': 'Nike spor ayakkabı', 'price': 129.99, 'category': Category.objects.get(name='Giyim'), 'stock': 100},
        {'name': 'Java Programlama', 'description': 'Java programlama kitabı', 'price': 49.99, 'category': Category.objects.get(name='Kitap'), 'stock': 25},
    ]
    
    for prod_data in products:
        Product.objects.get_or_create(**prod_data)
    
    # Test kullanıcısı
    User.objects.get_or_create(
        name='Ahmet Yılmaz',
        email='ahmet@example.com',
        avatar_url='https://via.placeholder.com/150'
    )
    
    print("Sample data created successfully!")

if __name__ == '__main__':
    create_sample_data()