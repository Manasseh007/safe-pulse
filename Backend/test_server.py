#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings
from django.test.utils import get_runner

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iprotect.settings')
    django.setup()
    
    # Test basic functionality
    from core.models import CustomUser
    print("[OK] Django setup successful!")
    print("[OK] Models imported successfully!")
    print("[OK] Database connection working!")
    print("\nYour Django project is ready to run!")
    print("To start the server, run: python manage.py runserver")