from django.urls import path
from . import views
from iprotect.views import SecurityCompanyRegisterView, SecurityCompanyLoginView

urlpatterns = [
    path('', views.test_auth, name='test-auth'),
    path('security/register/', SecurityCompanyRegisterView.as_view(), name='security-register'),
    path('security/login/', SecurityCompanyLoginView.as_view(), name='security-login'),
]

