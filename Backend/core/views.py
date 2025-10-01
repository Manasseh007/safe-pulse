from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
import json
try:
    from twilio.rest import Client
except ImportError:
    Client = None
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token  # Optional, for token auth
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from .models import Alert
from django.urls import path, include



def home(request):
    return render(request, 'home.html')


def send_alert(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        location = data.get('location', {})
        print("🚨 Emergency alert received:", location)
        return JsonResponse({'status': 'success', 'message': 'Alert received!'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


def send_emergency_sms(request):
    # Your Twilio credentials (replace with your actual values)
    account_sid = "your_twilio_account_sid"
    auth_token = "your_twilio_auth_token"
    twilio_number = "+12184032817"

    # Emergency contact number to receive the SMS
    recipient_number = "+27EMERGENCY_CONTACT_NUMBER"

    # Message to send (you can customize the location dynamically later)
    message_body = "🚨 URGENT: Nissi is in danger! Location: https://maps.google.com/?q=-26.2,28.0"

    if Client is None:
        return JsonResponse({"status": "error", "message": "Twilio not installed"})
    
    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            body=message_body,
            from_=twilio_number,
            to=recipient_number
        )
        return JsonResponse({"status": "success", "sid": message.sid})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})


class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    def post(self, request):
        return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({
                "message": "Login successful",
                "phone_number": user.phone_number,
                "full_name": user.full_name,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def security_alerts_view(request):
    return JsonResponse({'message': 'Security alert received!'})


from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json

@method_decorator(csrf_exempt, name='dispatch')
def send_alert_sms(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            location = data.get("location")
            contact_number = data.get("contact_number")  # user's emergency contact

            # Twilio credentials (use env variables in production!)
            account_sid = 'your_twilio_account_sid'
            auth_token = 'your_twilio_auth_token'
            twilio_number = '+12184032817'
            if Client is None:
                return JsonResponse({"status": "error", "message": "Twilio not installed"}, status=500)
            
            client = Client(account_sid, auth_token)

            message_body = f"🚨 URGENT: User is in danger!\nLocation: https://maps.google.com/?q={location['latitude']},{location['longitude']}"

            # Send SMS to emergency contact
            if contact_number:
                client.messages.create(
                    body=message_body,
                    from_=twilio_number,
                    to=contact_number
                )

            # Placeholder security company numbers
            security_numbers = ['+19876543210', '+19876543211', '+19876543212']
            for number in security_numbers:
                client.messages.create(
                    body=message_body,
                    from_=twilio_number,
                    to=number
                )

            return JsonResponse({"status": "success", "message": "Alerts sent."})

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)

from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import EmergencyAlert
from .serializers import EmergencyAlertSerializer
from .serializers import AlertSerializer

class AlertListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all alerts for now (can add distance filtering later)
        alerts = EmergencyAlert.objects.filter(is_active=True).order_by("-created_at")
        serializer = EmergencyAlertSerializer(alerts, many=True)
        return Response(serializer.data, status=200)

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all().order_by('-timestamp')
    serializer_class = AlertSerializer

# ==================== TWILIO & PAYSTACK INTEGRATION ====================
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
try:
    import requests
except ImportError:
    requests = None

@csrf_exempt
def send_twilio_sms(request):
    if request.method == "POST":
        if Client is None:
            return JsonResponse({"error": "Twilio not installed"})
        
        account_sid = "your_twilio_sid"
        auth_token = "your_twilio_auth_token"
        client = Client(account_sid, auth_token)

        body = request.POST.get("body", "Test SMS")
        to = request.POST.get("to")

        message = client.messages.create(
            body=body,
            from_="+1234567890",  # your Twilio number
            to=to
        )
        return JsonResponse({"sid": message.sid})

@csrf_exempt
def paystack_initialize(request):
    if request.method == "POST":
        if requests is None:
            return JsonResponse({"error": "requests module not available"})
        headers = {"Authorization": "Bearer your_paystack_secret"}
        data = {"email": request.POST.get("email"), "amount": request.POST.get("amount")}
        response = requests.post("https://api.paystack.co/transaction/initialize", headers=headers, data=data)
        return JsonResponse(response.json())

@csrf_exempt
def paystack_verify(request):
    if requests is None:
        return JsonResponse({"error": "requests module not available"})
    reference = request.GET.get("reference")
    headers = {"Authorization": "Bearer your_paystack_secret"}
    response = requests.get(f"https://api.paystack.co/transaction/verify/{reference}", headers=headers)
    return JsonResponse(response.json())
