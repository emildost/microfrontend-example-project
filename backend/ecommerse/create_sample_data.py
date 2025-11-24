import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerse.settings')
django.setup()

from products.models import Category, Product, User

def create_sample_data():
    categories = [
        {'name': 'Electronics', 'description': 'Electronic products'},
        {'name': 'Clothing', 'description': 'Clothing products'},
        {'name': 'Books', 'description': 'Books and magazines'},
    ]
    
    for cat_data in categories:
        Category.objects.get_or_create(**cat_data)
    
    products = [
        {'name': 'iPhone 14', 'description': 'Apple iPhone 14', 'price': 999.99, 'category': Category.objects.get(name='Electronics'), 'stock': 50},
        {'name': 'Samsung Galaxy S23', 'description': 'Samsung Galaxy S23', 'price': 899.99, 'category': Category.objects.get(name='Electronics'), 'stock': 30},
        {'name': 'Nike Air Max', 'description': 'Nike sports shoes', 'price': 129.99, 'category': Category.objects.get(name='Clothing'), 'stock': 100},
        {'name': 'Java Programming', 'description': 'Java programming book', 'price': 49.99, 'category': Category.objects.get(name='Books'), 'stock': 25},
    ]
    
    for prod_data in products:
        Product.objects.get_or_create(**prod_data)
    
    User.objects.get_or_create(
        name='Qiyas CC',
        email='hello@qiyas.cc',
        avatar_url='https://via.placeholder.com/150'
    )
    
    print("Sample data created successfully!")

if __name__ == '__main__':
    create_sample_data()
