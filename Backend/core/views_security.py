# core/views_security.py (or add to core/views.py)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from core.models import SecurityCompany  # You must create this model
from rest_framework.authtoken.models import Token

class SecuritySignupView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        password = request.data.get("password")
        company_name = request.data.get("company_name")

        if not all([phone, password, company_name]):
            return Response({"error": "All fields are required."}, status=400)

        if User.objects.filter(username=phone).exists():
            return Response({"error": "Security company already exists."}, status=400)

        user = User.objects.create_user(username=phone, password=password)
        SecurityCompany.objects.create(user=user, company_name=company_name)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=201)

class SecurityLoginView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        password = request.data.get("password")

        user = authenticate(username=phone, password=password)
        if user is None:
            return Response({"error": "Invalid credentials."}, status=400)

        # Optional: check if this user is linked to SecurityCompany
        if not hasattr(user, 'securitycompany'):
            return Response({"error": "Not authorized as a security company."}, status=403)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=200)
