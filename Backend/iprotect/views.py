from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from core.models import EmergencyAlert, SecurityCompany
from rest_framework.authtoken.models import Token
from core.serializers import SecurityCompanyRegisterSerializer, SecurityCompanyLoginSerializer
from rest_framework.views import APIView 



@api_view(['POST'])
def signup_view(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')
    full_name = request.data.get('full_name')

    if not all([phone_number, password, full_name]):
        return Response({'message': 'All fields are required.'}, status=400)

    if User.objects.filter(username=phone_number).exists():
        return Response({'message': 'User already exists.'}, status=400)

    user = User.objects.create_user(username=phone_number, password=password, first_name=full_name)
    return Response({'message': 'Signup successful.'})


@api_view(['POST'])
def login_view(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    user = authenticate(username=phone_number, password=password)
    if user is not None:
        return Response({'message': 'Login successful.'})
    return Response({'message': 'Invalid credentials.'}, status=401)


@api_view(['POST'])
def send_emergency_sms_api(request):
    # Placeholder logic for SMS (Twilio or other SMS service)
    return Response({'message': 'Emergency alert sent successfully.'})

def security_alerts_view(request):
    alerts = EmergencyAlert.objects.filter(is_resolved=False).order_by('-created_at')
    data = []

    for alert in alerts:
        data.append({
            'user_phone': alert.user_phone,
            'latitude': alert.latitude,
            'longitude': alert.longitude,
            'created_at': alert.created_at.isoformat(),
        })

    return JsonResponse({'alerts': data})

class SecurityCompanyRegisterView(APIView):
    def post(self, request):
        serializer = SecurityCompanyRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'message': 'Registered successfully', 'token': token.key})
        return Response(serializer.errors, status=400)

class SecurityCompanyLoginView(APIView):
    def post(self, request):
        serializer = SecurityCompanyLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'message': 'Login successful', 'token': token.key})
        return Response(serializer.errors, status=400)


