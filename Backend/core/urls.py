from django.urls import path, include
from .views_security import SecuritySignupView, SecurityLoginView
from .views import security_alerts_view
from rest_framework.routers import DefaultRouter
from .views import AlertViewSet
from .views import (
    home,
    RegisterView,
    SignupView,
    LoginView,
    send_alert,
    send_emergency_sms,
    send_alert_sms,
)
router = DefaultRouter()
router.register(r'alerts', AlertViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('register/', RegisterView.as_view(), name='register'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('alert/', send_alert, name='send_alert'),
    path('send-sms/', send_emergency_sms, name='send_emergency_sms'),
    path('alert/send/', send_alert_sms, name='send_alert_sms'),
    path('security/signup/', SecuritySignupView.as_view()),
    path('security/login/', SecurityLoginView.as_view()),
    path('security/alerts/', security_alerts_view, name='security_alerts'),
    path('api/', include(router.urls)),
]



from .views import send_twilio_sms, paystack_initialize, paystack_verify

urlpatterns += [
    path('twilio/send/', send_twilio_sms, name='send_twilio_sms'),
    path('paystack/init/', paystack_initialize, name='paystack_init'),
    path('paystack/verify/', paystack_verify, name='paystack_verify'),
]
