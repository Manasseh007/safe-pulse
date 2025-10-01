from django.contrib import admin
from django.urls import path, include
from .views import send_emergency_sms_api, signup_view, login_view
from .views import SecurityCompanyLoginView
from .views import SecurityCompanyRegisterView
from core.views import AlertListView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('api/auth/signup/', signup_view, name='signup'),
    path('api/auth/login/', login_view, name='login'),
    path('api/send-emergency/', send_emergency_sms_api, name='send_emergency_sms'),
    path('api/security-company/login/', SecurityCompanyLoginView.as_view(), name='security-company-login'),
    path('api/security-company/register/', SecurityCompanyRegisterView.as_view(), name='security-company-register'),
    path('api/security-company/alerts/', AlertListView.as_view(), name='security-alerts'),
    path('api/', include('core.urls')), 
]



