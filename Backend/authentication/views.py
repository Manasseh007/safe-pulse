from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def test_auth(request):
    return JsonResponse({'message': 'Authentication app is working!'})

